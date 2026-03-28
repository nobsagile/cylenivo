/**
 * TN Golden Dataset Tests
 *
 * Anonymized real-world data exported from a production TN import.
 * Generated 2026-03-28 via: DB_PATH=server/dev.db npx tsx server/scripts/export-fixture.ts
 *   --import-id 5a30a686-f6df-4f82-8b45-70f0ed473c7e --anonymize --project-key PROJ
 *   --out server/tests/fixtures/tn-fixture.json
 *
 * Config:
 *   status_order: [Backlog, Up Next, Preparation, Ready For Development,
 *                  Development, Customer Feedback, Ready for Release, Done]
 *   cycle_start:  Preparation  →  cycle_end: Customer Feedback
 *   cycle_mode:   last_last
 *   lead_start:   Up Next  →  lead_end: Done
 *
 * 75 tickets, 34 completed (cycle_time_days != null, confirmed from raw DB).
 *
 * Purpose:
 *   1. Regression guard: if expected values change, investigate why
 *   2. Invariant validation: mathematical correctness independent of values
 *   3. New endpoints coverage: /rework, /cycle-time-by-type, extended /lead-times
 *
 * Do not modify expected values without re-verifying from raw data.
 */

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'

const TN_FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/tn-fixture.json'), 'utf-8')
)

const TN_CONFIG = {
  name: 'TN Golden',
  source_type: 'jira',
  status_order: ['Backlog', 'Up Next', 'Preparation', 'Ready For Development',
    'Development', 'Customer Feedback', 'Ready for Release', 'Done'],
  cycle_time_start_status: 'Preparation',
  cycle_time_end_status: 'Customer Feedback',
  cycle_time_mode: 'last_last',
  lead_time_start_status: 'Up Next',
  lead_time_end_status: 'Done',
}

beforeAll(async () => { await migrate() })

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

async function createTNConfig() {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(TN_CONFIG),
  })
  const { data } = await res.json() as { data: { id: string } }
  return data.id
}

async function importTN(configId: string) {
  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(TN_FIXTURE)], { type: 'application/json' }), 'tn.json')
  form.append('config_id', configId)
  const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const { data } = await res.json() as { data: { id: string } }
  return data.id
}

// ─── Structural ───────────────────────────────────────────────────────────────

describe('TN golden / structural', () => {
  it('imports all 75 tickets', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    const { data } = await res.json() as { data: any }
    expect(data.ticket_count).toBe(75)
  })

  it('completed_ticket_count matches last_last calculation (34)', async () => {
    // 34 tickets have last(Preparation) → last(Customer Feedback) with CF > Prep
    // Verified against raw DB: SELECT COUNT(*) from completed_with_last_last_cycle
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    const { data } = await res.json() as { data: any }
    expect(data.completed_ticket_count).toBe(34)
  })

  it('config_context reflects TN config exactly', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    const { data } = await res.json() as { data: any }

    expect(data.config_context.status_order).toEqual(TN_CONFIG.status_order)
    expect(data.config_context.cycle_time_start_status).toBe('Preparation')
    expect(data.config_context.cycle_time_end_status).toBe('Customer Feedback')
    expect(data.config_context.cycle_time_mode).toBe('last_last')
    expect(data.config_context.lead_time_start_status).toBe('Up Next')
    expect(data.config_context.lead_time_end_status).toBe('Done')
  })
})

// ─── Invariants ───────────────────────────────────────────────────────────────

describe('TN golden / invariants', () => {
  it('cycle time percentiles monotonically increase: P50 ≤ P85 ≤ P95', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    const { data } = await res.json() as { data: any }

    const { p50, p85, p95 } = data.cycle_time
    if (p50 != null && p85 != null) expect(p50).toBeLessThanOrEqual(p85)
    if (p85 != null && p95 != null) expect(p85).toBeLessThanOrEqual(p95)
    if (p50 != null && p95 != null) expect(p50).toBeLessThanOrEqual(p95)
  })

  it('lead time percentiles monotonically increase: P50 ≤ P85 ≤ P95', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    const { data } = await res.json() as { data: any }

    const { p50, p85, p95 } = data.lead_time
    if (p50 != null && p85 != null) expect(p50).toBeLessThanOrEqual(p85)
    if (p85 != null && p95 != null) expect(p85).toBeLessThanOrEqual(p95)
  })

  it('rework: tickets_with_rework ≤ total_completed', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/rework`)
    const { data } = await res.json() as { data: any }

    expect(data.tickets_with_rework).toBeLessThanOrEqual(data.total_completed)
    expect(data.total_completed).toBe(34)
  })

  it('rework: avg_cycle_with_rework ≥ avg_cycle_without_rework (rework costs time)', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/rework`)
    const { data } = await res.json() as { data: any }

    if (data.avg_cycle_with_rework != null && data.avg_cycle_without_rework != null) {
      expect(data.avg_cycle_with_rework).toBeGreaterThanOrEqual(data.avg_cycle_without_rework)
    }
  })

  it('time_in_status: all statuses are within cycle window (Preparation → Customer Feedback)', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/time-in-status`)
    const { data } = await res.json() as { data: { statuses: string[]; tickets: any[] } }

    const cycleStatuses = new Set(data.statuses)
    const statusOrder = TN_CONFIG.status_order
    const cycleStart = statusOrder.indexOf('Preparation')
    const cycleEnd = statusOrder.indexOf('Customer Feedback')
    const expectedCycleStatuses = statusOrder.slice(cycleStart, cycleEnd + 1)
    expect(data.statuses).toEqual(expectedCycleStatuses)

    // All per-ticket keys must be within cycleStatuses
    for (const ticket of data.tickets) {
      for (const status of Object.keys(ticket.status_durations)) {
        expect(cycleStatuses.has(status)).toBe(true)
      }
    }
  })

  it('cycle-time-by-type: sum of type counts equals total_completed', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/cycle-time-by-type`)
    const { data } = await res.json() as { data: { types: any[] } }

    const totalByType = data.types.reduce((sum: number, t: any) => sum + t.count, 0)
    expect(totalByType).toBe(34)
  })

  it('lead-times tickets array: values array matches tickets array', async () => {
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/lead-times`)
    const { data } = await res.json() as { data: { values: number[]; tickets: any[] } }

    expect(data.tickets).toBeDefined()
    const fromTickets = data.tickets.map((t: any) => t.lead_time_days).sort((a: number, b: number) => a - b)
    const fromValues = [...data.values].sort((a, b) => a - b)
    expect(fromValues).toEqual(fromTickets)
  })
})

// ─── Golden values ────────────────────────────────────────────────────────────

describe('TN golden / cycle-time-by-type golden values', () => {
  it('task is the dominant type (32 completed of 65 total)', async () => {
    // Raw SQL confirms: 32 task, 1 story, 1 bug completed in last_last mode
    const configId = await createTNConfig()
    const importId = await importTN(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/cycle-time-by-type`)
    const { data } = await res.json() as { data: { types: any[] } }

    const byType = Object.fromEntries(data.types.map((t: any) => [t.type, t]))
    expect(byType['task']?.count).toBe(32)
    expect(data.types[0].type).toBe('task')   // highest count comes first
  })
})
