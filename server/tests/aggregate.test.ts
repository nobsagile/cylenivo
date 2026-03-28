/**
 * Tests for computeAggregate — verifies the pure aggregation layer.
 * Uses same fixture as metrics.test.ts so values are cross-validated.
 *
 * TICK-1: cycle=5d, lead=9d
 * TICK-2: cycle=10d, lead=12d
 * TICK-3: cycle=14d (first_last), lead=21d
 * TICK-4: incomplete — excluded from all aggregations
 *
 * Expected aggregate (first_last):
 *   cycleTimes: [5, 10, 14]  mean=9.67  median=10
 *   leadTimes:  [9, 12, 21]  mean=14    median=12
 *   completedTickets: 3
 *   timeInStatus: only In Dev, Review, Done (cycle window)
 */

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'
import { loadImportContext } from '../src/lib/context.js'
import { computeAggregate } from '../src/lib/aggregate.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8')
)

const BASE_CONFIG = {
  name: 'Aggregate Test',
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

  return loadImportContext(imp.id)
}

describe('computeAggregate — first_last', () => {
  it('completedTickets: 3 of 4', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    expect(agg.completedTickets).toHaveLength(3)
    expect(agg.cycleTimes).toHaveLength(3)
  })

  it('cycleTimes: [5, 10, 14] — matches per-ticket values', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    const sorted = [...agg.cycleTimes].sort((a, b) => a - b)
    expect(sorted[0]).toBeCloseTo(5, 0)
    expect(sorted[1]).toBeCloseTo(10, 0)
    expect(sorted[2]).toBeCloseTo(14, 0)
  })

  it('leadTimes: [9, 12, 21]', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    const sorted = [...agg.leadTimes].sort((a, b) => a - b)
    expect(sorted[0]).toBeCloseTo(9, 0)
    expect(sorted[1]).toBeCloseTo(12, 0)
    expect(sorted[2]).toBeCloseTo(21, 0)
  })

  it('cycleTimePercentiles: sample_size=3, p50=null (< min sample)', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    expect(agg.cycleTimePercentiles.sample_size).toBe(3)
    expect(agg.cycleTimePercentiles.p50).toBeNull()
    expect(agg.cycleTimePercentiles.warning).not.toBeNull()
  })

  it('completedAtDates: 3 dates, dateRange not null', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    expect(agg.completedAtDates).toHaveLength(3)
    expect(agg.dateRange.from).not.toBeNull()
    expect(agg.dateRange.to).not.toBeNull()
  })

  it('timeInStatus: only cycle-window statuses [In Dev, Review, Done]', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    const statusKeys = Object.keys(agg.timeInStatus)
    expect(statusKeys).toContain('In Dev')
    expect(statusKeys).toContain('Review')
    expect(statusKeys).toContain('Done')
    expect(statusKeys).not.toContain('Backlog')
    expect(statusKeys).not.toContain('Ready')
  })

  it('timeInStatus: In Dev mean > 0 for completed tickets', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    expect(agg.timeInStatus['In Dev'].mean_days).toBeGreaterThan(0)
  })

  it('TICK-4 (incomplete) excluded from all aggregations', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)
    const ids = agg.completedTickets.map(t => t.external_id)
    expect(ids).not.toContain('TICK-4')
    expect(agg.cycleTimes).toHaveLength(3)
  })
})

describe('computeAggregate — mode variants', () => {
  it('first_first: TICK-3 cycle=7d changes cycleTimes mean', async () => {
    const ctx = await setup({ cycle_time_mode: 'first_first' })
    const agg = computeAggregate(ctx!)
    const sorted = [...agg.cycleTimes].sort((a, b) => a - b)
    // TICK-3 first_first = 7d instead of 14d
    expect(sorted[2]).toBeCloseTo(10, 0)  // was 14, now 10 is max (TICK-2=10, TICK-3=7)
    expect(sorted[1]).toBeCloseTo(7, 0)
  })

  it('last_last: TICK-3 cycle=5d', async () => {
    const ctx = await setup({ cycle_time_mode: 'last_last' })
    const agg = computeAggregate(ctx!)
    const sorted = [...agg.cycleTimes].sort((a, b) => a - b)
    expect(sorted[2]).toBeCloseTo(10, 0)  // TICK-2 is now slowest
    expect(sorted[0]).toBeCloseTo(5, 0)   // could be TICK-1 or TICK-3 (both 5d)
  })
})

describe('computeAggregate — matches metrics API values', () => {
  it('summary mean_days matches computeAggregate cycleTimes mean', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)

    const apiRes = await app.request(`/api/v1/metrics/${ctx!.imp.id}/summary`)
    const { data } = await apiRes.json() as { data: any }

    const mean = agg.cycleTimes.reduce((a, b) => a + b, 0) / agg.cycleTimes.length
    expect(data.cycle_time.mean_days).toBeCloseTo(mean, 1)
  })

  it('cycle-times endpoint matches completedTickets', async () => {
    const ctx = await setup()
    const agg = computeAggregate(ctx!)

    const apiRes = await app.request(`/api/v1/metrics/${ctx!.imp.id}/cycle-times`)
    const { data } = await apiRes.json() as { data: { tickets: any[] } }

    expect(data.tickets).toHaveLength(agg.completedTickets.length)
  })
})
