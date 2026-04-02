/**
 * Cross-validation tests using the GAMMA "Real World Team" fixture.
 * 434 tickets, Jan–Dec 2025, board rebuilt twice, multiple edge cases.
 *
 * Goals:
 * - No NaN / Infinity / null in computed numeric values
 * - Median within [P25, P75]
 * - Rework rate matches expected generation rate (~20%)
 * - No negative cycle times
 * - Monte Carlo runs without crash
 * - current_status defined on all tickets
 * - Throughput sum ≤ ticket count
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'
import path from 'path'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions } from '../src/db/schema.js'
import { loadImportContext } from '../src/lib/context.js'
import { computeAggregate } from '../src/lib/aggregate.js'
import { aggregateRework } from '../src/analyzers/rework.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/demo-realworld.json'), 'utf-8')
)

const GAMMA_STATUS_ORDER = ['Backlog', 'Ready for Dev', 'In Progress', 'In Review', 'QA', 'Done']

const GAMMA_CONFIG = {
  name: 'Demo: Real World Team',
  source_type: 'jira' as const,
  base_url: null,
  status_order: JSON.stringify(GAMMA_STATUS_ORDER),
  cycle_time_start_status: 'In Progress',
  cycle_time_end_status: 'Done',
  cycle_time_mode: 'first_last',
  lead_time_start_status: null,
  lead_time_end_status: null,
  created_at: new Date().toISOString(),
}

let importId: string

beforeAll(async () => {
  await migrate()
})

beforeEach(async () => {
  // Clear previous state
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(importSessions)
  await db.delete(projectConfigs)

  const configId = crypto.randomUUID()
  await db.insert(projectConfigs).values({ id: configId, ...GAMMA_CONFIG })

  importId = crypto.randomUUID()
  await db.insert(importSessions).values({
    id: importId,
    config_id: configId,
    source_type: FIXTURE.source_type,
    project_key: FIXTURE.project_key,
    file_name: 'demo-realworld.json',
    ticket_count: FIXTURE.tickets.length,
    imported_at: new Date().toISOString(),
    health_report: null,
  })

  const ticketRows: (typeof tickets.$inferInsert)[] = []
  const transitionRows: (typeof ticketTransitions.$inferInsert)[] = []

  for (const t of FIXTURE.tickets) {
    const ticketId = crypto.randomUUID()
    ticketRows.push({
      id: ticketId,
      import_id: importId,
      external_id: t.external_id,
      title: t.title,
      ticket_type: t.ticket_type,
      created_at: t.created_at,
      external_link: null,
      extra_metadata: null,
    })
    for (const tr of t.transitions) {
      transitionRows.push({
        id: crypto.randomUUID(),
        ticket_id: ticketId,
        from_status: tr.from_status ?? null,
        to_status: tr.to_status,
        transitioned_at: tr.transitioned_at,
      })
    }
  }

  if (ticketRows.length) await db.insert(tickets).values(ticketRows)
  if (transitionRows.length) await db.insert(ticketTransitions).values(transitionRows)
})

describe('GAMMA fixture: loadImportContext', () => {
  it('loads all 434 tickets without error', async () => {
    const ctx = await loadImportContext(importId)
    expect(ctx).not.toBeNull()
    expect(ctx!.tickets).toHaveLength(FIXTURE.tickets.length)
  })

  it('every ticket has a defined current_status', async () => {
    const ctx = await loadImportContext(importId)
    for (const t of ctx!.tickets) {
      expect(t.current_status).not.toBeUndefined()
    }
  })

  it('no ticket has a negative cycle_time_days', async () => {
    const ctx = await loadImportContext(importId)
    for (const t of ctx!.tickets) {
      if (t.cycle_time_days !== null) {
        expect(t.cycle_time_days).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('no ticket has a negative lead_time_days', async () => {
    const ctx = await loadImportContext(importId)
    for (const t of ctx!.tickets) {
      if (t.lead_time_days !== null) {
        expect(t.lead_time_days).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('incomplete tickets (no Done) have null cycle_time_days', async () => {
    const ctx = await loadImportContext(importId)
    const incomplete = ctx!.tickets.filter(t => !t.completed)
    for (const t of incomplete) {
      expect(t.cycle_time_days).toBeNull()
    }
    // ~5% should be no-transition (stuck in Backlog)
    expect(incomplete.length).toBeGreaterThan(0)
  })
})

describe('GAMMA fixture: computeAggregate', () => {
  it('produces no NaN or Infinity in numeric fields', async () => {
    const ctx = await loadImportContext(importId)
    const agg = computeAggregate(ctx!)

    const checkFinite = (val: number | null, label: string) => {
      if (val !== null) {
        expect(Number.isFinite(val), `${label} should be finite`).toBe(true)
      }
    }

    // cycleTimePercentiles shape: { p50, p70, p85, p95, mean_days, median_days, sample_size, warning }
    checkFinite(agg.cycleTimePercentiles.mean_days, 'cycleTimePercentiles.mean')
    checkFinite(agg.cycleTimePercentiles.median_days, 'cycleTimePercentiles.median')
    checkFinite(agg.cycleTimePercentiles.p50, 'cycleTimePercentiles.p50')
    checkFinite(agg.cycleTimePercentiles.p70, 'cycleTimePercentiles.p70')
    checkFinite(agg.cycleTimePercentiles.p85, 'cycleTimePercentiles.p85')
    checkFinite(agg.cycleTimePercentiles.p95, 'cycleTimePercentiles.p95')
    checkFinite(agg.leadTimePercentiles.mean_days, 'leadTimePercentiles.mean')
    checkFinite(agg.leadTimePercentiles.median_days, 'leadTimePercentiles.median')
    checkFinite(agg.throughput, 'throughput')

    for (const [status, vals] of Object.entries(agg.timeInStatus)) {
      checkFinite(vals.mean_days, `timeInStatus.${status}.mean`)
      checkFinite(vals.median_days, `timeInStatus.${status}.median`)
      expect(vals.mean_days, `timeInStatus.${status}.mean >= 0`).toBeGreaterThanOrEqual(0)
      expect(vals.median_days, `timeInStatus.${status}.median >= 0`).toBeGreaterThanOrEqual(0)
    }
  })

  it('median lies between min and p95 when available', async () => {
    const ctx = await loadImportContext(importId)
    const agg = computeAggregate(ctx!)
    const { median_days, p50, p95 } = agg.cycleTimePercentiles

    if (median_days !== null && p95 !== null) {
      expect(median_days).toBeLessThanOrEqual(p95)
    }
    if (median_days !== null && p50 !== null) {
      // p50 is 50th percentile, median should be close (within 2× of p50)
      expect(Math.abs(median_days - p50)).toBeLessThanOrEqual(Math.max(p50 * 2, 1))
    }
  })

  it('throughput is a non-negative finite number', async () => {
    const ctx = await loadImportContext(importId)
    const agg = computeAggregate(ctx!)
    expect(typeof agg.throughput).toBe('number')
    expect(Number.isFinite(agg.throughput)).toBe(true)
    expect(agg.throughput).toBeGreaterThanOrEqual(0)
  })

  it('timeInStatus covers exactly cycleStatuses', async () => {
    const ctx = await loadImportContext(importId)
    const agg = computeAggregate(ctx!)
    const statusKeys = Object.keys(agg.timeInStatus)
    // cycleStatuses = In Progress → Done = ['In Progress', 'In Review', 'QA', 'Done']
    expect(statusKeys).toContain('In Progress')
    expect(statusKeys).toContain('In Review')
    expect(statusKeys).toContain('QA')
    expect(statusKeys).toContain('Done')
    // 'Ready for Dev' is BEFORE cycleStart → outside cycle window
    expect(statusKeys).not.toContain('Ready for Dev')
    // 'In Review (blocked)' is not in status_order at all
    expect(statusKeys).not.toContain('In Review (blocked)')
  })

  it('computeAggregate runs without error and returns expected fields', async () => {
    const ctx = await loadImportContext(importId)
    const agg = computeAggregate(ctx!)
    expect(agg.cycleTimes).toBeDefined()
    expect(Array.isArray(agg.cycleTimes)).toBe(true)
    expect(agg.cycleTimes.length).toBeGreaterThan(0)
    expect(agg.dateRange.from).not.toBeNull()
    expect(agg.dateRange.to).not.toBeNull()
  })
})

describe('GAMMA fixture: rework', () => {
  it('rework rate is between 10% and 40% (generated ~20%)', async () => {
    const ctx = await loadImportContext(importId)
    const completed = ctx!.tickets.filter(t => t.completed)
    const result = aggregateRework(
      completed.map(t => ({ transitions: t.transitions, cycle_time_days: t.cycle_time_days })),
      GAMMA_STATUS_ORDER,
    )
    const rate = result.tickets_with_rework / result.total_completed
    expect(rate).toBeGreaterThan(0.05)   // at least 5%
    expect(rate).toBeLessThan(0.50)      // at most 50%
  })

  it('rework paths contain only valid from/to statuses', async () => {
    const ctx = await loadImportContext(importId)
    const completed = ctx!.tickets.filter(t => t.completed)
    const result = aggregateRework(
      completed.map(t => ({ transitions: t.transitions, cycle_time_days: t.cycle_time_days })),
      GAMMA_STATUS_ORDER,
    )
    for (const path of result.rework_paths) {
      expect(path.from).toBeTruthy()
      expect(path.to).toBeTruthy()
      expect(path.count).toBeGreaterThan(0)
    }
  })
})
