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

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8')
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

async function doImport(configId: string) {
  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
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

  it('incomplete ticket TICK-4 appears in time-in-status but not in cycle times', async () => {
    const configId = await createConfig({ cycle_time_mode: 'first_last' })
    const importId = await doImport(configId)
    const [ct, tis] = await Promise.all([getCycleTimes(importId), getTimeInStatus(importId)])

    expect(ct.find((t: any) => t.external_id === 'TICK-4')).toBeUndefined()
    expect(tis.find((t: any) => t.external_id === 'TICK-4')).toBeDefined()
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
