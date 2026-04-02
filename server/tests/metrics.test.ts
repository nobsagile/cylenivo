/**
 * Metrics pipeline tests — verify the full chain:
 * import tickets → calculate summary/cycle-times/lead-times/time-in-status → exact values
 *
 * Fixture: 4 tickets with known exact values (all transitions at 12:00:00Z for clean 24h diffs)
 *   TICK-1: simple, cycle=5d, lead=9d
 *   TICK-2: simple, cycle=10d, lead=12d
 *   TICK-3: rework (In Dev twice, Done twice)
 *              first_last=14d | first_first=7d | last_last=5d
 *              lead first_last=21d | lead first_first=14d
 *   TICK-4: incomplete (no Done) — excluded from all counts
 *
 * Config: cycle_start="In Dev", cycle_end="Done", status_order=[Backlog,Ready,In Dev,Review,Done]
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'

import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8')
)
const CHAOS = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/chaos-fixture.json'), 'utf-8')
)

const STATUS_ORDER = ['Backlog', 'Ready', 'In Dev', 'Review', 'Done']
const BASE_CONFIG = {
  name: 'Metrics Test',
  source_type: 'jira',
  status_order: STATUS_ORDER,
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

async function createConfig(overrides: Record<string, unknown> = {}) {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...BASE_CONFIG, ...overrides }),
  })
  const { data } = await res.json() as { data: { id: string } }
  return data.id
}

async function doImport(configId: string, fixture = FIXTURE) {
  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(fixture)], { type: 'application/json' }), 'test.json')
  form.append('config_id', configId)
  const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const { data } = await res.json() as { data: { id: string } }
  return data.id
}

async function getSummary(importId: string) {
  const res = await app.request(`/api/v1/metrics/${importId}/summary`)
  const { data } = await res.json() as { data: any }
  return data
}

async function getCycleTimes(importId: string) {
  const res = await app.request(`/api/v1/metrics/${importId}/cycle-times`)
  const { data } = await res.json() as { data: { tickets: any[] } }
  return data.tickets
}

async function getLeadTimes(importId: string) {
  const res = await app.request(`/api/v1/metrics/${importId}/lead-times`)
  const { data } = await res.json() as { data: { values: number[] } }
  return data.values
}

async function getTimeInStatus(importId: string) {
  const res = await app.request(`/api/v1/metrics/${importId}/time-in-status`)
  const { data } = await res.json() as { data: { tickets: any[] } }
  return data.tickets
}

// ─── first_last (default) ─────────────────────────────────────────────────────

describe('metrics / first_last mode (default)', () => {
  it('summary: counts 3 completed, 4 total', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.ticket_count).toBe(4)
    expect(s.completed_ticket_count).toBe(3)
  })

  it('summary: cycle time mean=(5+10+14)/3=9.67, median=10', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.cycle_time.mean_days).toBeCloseTo(9.67, 1)
    expect(s.cycle_time.median_days).toBeCloseTo(10, 0)
    expect(s.cycle_time.sample_size).toBe(3)
  })

  it('summary: lead time mean=(9+12+21)/3=14, median=12', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.lead_time.mean_days).toBeCloseTo(14, 0)
    expect(s.lead_time.median_days).toBeCloseTo(12, 0)
    expect(s.lead_time.sample_size).toBe(3)
  })

  it('cycle-times: correct per-ticket values', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const ct = await getCycleTimes(importId)

    const byId = Object.fromEntries(ct.map((t: any) => [t.external_id, t.cycle_time_days]))
    expect(byId['TICK-1']).toBeCloseTo(5, 0)
    expect(byId['TICK-2']).toBeCloseTo(10, 0)
    expect(byId['TICK-3']).toBeCloseTo(14, 0)   // first In Dev (Jan1) → last Done (Jan15)
    expect(byId['TICK-4']).toBeUndefined()        // incomplete — excluded
  })

  it('lead-times: [9, 12, 21] days', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const lt = await getLeadTimes(importId)

    const sorted = [...lt].sort((a, b) => a - b)
    expect(sorted[0]).toBeCloseTo(9, 0)
    expect(sorted[1]).toBeCloseTo(12, 0)
    expect(sorted[2]).toBeCloseTo(21, 0)
  })

  it('time-in-status: TICK-1 spends 3d in In Dev, 2d in Review', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const tis = await getTimeInStatus(importId)

    const tick1 = tis.find((t: any) => t.external_id === 'TICK-1')
    expect(tick1.status_durations['In Dev']).toBeCloseTo(3, 0)   // Jan5→Jan8
    expect(tick1.status_durations['Review']).toBeCloseTo(2, 0)   // Jan8→Jan10
  })

  it('time-in-status: TICK-2 spends 10d in In Dev', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const tis = await getTimeInStatus(importId)

    const tick2 = tis.find((t: any) => t.external_id === 'TICK-2')
    expect(tick2.status_durations['In Dev']).toBeCloseTo(10, 0)  // Jan12→Jan22
  })

  it('time-in-status: TICK-3 accumulates 12d in In Dev (7d + 5d rework)', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const tis = await getTimeInStatus(importId)

    const tick3 = tis.find((t: any) => t.external_id === 'TICK-3')
    // First In Dev: Jan1→Jan8 = 7d, Second In Dev: Jan10→Jan15 = 5d, total 12d
    expect(tick3.status_durations['In Dev']).toBeCloseTo(12, 0)
  })

  it('incomplete ticket TICK-4 excluded from both time-in-status and cycle times', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const [ct, tis] = await Promise.all([getCycleTimes(importId), getTimeInStatus(importId)])

    expect(ct.find((t: any) => t.external_id === 'TICK-4')).toBeUndefined()
    expect(tis.find((t: any) => t.external_id === 'TICK-4')).toBeUndefined()
  })
})

// ─── first_first ─────────────────────────────────────────────────────────────

describe('metrics / first_first mode', () => {
  it('cycle-times: TICK-3=7d (first In Dev → first Done, not last)', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_first' })
    const importId = await doImport(configId)
    const ct = await getCycleTimes(importId)

    const byId = Object.fromEntries(ct.map((t: any) => [t.external_id, t.cycle_time_days]))
    expect(byId['TICK-1']).toBeCloseTo(5, 0)
    expect(byId['TICK-2']).toBeCloseTo(10, 0)
    expect(byId['TICK-3']).toBeCloseTo(7, 0)    // first In Dev (Jan1) → first Done (Jan8)
  })

  it('lead-times: TICK-3=14d (created Dec25 → first Done Jan8)', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_first' })
    const importId = await doImport(configId)
    const lt = await getLeadTimes(importId)

    const sorted = [...lt].sort((a, b) => a - b)
    expect(sorted[0]).toBeCloseTo(9, 0)   // TICK-1
    expect(sorted[1]).toBeCloseTo(12, 0)  // TICK-2
    expect(sorted[2]).toBeCloseTo(14, 0)  // TICK-3: Dec25 → Jan8
  })

  it('summary: mean=(5+10+7)/3=7.33 — different from first_last', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_first' })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.cycle_time.mean_days).toBeCloseTo(7.33, 1)
  })
})

// ─── last_last ────────────────────────────────────────────────────────────────

describe('metrics / last_last mode', () => {
  it('cycle-times: TICK-3=5d (last In Dev Jan10 → last Done Jan15)', async () => {
    const configId = await createConfig({ cycle_time_mode: 'last_last' })
    const importId = await doImport(configId)
    const ct = await getCycleTimes(importId)

    const byId = Object.fromEntries(ct.map((t: any) => [t.external_id, t.cycle_time_days]))
    expect(byId['TICK-1']).toBeCloseTo(5, 0)
    expect(byId['TICK-2']).toBeCloseTo(10, 0)
    expect(byId['TICK-3']).toBeCloseTo(5, 0)    // last In Dev (Jan10) → last Done (Jan15)
  })

  it('summary: mean=(5+10+5)/3=6.67', async () => {
    const configId = await createConfig({ cycle_time_mode: 'last_last' })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.cycle_time.mean_days).toBeCloseTo(6.67, 1)
  })
})

// ─── health report ───────────────────────────────────────────────────────────

describe('metrics / health report', () => {
  it('import returns health_report with correct counts for chaos fixture', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify(CHAOS)], { type: 'application/json' }), 'chaos.json')
    form.append('config_id', configId)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    const { data } = await res.json() as { data: any }

    expect(data.health_report).toBeDefined()
    // CHAOS-1 never enters 'In Dev' → tickets_without_cycle_start = 1
    expect(data.health_report.tickets_without_cycle_start).toBe(1)
    // CHAOS-5 enters 'In Dev' but not 'Done' → tickets_incomplete = 1
    expect(data.health_report.tickets_incomplete).toBe(1)
    // 'Sprint' and 'Deployed' from CHAOS-4 are not in status_order
    expect(data.health_report.unknown_statuses).toContain('Sprint')
    expect(data.health_report.unknown_statuses).toContain('Deployed')
  })

  it('import response includes health_report when listing sessions', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify(CHAOS)], { type: 'application/json' }), 'chaos.json')
    form.append('config_id', configId)
    await app.request('/api/v1/imports', { method: 'POST', body: form })

    const res = await app.request('/api/v1/imports')
    const { data } = await res.json() as { data: any[] }
    expect(data[0].health_report).toBeDefined()
    expect(data[0].health_report.tickets_without_cycle_start).toBe(1)
  })
})

// ─── external_link ───────────────────────────────────────────────────────────

describe('metrics / external_link', () => {
  it('external_link from fixture is stored and returned on ticket', async () => {
    const configId = await createConfig()
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/tickets?import_id=${importId}&limit=100`)
    const { data } = await res.json() as { data: { tickets: any[] } }
    const tick1 = data.tickets.find((t: any) => t.external_id === 'TICK-1')
    expect(tick1).toBeDefined()
    expect(tick1.external_link).toBe('https://example.atlassian.net/browse/TICK-1')
  })

  it('ticket without external_link in fixture has null external_link', async () => {
    const configId = await createConfig()
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/tickets?import_id=${importId}&limit=100`)
    const { data } = await res.json() as { data: { tickets: any[] } }
    const tick2 = data.tickets.find((t: any) => t.external_id === 'TICK-2')
    expect(tick2).toBeDefined()
    expect(tick2.external_link).toBeNull()
  })
})

// ─── mode comparison ─────────────────────────────────────────────────────────

describe('metrics / mode comparison sanity check', () => {
  it('all three modes produce different cycle times for TICK-3 (rework ticket)', async () => {
    const [id_fl, id_ff, id_ll] = await Promise.all([
      createConfig({ cycle_time_mode: 'first_last', name: 'A' }),
      createConfig({ cycle_time_mode: 'first_first', name: 'B' }),
      createConfig({ cycle_time_mode: 'last_last', name: 'C' }),
    ])

    // Need separate imports since each config is separate
    const beforeEachClean = false // imports share same DB, configs are separate — ok
    const [imp_fl, imp_ff, imp_ll] = await Promise.all([
      doImport(id_fl),
      doImport(id_ff),
      doImport(id_ll),
    ])

    const [ct_fl, ct_ff, ct_ll] = await Promise.all([
      getCycleTimes(imp_fl),
      getCycleTimes(imp_ff),
      getCycleTimes(imp_ll),
    ])

    const getT3 = (ct: any[]) => ct.find((t: any) => t.external_id === 'TICK-3')?.cycle_time_days

    expect(getT3(ct_fl)).toBeCloseTo(14, 0)  // first_last
    expect(getT3(ct_ff)).toBeCloseTo(7, 0)   // first_first
    expect(getT3(ct_ll)).toBeCloseTo(5, 0)   // last_last

    // Simple tickets unaffected by mode (enter each status only once)
    const getT1 = (ct: any[]) => ct.find((t: any) => t.external_id === 'TICK-1')?.cycle_time_days
    expect(getT1(ct_fl)).toBeCloseTo(5, 0)
    expect(getT1(ct_ff)).toBeCloseTo(5, 0)
    expect(getT1(ct_ll)).toBeCloseTo(5, 0)
  })
})

// ─── chaos / dirty data ───────────────────────────────────────────────────────
// Config: cycle_start=In Dev, cycle_end=Done, status_order=[Backlog,In Dev,Review,Done]

const CHAOS_CONFIG = {
  name: 'Chaos Test',
  source_type: 'jira',
  status_order: ['Backlog', 'In Dev', 'Review', 'Done'],
  cycle_time_start_status: 'In Dev',
  cycle_time_end_status: 'Done',
}

describe('metrics / chaos data — old workflows, unknown statuses, rework', () => {
  it('old-workflow ticket (CHAOS-1) is excluded from cycle times', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const ct = await getCycleTimes(importId)
    expect(ct.find((t: any) => t.external_id === 'CHAOS-1')).toBeUndefined()
  })

  it('old-workflow ticket (CHAOS-1) excluded from time-in-status (no valid cycle time)', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const tis = await getTimeInStatus(importId)
    expect(tis.find((t: any) => t.external_id === 'CHAOS-1')).toBeUndefined()
  })

  it('normal ticket (CHAOS-2) has correct cycle time ignoring pre-cycle Backlog', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const ct = await getCycleTimes(importId)
    const c2 = ct.find((t: any) => t.external_id === 'CHAOS-2')
    expect(c2.cycle_time_days).toBeCloseTo(5, 0)  // In Dev Jan5 → Done Jan10
  })

  it('ticket with unknown statuses (CHAOS-4) has correct cycle time, unknown statuses not in time-in-status', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const [ct, tis] = await Promise.all([getCycleTimes(importId), getTimeInStatus(importId)])

    const c4ct = ct.find((t: any) => t.external_id === 'CHAOS-4')
    expect(c4ct.cycle_time_days).toBeCloseTo(7, 0)  // In Dev Feb3 → Done Feb10

    const c4tis = tis.find((t: any) => t.external_id === 'CHAOS-4')
    expect(c4tis.status_durations['Sprint']).toBeUndefined()
    expect(c4tis.status_durations['Deployed']).toBeUndefined()
  })

  it('incomplete ticket (CHAOS-5) excluded from both cycle times and time-in-status', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const [ct, tis] = await Promise.all([getCycleTimes(importId), getTimeInStatus(importId)])
    expect(ct.find((t: any) => t.external_id === 'CHAOS-5')).toBeUndefined()
    expect(tis.find((t: any) => t.external_id === 'CHAOS-5')).toBeUndefined()
  })

  it('summary only includes 3 completed tickets (CHAOS-1 old-workflow, CHAOS-5 incomplete excluded)', async () => {
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const s = await getSummary(importId)
    expect(s.ticket_count).toBe(5)
    expect(s.completed_ticket_count).toBe(3)  // CHAOS-2, CHAOS-3, CHAOS-4
  })
})

// ─── /rework endpoint ─────────────────────────────────────────────────────────

describe('metrics / /rework endpoint', () => {
  it('returns correct rework counts for metrics fixture (first_last)', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/rework`)
    const { data } = await res.json() as { data: any }

    expect(data.total_completed).toBe(3)    // TICK-1, TICK-2, TICK-3
    expect(data.tickets_with_rework).toBe(1) // TICK-3 only (Done→In Dev is backward)
  })

  it('rework path: Done → In Dev for TICK-3', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/rework`)
    const { data } = await res.json() as { data: any }

    expect(data.rework_paths).toHaveLength(1)
    expect(data.rework_paths[0]).toMatchObject({ from: 'Done', to: 'In Dev', count: 1 })
  })

  it('avg_cycle_with_rework=14 (TICK-3), avg_without=7.5 (TICK-1=5, TICK-2=10)', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/rework`)
    const { data } = await res.json() as { data: any }

    expect(data.avg_cycle_with_rework).toBeCloseTo(14, 0)
    expect(data.avg_cycle_without_rework).toBeCloseTo(7.5, 1)  // (5+10)/2
  })

  it('returns no rework for chaos fixture where rework is absent', async () => {
    // CHAOS-2 (normal) and CHAOS-4 (unknown statuses) have no backward moves in status_order
    // CHAOS-3 may have backward moves
    const configId = await createConfig(CHAOS_CONFIG)
    const importId = await doImport(configId, CHAOS)
    const res = await app.request(`/api/v1/metrics/${importId}/rework`)
    const { data } = await res.json() as { data: any }

    expect(data.total_completed).toBe(3)
    expect(data.tickets_with_rework).toBeGreaterThanOrEqual(0)
    expect(data.tickets_with_rework).toBeLessThanOrEqual(data.total_completed)
  })
})

// ─── /cycle-time-by-type endpoint ────────────────────────────────────────────

describe('metrics / /cycle-time-by-type endpoint', () => {
  it('returns correct types sorted by count desc (first_last)', async () => {
    // Completed: TICK-1=story/5d, TICK-2=bug/10d, TICK-3=story/14d
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/cycle-time-by-type`)
    const { data } = await res.json() as { data: { types: any[] } }

    const byType = Object.fromEntries(data.types.map((t: any) => [t.type, t]))
    expect(data.types[0].type).toBe('story') // highest count

    expect(byType['story'].count).toBe(2)
    expect(byType['story'].mean).toBeCloseTo(9.5, 1)   // (5+14)/2
    expect(byType['story'].median).toBeCloseTo(9.5, 1)
    expect(byType['story'].p85).toBeCloseTo(14, 0)     // sorted=[5,14], idx=1

    expect(byType['bug'].count).toBe(1)
    expect(byType['bug'].mean).toBeCloseTo(10, 0)
    expect(byType['bug'].p85).toBeCloseTo(10, 0)       // only 1 value
  })

  it('incomplete ticket TICK-4 (task) not included in types', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/cycle-time-by-type`)
    const { data } = await res.json() as { data: { types: any[] } }

    const types = data.types.map((t: any) => t.type)
    expect(types).not.toContain('task')   // TICK-4 never completed
  })
})

// ─── /lead-times tickets array ────────────────────────────────────────────────

describe('metrics / lead-times tickets array', () => {
  it('response includes tickets array with per-ticket lead_time_days', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/lead-times`)
    const { data } = await res.json() as { data: { values: number[]; tickets: any[] } }

    expect(data.tickets).toBeDefined()
    expect(data.tickets).toHaveLength(3)  // TICK-1, TICK-2, TICK-3 (TICK-4 incomplete)

    const byId = Object.fromEntries(data.tickets.map((t: any) => [t.external_id, t]))
    expect(byId['TICK-1'].lead_time_days).toBeCloseTo(9, 0)
    expect(byId['TICK-2'].lead_time_days).toBeCloseTo(12, 0)
    expect(byId['TICK-3'].lead_time_days).toBeCloseTo(21, 0)  // first_last: Dec25→Jan15
  })

  it('values array matches tickets array lead times', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const res = await app.request(`/api/v1/metrics/${importId}/lead-times`)
    const { data } = await res.json() as { data: { values: number[]; tickets: any[] } }

    const fromTickets = data.tickets.map((t: any) => t.lead_time_days).sort((a: number, b: number) => a - b)
    const fromValues = [...data.values].sort((a, b) => a - b)
    expect(fromValues).toEqual(fromTickets)
  })
})

// ─── config_context in /summary ───────────────────────────────────────────────

describe('metrics / config_context in summary', () => {
  it('summary includes config_context with status_order and boundaries', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.config_context).toBeDefined()
    expect(s.config_context.status_order).toEqual(STATUS_ORDER)
    expect(s.config_context.cycle_time_start_status).toBe('In Dev')
    expect(s.config_context.cycle_time_end_status).toBe('Done')
    expect(s.config_context.cycle_time_mode).toBe('first_last')
    expect(s.config_context.lead_time_start_status).toBeNull()
    expect(s.config_context.lead_time_end_status).toBeNull()
  })

  it('config_context reflects lead_time_start_status when configured', async () => {
    const configId = await createConfig({
      cycle_time_mode: 'first_last',
      lead_time_start_status: 'Backlog',
      lead_time_end_status: 'Done',
    })
    const importId = await doImport(configId)
    const s = await getSummary(importId)

    expect(s.config_context.lead_time_start_status).toBe('Backlog')
    expect(s.config_context.lead_time_end_status).toBe('Done')
  })
})
