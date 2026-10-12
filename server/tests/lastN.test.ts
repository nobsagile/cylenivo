/**
 * "Last N completed tickets" filter (#144) — an alternative to the date range.
 * Analyzer first, then every metric endpoint against the 4-ticket fixture.
 *
 * Fixture completions (all 12:00Z; Jan 1 2024 is a Monday):
 *   first_last:  TICK-2 Jan22 (10d) · TICK-3 Jan15 (14d) · TICK-1 Jan10 (5d)
 *   first_first: TICK-2 Jan22 (10d) · TICK-1 Jan10 (5d)  · TICK-3 Jan8  (7d)
 *   last_last:   TICK-2 Jan22 (10d) · TICK-3 Jan15 (5d)  · TICK-1 Jan10 (5d)
 *   TICK-4 never completes.
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'
import { selectLastN } from '../src/analyzers/lastN.js'
import { computeWeeklyBuckets, computeWeeklyThroughput } from '../src/analyzers/monteCarlo.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8')
)

const d = (s: string) => new Date(s + 'T12:00:00Z')
const tk = (external_id: string, completed: string | null, cycle: number | null = 1) =>
  ({ external_id, completed_at: completed ? d(completed) : null, cycle_time_days: completed ? cycle : null })

describe('selectLastN', () => {
  it('picks the N most recent completions and keeps input order', () => {
    const input = [tk('A-1', '2024-01-10'), tk('A-2', '2024-01-22'), tk('A-3', '2024-01-15')]
    const sel = selectLastN(input, 2)
    expect(sel.tickets.map(t => t.external_id)).toEqual(['A-2', 'A-3'])
    expect(sel.from).toEqual(d('2024-01-15'))
  })

  it('ignores tickets without completion or cycle time', () => {
    const input = [tk('A-1', '2024-01-10'), tk('A-2', null), { ...tk('A-3', '2024-01-20'), cycle_time_days: null }]
    expect(selectLastN(input, 5).tickets.map(t => t.external_id)).toEqual(['A-1'])
  })

  it('breaks ties on completed_at by external_id, so it returns exactly N', () => {
    const input = [tk('A-1', '2024-01-10'), tk('A-3', '2024-01-10'), tk('A-2', '2024-01-10')]
    const sel = selectLastN(input, 2)
    expect(sel.tickets.map(t => t.external_id)).toEqual(['A-3', 'A-2'])
  })

  it('N larger than the completed count returns all, without cutting a week', () => {
    const input = [tk('A-1', '2024-01-10'), tk('A-2', '2024-01-11')]
    const sel = selectLastN(input, 50)
    expect(sel.tickets).toHaveLength(2)
    expect(sel.fullWeeksFrom).toBeNull()
  })

  it('no completed tickets → empty selection', () => {
    expect(selectLastN([tk('A-1', null)], 3)).toEqual({ tickets: [], from: null, fullWeeksFrom: null })
  })

  it('flags the oldest week as cut when an unselected ticket shares it', () => {
    // Wed Jan10 selected, Mon Jan8 not → week of Jan8 is partial
    const input = [tk('A-1', '2024-01-08'), tk('A-2', '2024-01-10'), tk('A-3', '2024-01-22')]
    expect(selectLastN(input, 2).fullWeeksFrom).toEqual(new Date('2024-01-15T00:00:00Z'))
  })

  it('does not flag the oldest week when the cut ticket lies in an earlier week', () => {
    const input = [tk('A-1', '2024-01-05'), tk('A-2', '2024-01-10'), tk('A-3', '2024-01-22')]
    expect(selectLastN(input, 2).fullWeeksFrom).toBeNull()
  })
})

describe('weekly helpers: since', () => {
  const dates = [d('2024-01-10'), d('2024-01-22')]
  it('computeWeeklyThroughput drops weeks before since', () => {
    expect(computeWeeklyThroughput(dates, new Date('2024-01-15T00:00:00Z')))
      .toEqual([{ week: '2024-01-22', count: 1 }])
  })
  it('computeWeeklyBuckets drops weeks before since', () => {
    expect(computeWeeklyBuckets(dates, new Date('2024-01-15T00:00:00Z'))).toEqual([1])
    expect(computeWeeklyBuckets(dates)).toEqual([1, 0, 1])
  })
})

// ─── API ─────────────────────────────────────────────────────────────────────

beforeAll(async () => { await migrate() })

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

async function setup(mode: 'first_last' | 'first_first' | 'last_last' = 'first_last') {
  const cfg = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Last N',
      source_type: 'jira',
      status_order: ['Backlog', 'Ready', 'In Dev', 'Review', 'Done'],
      cycle_time_start_status: 'In Dev',
      cycle_time_end_status: 'Done',
      cycle_time_mode: mode,
    }),
  })
  const configId = ((await cfg.json()) as { data: { id: string } }).data.id
  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
  form.append('config_id', configId)
  const imp = await app.request('/api/v1/imports', { method: 'POST', body: form })
  return ((await imp.json()) as { data: { id: string } }).data.id
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get(path: string): Promise<any> {
  const res = await app.request(path)
  expect(res.status).toBe(200)
  return ((await res.json()) as { data: unknown }).data
}

const ids = (list: { external_id: string }[]) => list.map(t => t.external_id).sort()

describe('?last=N on the API', () => {
  it('first_last: last=2 → TICK-2 + TICK-3, mean (10+14)/2', async () => {
    const id = await setup('first_last')
    const s = await get(`/api/v1/metrics/${id}/summary?last=2`)
    expect(s.completed_ticket_count).toBe(2)
    expect(s.cycle_time.mean_days).toBeCloseTo(12, 2)
    expect(s.date_range.from.slice(0, 10)).toBe('2024-01-15')
    expect(ids((await get(`/api/v1/metrics/${id}/cycle-times?last=2`)).tickets)).toEqual(['TICK-2', 'TICK-3'])
  })

  it('first_first: last=2 → TICK-2 + TICK-1, mean (10+5)/2', async () => {
    const id = await setup('first_first')
    const s = await get(`/api/v1/metrics/${id}/summary?last=2`)
    expect(s.cycle_time.mean_days).toBeCloseTo(7.5, 2)
    expect(ids((await get(`/api/v1/metrics/${id}/cycle-times?last=2`)).tickets)).toEqual(['TICK-1', 'TICK-2'])
  })

  it('last_last: last=2 → TICK-2 + TICK-3, mean (10+5)/2', async () => {
    const id = await setup('last_last')
    const s = await get(`/api/v1/metrics/${id}/summary?last=2`)
    expect(s.cycle_time.mean_days).toBeCloseTo(7.5, 2)
    expect(ids((await get(`/api/v1/metrics/${id}/cycle-times?last=2`)).tickets)).toEqual(['TICK-2', 'TICK-3'])
  })

  it('every ticket-based endpoint uses the same N tickets', async () => {
    const id = await setup('first_last')
    expect(ids((await get(`/api/v1/metrics/${id}/lead-times?last=2`)).tickets)).toEqual(['TICK-2', 'TICK-3'])
    expect(ids((await get(`/api/v1/metrics/${id}/time-in-status?last=2`)).tickets)).toEqual(['TICK-2', 'TICK-3'])
    expect((await get(`/api/v1/metrics/${id}/rework?last=2`)).total_completed).toBe(2)
    const byType = await get(`/api/v1/metrics/${id}/cycle-time-by-type?last=2`)
    expect(byType.types.reduce((a: number, t: { count: number }) => a + t.count, 0)).toBe(2)
  })

  it('throughput keeps the oldest week when it is complete', async () => {
    // first_last: selected Jan15 + Jan22, cut ticket Jan10 is in an earlier week
    const id = await setup('first_last')
    const { weeks } = await get(`/api/v1/metrics/${id}/throughput?last=2`)
    expect(weeks).toEqual([{ week: '2024-01-15', count: 1 }, { week: '2024-01-22', count: 1 }])
  })

  it('throughput and forecast skip a partially selected first week', async () => {
    // first_first: selected Jan10 + Jan22, cut TICK-3 Jan8 shares the week of Jan8
    const id = await setup('first_first')
    const { weeks } = await get(`/api/v1/metrics/${id}/throughput?last=2`)
    expect(weeks).toEqual([{ week: '2024-01-22', count: 1 }])

    const f = await get(`/api/v1/metrics/${id}/forecast?mode=how_many&value=2&last=2`)
    expect(f.weeks_of_data).toBe(1)
    expect(f.total_completed).toBe(1)
  })

  it('cfd starts at the oldest completion of the N tickets', async () => {
    const id = await setup('first_last')
    const { data } = await get(`/api/v1/metrics/${id}/cfd?last=2`)
    expect(data.length).toBeGreaterThan(0)
    expect(data.every((p: { date: string }) => p.date >= '2024-01-15')).toBe(true)
  })

  it('rejects invalid values and the combination with from/to', async () => {
    const id = await setup()
    for (const q of ['last=0', 'last=-3', 'last=abc', 'last=2.5', 'last=2&from=2024-01-01', 'last=2&to=2024-02-01']) {
      const res = await app.request(`/api/v1/metrics/${id}/summary?${q}`)
      expect(res.status).toBe(400)
    }
    const res = await app.request(`/api/v1/metrics/${id}/forecast?mode=when&value=3&last=x`)
    expect(res.status).toBe(400)
  })
})
