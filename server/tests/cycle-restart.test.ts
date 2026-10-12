/**
 * Restart policy (#143): a ticket moved to a restart status (e.g. Backlog)
 * after it started is an aborted attempt. The clock restarts at the next entry
 * into any cycle status. A ticket that never comes back is abandoned.
 *
 * Shape of the transitions follows MHPLUS-212, where the restart re-enters the
 * cycle at Development, not at the start status. All times 12:00Z.
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'
import { loadImportContext } from '../src/lib/context.js'
import { computeAggregate } from '../src/lib/aggregate.js'
import { resolveCycleWindow, trimToCycleWindow } from '../src/analyzers/cycleWindow.js'
import { calculateCycleTime } from '../src/analyzers/cycleTime.js'
import type { Transition } from '../src/analyzers/utils.js'

const t = (from: string | null, to: string, day: string): Transition =>
  ({ from_status: from, to_status: to, transitioned_at: `2024-${day}T12:00:00Z` })

const CYCLE = ['Preparation', 'Development', 'Customer Feedback']
const OPTS = { cycleStatuses: CYCLE, restartStatuses: ['Backlog'] }

// Start Jan 10, abort Jan 15, back via Up Next, re-entry Feb 1 at Development, end Feb 11
const RESTARTED: Transition[] = [
  t(null, 'Up Next', '01-01'),
  t('Up Next', 'Preparation', '01-10'),
  t('Preparation', 'Backlog', '01-15'),
  t('Backlog', 'Up Next', '01-20'),
  t('Up Next', 'Development', '02-01'),
  t('Development', 'Customer Feedback', '02-11'),
]

const ABANDONED: Transition[] = [
  t(null, 'Up Next', '01-01'),
  t('Up Next', 'Preparation', '01-10'),
  t('Preparation', 'Development', '01-12'),
  t('Development', 'Customer Feedback', '01-14'),
  t('Customer Feedback', 'Backlog', '01-20'),
]

describe('resolveCycleWindow — restart', () => {
  it('without restart statuses: unchanged (Jan 10 → Feb 11 = 32d)', () => {
    expect(calculateCycleTime(RESTARTED, 'Preparation', 'Customer Feedback')).toBeCloseTo(32, 5)
    expect(resolveCycleWindow(RESTARTED, 'Preparation', 'Customer Feedback').restart).toBeNull()
  })

  it('restart: clock starts at re-entry into any cycle status (Feb 1 → Feb 11 = 10d)', () => {
    expect(calculateCycleTime(RESTARTED, 'Preparation', 'Customer Feedback', 'first_last', OPTS)).toBeCloseTo(10, 5)
  })

  it('restart info: count, restarted_at, discarded_days', () => {
    const w = resolveCycleWindow(RESTARTED, 'Preparation', 'Customer Feedback', 'first_last', OPTS)
    expect(w.restart).toEqual({
      count: 1,
      restarted_at: new Date('2024-02-01T12:00:00Z'),
      discarded_days: 22,
      abandoned: false,
    })
  })

  it('backlog before the first start is not a restart', () => {
    const transitions = [t(null, 'Backlog', '01-01'), t('Backlog', 'Preparation', '01-05'), t('Preparation', 'Customer Feedback', '01-08')]
    const w = resolveCycleWindow(transitions, 'Preparation', 'Customer Feedback', 'first_last', OPTS)
    expect(w.restart).toBeNull()
    expect(calculateCycleTime(transitions, 'Preparation', 'Customer Feedback', 'first_last', OPTS)).toBeCloseTo(3, 5)
  })

  it('abandoned: no cycle time and no end, even though the end was reached before', () => {
    const w = resolveCycleWindow(ABANDONED, 'Preparation', 'Customer Feedback', 'first_last', OPTS)
    expect(w.start).toBeNull()
    expect(w.end).toBeNull()
    expect(w.restart).toEqual({ count: 1, restarted_at: null, discarded_days: 10, abandoned: true })
  })

  it('first_first: end is the first end entry after the new start', () => {
    const transitions = [
      t(null, 'Preparation', '01-01'),
      t('Preparation', 'Customer Feedback', '01-03'),
      t('Customer Feedback', 'Backlog', '01-05'),
      t('Backlog', 'Development', '01-10'),
      t('Development', 'Customer Feedback', '01-12'),
      t('Customer Feedback', 'Development', '01-14'),
      t('Development', 'Customer Feedback', '01-20'),
    ]
    expect(calculateCycleTime(transitions, 'Preparation', 'Customer Feedback', 'first_first', OPTS)).toBeCloseTo(2, 5)
    expect(calculateCycleTime(transitions, 'Preparation', 'Customer Feedback', 'first_last', OPTS)).toBeCloseTo(10, 5)
  })

  it('last_last: a start after the re-entry wins, nothing discarded beyond it', () => {
    const transitions = [...RESTARTED.slice(0, 5), t('Development', 'Preparation', '02-05'), t('Preparation', 'Customer Feedback', '02-11')]
    const w = resolveCycleWindow(transitions, 'Preparation', 'Customer Feedback', 'last_last', OPTS)
    expect(w.start).toEqual(new Date('2024-02-05T12:00:00Z'))
    expect(w.restart!.discarded_days).toBe(0)
  })

  it('multiple restarts: the last one counts', () => {
    const transitions = [
      ...RESTARTED.slice(0, 5),
      t('Development', 'Backlog', '02-03'),
      t('Backlog', 'Preparation', '02-06'),
      t('Preparation', 'Customer Feedback', '02-11'),
    ]
    const w = resolveCycleWindow(transitions, 'Preparation', 'Customer Feedback', 'first_last', OPTS)
    expect(w.restart!.count).toBe(2)
    expect(w.start).toEqual(new Date('2024-02-06T12:00:00Z'))
  })

  it('trimToCycleWindow drops everything before the re-entry', () => {
    const windowed = trimToCycleWindow(RESTARTED, 'Preparation', 'Customer Feedback', 'first_last', OPTS)
    expect(windowed.map(x => x.to_status)).toEqual(['Development', 'Customer Feedback'])
  })
})

// ── Pipeline: config field → context → aggregate ──────────────────────────────

const FIXTURE = {
  source_type: 'jira',
  project_key: 'RST',
  exported_at: '2024-03-01T00:00:00Z',
  tickets: [
    { external_id: 'RST-1', title: 'restarted', transitions: RESTARTED },
    { external_id: 'RST-2', title: 'abandoned', transitions: ABANDONED },
  ].map(x => ({ ...x, ticket_type: 'story', created_at: '2024-01-01T12:00:00Z', external_link: null })),
}

const CONFIG = {
  name: 'Restart Test',
  source_type: 'jira',
  status_order: ['Up Next', 'Preparation', 'Development', 'Customer Feedback', 'Done'],
  cycle_time_start_status: 'Preparation',
  cycle_time_end_status: 'Customer Feedback',
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
    body: JSON.stringify({ ...CONFIG, ...overrides }),
  })
  const { data: cfg } = await res.json() as { data: { id: string; restart_statuses: string[] | null } }
  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
  form.append('config_id', cfg.id)
  const impRes = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const { data: imp } = await impRes.json() as { data: { id: string } }
  return { importId: imp.id, cfg }
}

describe('restart_statuses — pipeline', () => {
  it('config round-trips restart_statuses', async () => {
    const { cfg } = await setup({ restart_statuses: ['Backlog'] })
    expect(cfg.restart_statuses).toEqual(['Backlog'])
  })

  it('without restart_statuses: both tickets complete, old values', async () => {
    const { importId } = await setup()
    const ctx = (await loadImportContext(importId))!
    const byId = Object.fromEntries(ctx.tickets.map(x => [x.external_id, x]))
    expect(byId['RST-1'].cycle_time_days).toBeCloseTo(32, 5)
    expect(byId['RST-2'].completed).toBe(true)
    expect(byId['RST-1'].restart).toBeNull()
  })

  it('with restart_statuses: restarted ticket re-measured, abandoned ticket not completed', async () => {
    const { importId } = await setup({ restart_statuses: ['Backlog'] })
    const ctx = (await loadImportContext(importId))!
    const byId = Object.fromEntries(ctx.tickets.map(x => [x.external_id, x]))

    expect(byId['RST-1'].cycle_time_days).toBeCloseTo(10, 5)
    expect(byId['RST-1'].cycle_started_at).toEqual(new Date('2024-02-01T12:00:00Z'))
    expect(byId['RST-1'].restart!.discarded_days).toBeCloseTo(22, 5)

    expect(byId['RST-2'].completed).toBe(false)
    expect(byId['RST-2'].completed_at).toBeNull()
    expect(byId['RST-2'].cycle_time_days).toBeNull()
    expect(byId['RST-2'].restart!.abandoned).toBe(true)
  })

  it('time in status matches the restarted window', async () => {
    const { importId } = await setup({ restart_statuses: ['Backlog'] })
    const agg = computeAggregate((await loadImportContext(importId))!)
    expect(agg.cycleTimes).toHaveLength(1)
    // the aborted 5 days in Preparation must not show up
    expect(agg.timeInStatus['Preparation'].mean_days).toBe(0)
    expect(agg.timeInStatus['Development'].mean_days).toBe(10)
  })

  it('a restart status inside the cycle window is ignored', async () => {
    const { importId } = await setup({ restart_statuses: ['Development'] })
    const ctx = (await loadImportContext(importId))!
    expect(ctx.restart.restartStatuses).toEqual([])
    expect(ctx.tickets.find(x => x.external_id === 'RST-1')!.cycle_time_days).toBeCloseTo(32, 5)
  })
})
