/**
 * Tests for loadImportContext and buildEnrichedTicket.
 * Verifies that the central data-loading layer produces correct enriched data
 * using the same metrics-fixture as metrics.test.ts.
 *
 * Fixture: 4 tickets (TICK-1..4), config: cycle_start=In Dev, cycle_end=Done
 *   TICK-1: cycle=5d, lead=9d, completed
 *   TICK-2: cycle=10d, lead=12d, completed
 *   TICK-3: rework — first_last=14d, first_first=7d, last_last=5d
 *   TICK-4: incomplete (no Done) — cycle_time_days=null
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
  name: 'Context Test',
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

async function setup(overrides: Record<string, unknown> = {}) {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...BASE_CONFIG, ...overrides }),
  })
  const { data: cfg } = await res.json() as { data: { id: string } }

  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
  form.append('config_id', cfg.id)
  const impRes = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const { data: imp } = await impRes.json() as { data: { id: string } }

  return imp.id
}

describe('loadImportContext', () => {
  it('returns null for unknown importId', async () => {
    const ctx = await loadImportContext('nonexistent')
    expect(ctx).toBeNull()
  })

  it('loads 4 tickets total', async () => {
    const importId = await setup()
    const ctx = await loadImportContext(importId)
    expect(ctx).not.toBeNull()
    expect(ctx!.tickets).toHaveLength(4)
  })

  it('config: mode cast correctly, status_order as array', async () => {
    const importId = await setup({ cycle_time_mode: 'last_last' })
    const ctx = await loadImportContext(importId)
    expect(ctx!.config.cycle_time_mode).toBe('last_last')
    expect(Array.isArray(ctx!.config.status_order)).toBe(true)
    expect(ctx!.config.status_order).toEqual(['Backlog', 'Ready', 'In Dev', 'Review', 'Done'])
  })

  it('cycleStatuses: sliced to cycle window [In Dev, Review, Done]', async () => {
    const importId = await setup()
    const ctx = await loadImportContext(importId)
    expect(ctx!.cycleStatuses).toEqual(['In Dev', 'Review', 'Done'])
  })

  it('cycleStatuses: empty when cycle statuses not found in order', async () => {
    const importId = await setup({ status_order: ['A', 'B', 'C'], cycle_time_start_status: 'X', cycle_time_end_status: 'Y' })
    const ctx = await loadImportContext(importId)
    expect(ctx!.cycleStatuses).toEqual([])
  })
})

describe('buildEnrichedTicket — first_last mode', () => {
  it('TICK-1: cycle=5d, lead=9d, completed=true', async () => {
    const importId = await setup({ cycle_time_mode: 'first_last' })
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-1')!
    expect(t.cycle_time_days).toBeCloseTo(5, 0)
    expect(t.lead_time_days).toBeCloseTo(9, 0)
    expect(t.completed).toBe(true)
    expect(t.completed_at).toBeInstanceOf(Date)
  })

  it('TICK-2: cycle=10d, lead=12d, completed=true', async () => {
    const importId = await setup({ cycle_time_mode: 'first_last' })
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-2')!
    expect(t.cycle_time_days).toBeCloseTo(10, 0)
    expect(t.lead_time_days).toBeCloseTo(12, 0)
    expect(t.completed).toBe(true)
  })

  it('TICK-3 first_last: cycle=14d (first In Dev → last Done)', async () => {
    const importId = await setup({ cycle_time_mode: 'first_last' })
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-3')!
    expect(t.cycle_time_days).toBeCloseTo(14, 0)
    expect(t.completed).toBe(true)
  })

  it('TICK-4: incomplete — cycle_time_days=null, completed=false', async () => {
    const importId = await setup()
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-4')!
    expect(t.cycle_time_days).toBeNull()
    expect(t.lead_time_days).toBeNull()
    expect(t.completed).toBe(false)
    expect(t.completed_at).toBeNull()
  })

  it('current_status: last transition to_status', async () => {
    const importId = await setup()
    const ctx = await loadImportContext(importId)
    const t1 = ctx!.tickets.find(t => t.external_id === 'TICK-1')!
    expect(t1.current_status).toBe('Done')
    const t4 = ctx!.tickets.find(t => t.external_id === 'TICK-4')!
    expect(t4.current_status).toBe('In Dev')
  })

  it('transitions: loaded and available', async () => {
    const importId = await setup()
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-1')!
    expect(t.transitions.length).toBeGreaterThan(0)
  })
})

describe('buildEnrichedTicket — mode variants for TICK-3', () => {
  it('first_first: cycle=7d', async () => {
    const importId = await setup({ cycle_time_mode: 'first_first' })
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-3')!
    expect(t.cycle_time_days).toBeCloseTo(7, 0)
  })

  it('last_last: cycle=5d', async () => {
    const importId = await setup({ cycle_time_mode: 'last_last' })
    const ctx = await loadImportContext(importId)
    const t = ctx!.tickets.find(t => t.external_id === 'TICK-3')!
    expect(t.cycle_time_days).toBeCloseTo(5, 0)
  })
})
