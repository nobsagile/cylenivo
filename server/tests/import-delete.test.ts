/**
 * Deleting a dataset used to be impossible once it had been through AI analysis.
 *
 * llm_insights.import_id has a FK on import_sessions and PRAGMA foreign_keys is
 * ON, but the delete cascade never touched llm_insights. So the delete threw
 * "FOREIGN KEY constraint failed" → 500 → the dataset stayed forever. Worse: the
 * cascade was not transactional, so tickets and transitions were already gone by
 * then, leaving a zombie dataset that reported N tickets and contained none.
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'
import path from 'path'
import { eq } from 'drizzle-orm'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import {
  projectConfigs, importSessions, tickets, ticketTransitions, llmInsights,
} from '../src/db/schema.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8')
)

beforeAll(async () => { await migrate() })

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

async function setup(): Promise<string> {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Delete Test',
      source_type: 'jira',
      status_order: ['Backlog', 'Ready', 'In Dev', 'Review', 'Done'],
      cycle_time_start_status: 'In Dev',
      cycle_time_end_status: 'Done',
    }),
  })
  const { data: cfg } = await res.json() as { data: { id: string } }

  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
  form.append('config_id', cfg.id)
  const impRes = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const { data: imp } = await impRes.json() as { data: { id: string } }
  return imp.id
}

async function addInsight(importId: string, id = 'ins-1') {
  await db.insert(llmInsights).values({
    id,
    import_id: importId,
    model_used: 'test-model',
    insight_text: 'Cycle time is trending up.',
    generated_at: new Date().toISOString(),
  })
}

async function counts(importId: string) {
  const [t, tr, li, imp] = await Promise.all([
    db.select().from(tickets).where(eq(tickets.import_id, importId)),
    db.select().from(ticketTransitions),
    db.select().from(llmInsights).where(eq(llmInsights.import_id, importId)),
    db.select().from(importSessions).where(eq(importSessions.id, importId)),
  ])
  return { tickets: t.length, transitions: tr.length, insights: li.length, session: imp.length }
}

describe('DELETE /imports/:id', () => {
  it('deletes a dataset that has LLM insights (was a 500 before)', async () => {
    const importId = await setup()
    await addInsight(importId)

    const before = await counts(importId)
    expect(before.session).toBe(1)
    expect(before.insights).toBe(1)
    expect(before.tickets).toBeGreaterThan(0)

    const res = await app.request(`/api/v1/imports/${importId}`, { method: 'DELETE' })
    expect(res.status).toBe(204)

    const after = await counts(importId)
    expect(after).toEqual({ tickets: 0, transitions: 0, insights: 0, session: 0 })
  })

  it('removes every insight, not just one', async () => {
    const importId = await setup()
    await addInsight(importId, 'ins-1')
    await addInsight(importId, 'ins-2')
    await addInsight(importId, 'ins-3')

    const res = await app.request(`/api/v1/imports/${importId}`, { method: 'DELETE' })
    expect(res.status).toBe(204)
    expect((await counts(importId)).insights).toBe(0)
  })

  it('still deletes a dataset without insights', async () => {
    const importId = await setup()

    const res = await app.request(`/api/v1/imports/${importId}`, { method: 'DELETE' })
    expect(res.status).toBe(204)
    expect(await counts(importId)).toEqual({ tickets: 0, transitions: 0, insights: 0, session: 0 })
  })

  it('leaves other datasets and their insights untouched', async () => {
    const keep = await setup()
    await addInsight(keep, 'keep-ins')
    const doomed = await setup()
    await addInsight(doomed, 'doomed-ins')

    const res = await app.request(`/api/v1/imports/${doomed}`, { method: 'DELETE' })
    expect(res.status).toBe(204)

    const keepAfter = await counts(keep)
    expect(keepAfter.session).toBe(1)
    expect(keepAfter.insights).toBe(1)
    expect(keepAfter.tickets).toBeGreaterThan(0)
  })

  it('returns 404 for an unknown id and changes nothing', async () => {
    const importId = await setup()
    await addInsight(importId)

    const res = await app.request('/api/v1/imports/does-not-exist', { method: 'DELETE' })
    expect(res.status).toBe(404)

    const after = await counts(importId)
    expect(after.session).toBe(1)
    expect(after.insights).toBe(1)
  })

  it('leaves no zombie: a deleted dataset is gone from the list', async () => {
    const importId = await setup()
    await addInsight(importId)

    await app.request(`/api/v1/imports/${importId}`, { method: 'DELETE' })

    const listRes = await app.request('/api/v1/imports')
    const { data } = await listRes.json() as { data: { id: string }[] }
    expect(data.find(i => i.id === importId)).toBeUndefined()
  })

  it('the cascade is atomic — a failure mid-transaction leaves the data intact', async () => {
    // Guards the reason the old bug caused damage rather than just an error:
    // the cascade was not actually transactional. bun:sqlite is synchronous, so
    // db.transaction(async tx => …) does NOT roll back — the sync form does.
    // This test proves the sync form rolls back on this exact schema.
    const importId = await setup()
    await addInsight(importId)
    const before = await counts(importId)

    let threw = false
    try {
      db.transaction((tx) => {
        tx.delete(ticketTransitions).run()
        tx.delete(tickets).where(eq(tickets.import_id, importId)).run()
        throw new Error('simulated failure after partial delete')
      })
    } catch {
      threw = true
    }

    expect(threw).toBe(true)
    const after = await counts(importId)
    expect(after).toEqual(before)
  })

  it('does not leave a session whose ticket_count disagrees with reality', async () => {
    // The old bug's damage signature: tickets deleted, session left behind
    // still claiming N tickets. Assert the pair is always consistent.
    const importId = await setup()
    await addInsight(importId)

    await app.request(`/api/v1/imports/${importId}`, { method: 'DELETE' })

    const sessions = await db.select().from(importSessions)
    for (const s of sessions) {
      const actual = await db.select().from(tickets).where(eq(tickets.import_id, s.id))
      expect(s.ticket_count).toBe(actual.length)
    }
  })
})
