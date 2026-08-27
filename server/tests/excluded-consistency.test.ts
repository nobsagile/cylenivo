/**
 * The UI promises: "This ticket is excluded from all metric calculations."
 *
 * It used to be a lie. Only /summary, /throughput and /forecast filtered
 * excluded tickets (via computeAggregate); /cycle-times, /lead-times,
 * /time-in-status, /rework, /cycle-time-by-type and /cfd read ctx.tickets
 * directly and kept them in. An outlier you excluded vanished from the summary
 * cards but reappeared in the scatter plot and in the rework percentage — two
 * numbers contradicting each other on the same dataset.
 *
 * These tests pin every metric endpoint to the promise.
 *
 * Fixture: TICK-1 (cycle 5d), TICK-2 (10d), TICK-3 (rework, 14d), TICK-4 (incomplete)
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'
import { loadImportContext } from '../src/lib/context.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8')
)

const BASE_CONFIG = {
  name: 'Excluded Consistency',
  source_type: 'jira',
  status_order: ['Backlog', 'Ready', 'In Dev', 'Review', 'Done'],
  cycle_time_start_status: 'In Dev',
  cycle_time_end_status: 'Done',
}

beforeAll(async () => { await migrate() })

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

async function setup() {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(BASE_CONFIG),
  })
  const { data: cfg } = await res.json() as { data: { id: string } }

  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
  form.append('config_id', cfg.id)
  const impRes = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const { data: imp } = await impRes.json() as { data: { id: string } }
  return imp.id
}

async function ticketIdOf(importId: string, externalId: string): Promise<string> {
  const res = await app.request(`/api/v1/tickets?import_id=${importId}&limit=0`)
  const { data } = await res.json() as { data: { tickets: { id: string; external_id: string }[] } }
  const found = data.tickets.find(t => t.external_id === externalId)
  if (!found) throw new Error(`${externalId} not found`)
  return found.id
}

async function exclude(importId: string, externalId: string) {
  const id = await ticketIdOf(importId, externalId)
  const res = await app.request(`/api/v1/tickets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ excluded: true, exclusion_reason: 'outlier' }),
  })
  expect(res.status).toBe(200)
}

async function get(path: string) {
  const res = await app.request(path)
  expect(res.status).toBe(200)
  const { data } = await res.json() as { data: any }
  return data
}

// TICK-3 is the 14d rework ticket — the realistic "exclude this outlier" case,
// and the only ticket that carries rework, so its removal is visible everywhere.
const OUTLIER = 'TICK-3'

describe('excluded tickets are absent from every metric endpoint', () => {
  it('/cycle-times (scatter) drops the excluded ticket', async () => {
    const importId = await setup()

    const before = await get(`/api/v1/metrics/${importId}/cycle-times`)
    expect(before.tickets.map((t: any) => t.external_id)).toContain(OUTLIER)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/cycle-times`)
    expect(after.tickets.map((t: any) => t.external_id)).not.toContain(OUTLIER)
    expect(after.tickets).toHaveLength(before.tickets.length - 1)
  })

  it('/lead-times drops the excluded ticket from both values and list', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/metrics/${importId}/lead-times`)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/lead-times`)
    expect(after.tickets.map((t: any) => t.external_id)).not.toContain(OUTLIER)
    expect(after.values).toHaveLength(before.values.length - 1)
  })

  it('/time-in-status drops the excluded ticket', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/metrics/${importId}/time-in-status`)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/time-in-status`)
    expect(after.tickets.map((t: any) => t.external_id)).not.toContain(OUTLIER)
    expect(after.tickets).toHaveLength(before.tickets.length - 1)
  })

  it('/rework recomputes without the excluded ticket', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/metrics/${importId}/rework`)
    // TICK-3 is the only fixture ticket with backward movement
    expect(before.tickets_with_rework).toBe(1)
    expect(before.total_completed).toBe(3)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/rework`)
    // The rework ticket is gone — so is the rework, and the denominator shrinks.
    // Before the fix this still reported 1 of 3 while the cards said 2 completed.
    expect(after.tickets_with_rework).toBe(0)
    expect(after.total_completed).toBe(2)
    expect(after.rework_paths).toEqual([])
    expect(after.avg_cycle_with_rework).toBeNull()
  })

  it('/rework and /summary agree on the completed count', async () => {
    const importId = await setup()
    await exclude(importId, OUTLIER)

    const rework = await get(`/api/v1/metrics/${importId}/rework`)
    const summary = await get(`/api/v1/metrics/${importId}/summary`)

    expect(rework.total_completed).toBe(summary.completed_ticket_count)
  })

  it('/cycle-time-by-type drops the excluded ticket from its type group', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/metrics/${importId}/cycle-time-by-type`)
    const countBefore = before.types.reduce((sum: number, t: any) => sum + t.count, 0)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/cycle-time-by-type`)
    const countAfter = after.types.reduce((sum: number, t: any) => sum + t.count, 0)
    expect(countAfter).toBe(countBefore - 1)
  })

  it('/cfd drops the excluded ticket', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/metrics/${importId}/cfd`)
    const peakBefore = Math.max(...before.data.map((d: any) =>
      Object.values(d).filter((v): v is number => typeof v === 'number').reduce((a, b) => a + b, 0)
    ))

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/cfd`)
    const peakAfter = Math.max(...after.data.map((d: any) =>
      Object.values(d).filter((v): v is number => typeof v === 'number').reduce((a, b) => a + b, 0)
    ))
    expect(peakAfter).toBeLessThan(peakBefore)
  })

  it('/summary and /cycle-times agree on the completed count', async () => {
    const importId = await setup()
    await exclude(importId, OUTLIER)

    const summary = await get(`/api/v1/metrics/${importId}/summary`)
    const scatter = await get(`/api/v1/metrics/${importId}/cycle-times`)

    // This is the contradiction the bug produced: cards said N, scatter said N+1
    expect(scatter.tickets).toHaveLength(summary.completed_ticket_count)
  })

  it('/summary still counts excluded tickets in its totals', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/metrics/${importId}/summary`)
    expect(before.excluded_ticket_count).toBe(0)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/metrics/${importId}/summary`)
    // ticket_count is the dataset size — it must NOT shrink
    expect(after.ticket_count).toBe(before.ticket_count)
    expect(after.excluded_ticket_count).toBe(1)
    expect(after.completed_ticket_count).toBe(before.completed_ticket_count - 1)
  })
})

describe('excluded tickets stay visible where the user manages them', () => {
  it('the ticket list still returns excluded tickets', async () => {
    const importId = await setup()
    await exclude(importId, OUTLIER)

    const data = await get(`/api/v1/tickets?import_id=${importId}&limit=0`)
    const found = data.tickets.find((t: any) => t.external_id === OUTLIER)
    expect(found).toBeDefined()
    expect(found.excluded).toBe(true)
    expect(found.exclusion_reason).toBe('outlier')
  })

  it('excluded_only=1 finds the excluded ticket', async () => {
    const importId = await setup()
    await exclude(importId, OUTLIER)

    const data = await get(`/api/v1/tickets?import_id=${importId}&excluded_only=1&limit=0`)
    expect(data.tickets).toHaveLength(1)
    expect(data.tickets[0].external_id).toBe(OUTLIER)
  })

  it('available_types is unaffected by exclusion', async () => {
    const importId = await setup()
    const before = await get(`/api/v1/tickets?import_id=${importId}&limit=0`)

    await exclude(importId, OUTLIER)

    const after = await get(`/api/v1/tickets?import_id=${importId}&limit=0`)
    expect(after.available_types).toEqual(before.available_types)
  })
})

describe('ImportContext invariant', () => {
  it('ctx.tickets excludes, ctx.allTickets includes', async () => {
    const importId = await setup()
    await exclude(importId, OUTLIER)

    const ctx = await loadImportContext(importId)
    expect(ctx!.allTickets).toHaveLength(4)
    expect(ctx!.tickets).toHaveLength(3)
    expect(ctx!.tickets.every(t => !t.excluded)).toBe(true)
    expect(ctx!.allTickets.some(t => t.excluded)).toBe(true)
  })
})
