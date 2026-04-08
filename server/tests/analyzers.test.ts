import { describe, it, expect } from 'bun:test'
import { computeCFD } from '../src/analyzers/cfd.js'
import { computeWeeklyBuckets, simulateHowMany, simulateWhen, percentileFromSorted, buildHistogram } from '../src/analyzers/monteCarlo.js'
import { firstTransitionTo, lastTransitionTo, sortTransitions, trimTransitionsToCycleWindow, type Transition } from '../src/analyzers/utils.js'
import { buildHealthReport } from '../src/analyzers/healthReport.js'
import { calculateCycleTime } from '../src/analyzers/cycleTime.js'
import { calculateLeadTime } from '../src/analyzers/leadTime.js'
import { calculatePercentiles, calculateThroughputPerWeek } from '../src/analyzers/percentiles.js'
import { calculateTimeInStatus } from '../src/analyzers/timeInStatus.js'
import { detectRework, aggregateRework } from '../src/analyzers/rework.js'
import { inferStatusOrder } from '../src/analyzers/statusOrder.js'
import { calculateFlowEfficiency } from '../src/analyzers/flowEfficiency.js'

// ── Monte Carlo ───────────────────────────────────────────────────────────────
describe('computeWeeklyBuckets', () => {
  it('returns empty for no dates', () => {
    expect(computeWeeklyBuckets([])).toEqual([])
  })

  it('counts completions per week', () => {
    // Three tickets in the same week (Mon 2024-01-08), one the next (2024-01-15)
    const dates = [
      new Date('2024-01-08T12:00:00Z'),
      new Date('2024-01-10T12:00:00Z'),
      new Date('2024-01-11T12:00:00Z'),
      new Date('2024-01-15T12:00:00Z'),
    ]
    const buckets = computeWeeklyBuckets(dates)
    expect(buckets).toEqual([3, 1])
  })

  it('includes empty weeks between first and last', () => {
    const dates = [
      new Date('2024-01-08T12:00:00Z'), // week 1
      new Date('2024-01-22T12:00:00Z'), // week 3 (week 2 is empty)
    ]
    const buckets = computeWeeklyBuckets(dates)
    expect(buckets).toEqual([1, 0, 1])
  })

  it('single ticket returns single-element array', () => {
    const buckets = computeWeeklyBuckets([new Date('2024-01-08T12:00:00Z')])
    expect(buckets).toEqual([1])
  })
})

describe('simulateHowMany', () => {
  it('returns sorted array of length iterations', () => {
    const results = simulateHowMany([3, 5, 4], 4, 100)
    expect(results).toHaveLength(100)
    expect(results[0]).toBeLessThanOrEqual(results[99])
  })

  it('produces results in expected range for fixed buckets', () => {
    // buckets [5] always = 5 per week, so 2 weeks always = 10
    const results = simulateHowMany([5], 2, 100)
    expect(results.every(r => r === 10)).toBe(true)
  })
})

describe('simulateWhen', () => {
  it('returns sorted array of length iterations', () => {
    const results = simulateWhen([3, 5, 4], 10, 100)
    expect(results).toHaveLength(100)
    expect(results[0]).toBeLessThanOrEqual(results[99])
  })

  it('terminates within 52 weeks for degenerate input', () => {
    // buckets [0] means no progress — should be capped at 52
    const results = simulateWhen([0], 5, 10)
    expect(results.every(r => r === 52)).toBe(true)
  })
})

describe('percentileFromSorted', () => {
  it('returns correct value at p50', () => {
    const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(percentileFromSorted(sorted, 50)).toBe(6) // index 5
  })
})

describe('buildHistogram', () => {
  it('groups equal values into counts', () => {
    const sorted = [1, 1, 2, 3, 3, 3]
    const hist = buildHistogram(sorted)
    expect(hist).toEqual([
      { bucket: 1, count: 2 },
      { bucket: 2, count: 1 },
      { bucket: 3, count: 3 },
    ])
  })
})

function t(toStatus: string, at: string, fromStatus: string | null = null): Transition {
  return { from_status: fromStatus, to_status: toStatus, transitioned_at: at }
}

const sampleTransitions: Transition[] = [
  t('In Progress', '2024-01-10T08:00:00Z', 'To Do'),
  t('In Review', '2024-01-14T08:00:00Z', 'In Progress'),
  t('Done', '2024-01-17T08:00:00Z', 'In Review'),
]

describe('firstTransitionTo', () => {
  it('returns first matching transition datetime', () => {
    const result = firstTransitionTo(sampleTransitions, 'In Progress')
    expect(result?.toISOString()).toBe(new Date('2024-01-10T08:00:00Z').toISOString())
  })

  it('returns null for unknown status', () => {
    expect(firstTransitionTo(sampleTransitions, 'Unknown')).toBeNull()
  })

  it('returns null for empty transitions', () => {
    expect(firstTransitionTo([], 'Done')).toBeNull()
  })
})

describe('calculateCycleTime', () => {
  it('computes days between start and end status', () => {
    const result = calculateCycleTime(sampleTransitions, 'In Progress', 'Done')
    expect(result).toBeCloseTo(7, 0)
  })

  it('returns null when start status not reached', () => {
    expect(calculateCycleTime(sampleTransitions, 'Missing', 'Done')).toBeNull()
  })

  it('returns null when end status not reached', () => {
    expect(calculateCycleTime(sampleTransitions, 'In Progress', 'Missing')).toBeNull()
  })

  it('returns null when end is before start', () => {
    const reversed = [
      t('Done', '2024-01-10T08:00:00Z'),
      t('In Progress', '2024-01-17T08:00:00Z'),
    ]
    expect(calculateCycleTime(reversed, 'In Progress', 'Done')).toBeNull()
  })
})

describe('calculateLeadTime', () => {
  it('uses ticket created_at when no lead_time_start_status', () => {
    const createdAt = new Date('2024-01-05T08:00:00Z')
    const result = calculateLeadTime(createdAt, sampleTransitions, 'Done')
    expect(result).toBeCloseTo(12, 0)
  })

  it('uses lead_time_start_status when provided', () => {
    const createdAt = new Date('2024-01-01T08:00:00Z')
    const result = calculateLeadTime(createdAt, sampleTransitions, 'Done', 'In Progress')
    expect(result).toBeCloseTo(7, 0)
  })

  it('returns null when end status not reached', () => {
    const createdAt = new Date('2024-01-05T08:00:00Z')
    expect(calculateLeadTime(createdAt, sampleTransitions, 'Missing')).toBeNull()
  })

  it('returns null when lead_time_start_status not reached', () => {
    const createdAt = new Date('2024-01-05T08:00:00Z')
    expect(calculateLeadTime(createdAt, sampleTransitions, 'Done', 'Missing')).toBeNull()
  })
})

describe('calculatePercentiles', () => {
  it('returns percentile values for sufficient data', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const result = calculatePercentiles(values)
    expect(result.warning).toBeNull()
    expect(result.p50).not.toBeNull()
    expect(result.p95).not.toBeNull()
    expect(result.sample_size).toBe(12)
  })

  it('returns warning for insufficient data', () => {
    const result = calculatePercentiles([1, 2, 3])
    expect(result.warning).toContain('Insufficient data')
    expect(result.p50).toBeNull()
    expect(result.sample_size).toBe(3)
  })

  it('returns warning for empty input', () => {
    const result = calculatePercentiles([])
    expect(result.warning).toContain('Insufficient data')
    expect(result.sample_size).toBe(0)
  })
})

describe('calculateThroughputPerWeek', () => {
  it('computes throughput across multiple weeks', () => {
    const dates = [
      new Date('2024-01-01'),
      new Date('2024-01-08'),
      new Date('2024-01-15'),
      new Date('2024-01-22'),
    ]
    const result = calculateThroughputPerWeek(dates)
    expect(result).toBeGreaterThan(0)
  })

  it('returns null for single date (no span to calculate rate)', () => {
    expect(calculateThroughputPerWeek([new Date()])).toBeNull()
  })

  it('returns 0 for empty input', () => {
    expect(calculateThroughputPerWeek([])).toBe(0)
  })
})

// Ticket with rework: enters Preparation twice, Customer Feedback twice
// Day 0: → Preparation (start)
// Day 10: → Review
// Day 20: → Preparation (back to start, rework)
// Day 30: → Customer Feedback (end, first time)
// Day 35: → Development (rejected)
// Day 45: → Customer Feedback (end, last time — really done)
const reworkTransitions: Transition[] = [
  t('Preparation',        '2024-01-01T08:00:00Z'),
  t('Review',             '2024-01-11T08:00:00Z'),
  t('Preparation',        '2024-01-21T08:00:00Z'),
  t('Customer Feedback',  '2024-01-31T08:00:00Z'),
  t('Development',        '2024-02-05T08:00:00Z'),
  t('Customer Feedback',  '2024-02-15T08:00:00Z'),
]

describe('trimTransitionsToCycleWindow', () => {
  it('returns only transitions within cycle window for completed ticket', () => {
    // Backlog (Jan1), In Dev (Jan5), Done (Jan10) — cycle: In Dev → Done
    const transitions = [
      t('Backlog', '2024-01-01T08:00:00Z'),
      t('In Dev',  '2024-01-05T08:00:00Z'),
      t('Done',    '2024-01-10T08:00:00Z'),
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'In Dev', 'Done')
    expect(result.map(tr => tr.to_status)).toEqual(['In Dev', 'Done'])
  })

  it('returns [] when ticket never entered cycleStart', () => {
    const transitions = [
      t('Backlog', '2016-01-01T08:00:00Z'),
      t('Done',    '2016-01-05T08:00:00Z'),
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'In Dev', 'Done')
    expect(result).toHaveLength(0)
  })

  it('caps at last transition for incomplete ticket (no cycleEnd)', () => {
    const transitions = [
      t('Backlog', '2024-01-01T08:00:00Z'),
      t('In Dev',  '2024-01-05T08:00:00Z'),
      t('Review',  '2024-01-08T08:00:00Z'),
      // no Done
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'In Dev', 'Done')
    expect(result.map(tr => tr.to_status)).toEqual(['In Dev', 'Review'])
  })

  it('excludes pre-cycle history (old workflow transitions before cycleStart)', () => {
    // Old-style transitions from 2016, then modern workflow in 2024
    const transitions = [
      t('In Progress', '2016-09-15T08:00:00Z'),
      t('QA',          '2016-09-16T08:00:00Z'),
      t('Done',        '2016-09-17T08:00:00Z'),  // old Done — before cycleStart
      t('Released',    '2024-11-27T08:00:00Z'),
      t('In Dev',      '2024-12-01T08:00:00Z'),  // first cycleStart entry
      t('Done',        '2024-12-05T08:00:00Z'),
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'In Dev', 'Done')
    expect(result.map(tr => tr.to_status)).toEqual(['In Dev', 'Done'])
  })

  it('uses last cycleEnd for rework ticket', () => {
    // Dev → Done → Dev → Done: window = first Dev to last Done
    const transitions = [
      t('Backlog', '2024-01-01T08:00:00Z'),
      t('Dev',     '2024-01-03T08:00:00Z'),
      t('Done',    '2024-01-08T08:00:00Z'),
      t('Dev',     '2024-01-10T08:00:00Z'),
      t('Done',    '2024-01-15T08:00:00Z'),
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'Dev', 'Done')
    expect(result.map(tr => tr.to_status)).toEqual(['Dev', 'Done', 'Dev', 'Done'])
    expect(result).not.toEqual(expect.arrayContaining([expect.objectContaining({ to_status: 'Backlog' })]))
  })

  it('last_last mode: starts at last cycleStart entry', () => {
    const transitions = [
      t('Backlog', '2024-01-01T08:00:00Z'),
      t('Dev',     '2024-01-03T08:00:00Z'),  // first Dev — excluded in last_last
      t('Backlog', '2024-01-05T08:00:00Z'),
      t('Dev',     '2024-01-08T08:00:00Z'),  // last Dev — window starts here
      t('Done',    '2024-01-15T08:00:00Z'),
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'Dev', 'Done', 'last_last')
    expect(result.map(tr => tr.to_status)).toEqual(['Dev', 'Done'])
  })

  it('first_first mode: ends at first cycleEnd entry', () => {
    const transitions = [
      t('Dev',  '2024-01-03T08:00:00Z'),
      t('Done', '2024-01-08T08:00:00Z'),  // first Done — window ends here
      t('Dev',  '2024-01-10T08:00:00Z'),
      t('Done', '2024-01-15T08:00:00Z'),
    ]
    const result = trimTransitionsToCycleWindow(transitions, 'Dev', 'Done', 'first_first')
    expect(result.map(tr => tr.to_status)).toEqual(['Dev', 'Done'])
  })
})

describe('lastTransitionTo', () => {
  it('returns last matching transition', () => {
    const result = lastTransitionTo(reworkTransitions, 'Customer Feedback')
    expect(result?.toISOString()).toBe(new Date('2024-02-15T08:00:00Z').toISOString())
  })

  it('returns null for unknown status', () => {
    expect(lastTransitionTo(reworkTransitions, 'Unknown')).toBeNull()
  })
})

describe('calculateCycleTime — measurement modes', () => {
  // first_last: first Preparation (Jan 1) → last Customer Feedback (Feb 15) = 45 days
  it('first_last: from first start to last end (default)', () => {
    const result = calculateCycleTime(reworkTransitions, 'Preparation', 'Customer Feedback', 'first_last')
    expect(result).toBeCloseTo(45, 0)
  })

  // first_first: first Preparation (Jan 1) → first Customer Feedback (Jan 31) = 30 days
  it('first_first: from first start to first end', () => {
    const result = calculateCycleTime(reworkTransitions, 'Preparation', 'Customer Feedback', 'first_first')
    expect(result).toBeCloseTo(30, 0)
  })

  // last_last: last Preparation (Jan 21) → last Customer Feedback (Feb 15) = 25 days
  it('last_last: from last start to last end', () => {
    const result = calculateCycleTime(reworkTransitions, 'Preparation', 'Customer Feedback', 'last_last')
    expect(result).toBeCloseTo(25, 0)
  })

  it('returns null when end is before start (last_last)', () => {
    // last Preparation (Jan 21) is after last Customer Feedback if we had only one early CF
    const transitions: Transition[] = [
      t('Customer Feedback', '2024-01-10T08:00:00Z'),
      t('Preparation',       '2024-01-20T08:00:00Z'),
    ]
    expect(calculateCycleTime(transitions, 'Preparation', 'Customer Feedback', 'last_last')).toBeNull()
  })

  it('default mode is first_last', () => {
    const withDefault = calculateCycleTime(reworkTransitions, 'Preparation', 'Customer Feedback')
    const withExplicit = calculateCycleTime(reworkTransitions, 'Preparation', 'Customer Feedback', 'first_last')
    expect(withDefault).toBe(withExplicit)
  })
})

describe('calculateLeadTime — measurement modes', () => {
  const createdAt = new Date('2023-12-22T08:00:00Z') // 10 days before first Preparation

  // first_last: created (Dec 22) → last Customer Feedback (Feb 15) = 55 days
  it('first_last: created_at to last end', () => {
    const result = calculateLeadTime(createdAt, reworkTransitions, 'Customer Feedback', null, 'first_last')
    expect(result).toBeCloseTo(55, 0)
  })

  // first_first: created (Dec 22) → first Customer Feedback (Jan 31) = 40 days
  it('first_first: created_at to first end', () => {
    const result = calculateLeadTime(createdAt, reworkTransitions, 'Customer Feedback', null, 'first_first')
    expect(result).toBeCloseTo(40, 0)
  })

  // with lead_time_start_status: first Preparation (Jan 1) → last Customer Feedback (Feb 15) = 45 days
  it('first_last with lead_time_start_status: first start status to last end', () => {
    const result = calculateLeadTime(createdAt, reworkTransitions, 'Customer Feedback', 'Preparation', 'first_last')
    expect(result).toBeCloseTo(45, 0)
  })

  // last_last with lead_time_start_status: last Preparation (Jan 21) → last Customer Feedback (Feb 15) = 25 days
  it('last_last with lead_time_start_status: last start status to last end', () => {
    const result = calculateLeadTime(createdAt, reworkTransitions, 'Customer Feedback', 'Preparation', 'last_last')
    expect(result).toBeCloseTo(25, 0)
  })
})

describe('calculateTimeInStatus', () => {
  it('computes time in each tracked status', () => {
    const result = calculateTimeInStatus(sampleTransitions, ['In Progress', 'In Review'])
    expect(result['In Progress']).toBeCloseTo(4, 0)
    expect(result['In Review']).toBeCloseTo(3, 0)
  })

  it('ignores untracked statuses', () => {
    const result = calculateTimeInStatus(sampleTransitions, ['In Progress'])
    expect(Object.keys(result)).toEqual(['In Progress'])
  })

  it('returns zeros for empty transitions', () => {
    const result = calculateTimeInStatus([], ['In Progress', 'Done'])
    expect(result['In Progress']).toBe(0)
    expect(result['Done']).toBe(0)
  })

  it('terminal status (last transition) does not accumulate time to now', () => {
    // Done is the last status — should be 0, not (now - Jan17)
    const result = calculateTimeInStatus(sampleTransitions, ['In Progress', 'In Review', 'Done'])
    expect(result['Done']).toBe(0)
  })

  it('non-terminal Done accumulates only until next transition', () => {
    // Done → In Dev: 2 days in Done, then In Dev is terminal
    const transitions = [
      t('Done',       '2024-01-10T08:00:00Z'),
      t('In Dev',     '2024-01-12T08:00:00Z'),
    ]
    const result = calculateTimeInStatus(transitions, ['Done', 'In Dev'])
    expect(result['Done']).toBeCloseTo(2, 0)
    expect(result['In Dev']).toBe(0)  // terminal — no forward projection
  })

  it('transition through untracked status does not accumulate time (bulk-update noise)', () => {
    // Done (2016) → Released (untracked, 2024) → Done (2025)
    // The 8-year Done period should be ignored because next status is untracked
    const transitions = [
      t('Done',     '2016-09-16T08:00:00Z'),
      t('Released', '2024-11-27T08:00:00Z'),  // untracked
      t('Done',     '2025-10-13T08:00:00Z'),
    ]
    const result = calculateTimeInStatus(transitions, ['Done'])
    expect(result['Done']).toBe(0)  // both Done periods ignored (untracked next / terminal)
  })

  it('rework through tracked statuses still accumulates correctly', () => {
    // Dev → Done → Dev → Done: both Dev periods counted, both Done periods 0 (terminal or untracked next)
    const transitions = [
      t('Dev',  '2024-01-01T08:00:00Z'),
      t('Done', '2024-01-06T08:00:00Z'),  // Done → Dev next (tracked) → counts
      t('Dev',  '2024-01-08T08:00:00Z'),  // Dev → Done next (tracked) → counts
      t('Done', '2024-01-11T08:00:00Z'),  // terminal → 0
    ]
    const result = calculateTimeInStatus(transitions, ['Dev', 'Done'])
    expect(result['Dev']).toBeCloseTo(8, 0)   // 5d (Jan1→Jan6) + 3d (Jan8→Jan11)
    expect(result['Done']).toBeCloseTo(2, 0)  // Done → Dev: 2 days (Jan6→Jan8)
  })
})

describe('calculateTimeInStatus — real ticket verification (TN-16322, last_last)', () => {
  // TN-16322: clean single-pass ticket, verified against Jira history
  // last_last window: last Preparation (Dec 18 11:03:51) → last CF (Jan 8 10:31:01)
  // Expected: Preparation 0.07d, RFD 10.93d, Development 9.97d, all others 0
  const statuses = ['Backlog', 'Up Next', 'Preparation', 'Ready For Development', 'Development', 'Customer Feedback', 'Ready for Release', 'Done']
  const tn16322 = [
    t('Up Next',                '2025-12-15T12:20:52Z'),
    t('Preparation',            '2025-12-18T11:03:51Z'),
    t('Ready For Development',  '2025-12-18T12:43:15Z'),
    t('Development',            '2025-12-29T11:07:13Z'),
    t('Customer Feedback',      '2026-01-08T10:31:01Z'),
    t('Ready for Release',      '2026-01-12T15:13:42Z'),
    t('Done',                   '2026-01-20T17:01:11Z'),
  ]

  it('trimmed window contains exactly Preparation → CF', () => {
    const windowed = trimTransitionsToCycleWindow(tn16322, 'Preparation', 'Customer Feedback', 'last_last')
    expect(windowed.map(tr => tr.to_status)).toEqual(['Preparation', 'Ready For Development', 'Development', 'Customer Feedback'])
  })

  it('time in status matches manual calculation', () => {
    const windowed = trimTransitionsToCycleWindow(tn16322, 'Preparation', 'Customer Feedback', 'last_last')
    const result = calculateTimeInStatus(windowed, statuses)
    expect(result['Backlog']).toBe(0)
    expect(result['Up Next']).toBe(0)
    expect(result['Preparation']).toBeCloseTo(0.07, 1)
    expect(result['Ready For Development']).toBeCloseTo(10.93, 1)
    expect(result['Development']).toBeCloseTo(9.97, 1)
    expect(result['Customer Feedback']).toBe(0)  // terminal in window
    // sum ≈ cycle time (20.98d)
    const sum = result['Preparation'] + result['Ready For Development'] + result['Development']
    expect(sum).toBeCloseTo(20.97, 1)
  })
})

describe('buildHealthReport', () => {
  const statusOrder = ['Backlog', 'In Dev', 'Review', 'Done']

  it('counts tickets that never entered cycle start', () => {
    const tickets = [
      { transitions: [t('Backlog', '2024-01-01'), t('Done', '2024-01-05')] },  // no In Dev
      { transitions: [t('In Dev', '2024-01-01'), t('Done', '2024-01-05')] },   // has In Dev
    ]
    const report = buildHealthReport(tickets, statusOrder, 'In Dev', 'Done')
    expect(report.tickets_without_cycle_start).toBe(1)
  })

  it('counts tickets that entered cycle start but never reached cycle end', () => {
    const tickets = [
      { transitions: [t('In Dev', '2024-01-01'), t('Review', '2024-01-04')] },  // no Done
      { transitions: [t('In Dev', '2024-01-01'), t('Done', '2024-01-05')] },    // has Done
    ]
    const report = buildHealthReport(tickets, statusOrder, 'In Dev', 'Done')
    expect(report.tickets_incomplete).toBe(1)
  })

  it('detects statuses not in status_order', () => {
    const tickets = [
      { transitions: [t('In Dev', '2024-01-01'), t('QA', '2024-01-03'), t('Done', '2024-01-05')] },
      { transitions: [t('In Dev', '2024-01-01'), t('Released', '2024-01-06'), t('Done', '2024-01-07')] },
    ]
    const report = buildHealthReport(tickets, statusOrder, 'In Dev', 'Done')
    expect(report.unknown_statuses).toContain('QA')
    expect(report.unknown_statuses).toContain('Released')
    expect(report.unknown_statuses).not.toContain('Done')
  })

  it('reports oldest transition date', () => {
    const tickets = [
      { transitions: [t('In Dev', '2024-03-01'), t('Done', '2024-03-05')] },
      { transitions: [t('In Dev', '2016-09-15'), t('Done', '2016-09-17')] },
    ]
    const report = buildHealthReport(tickets, statusOrder, 'In Dev', 'Done')
    expect(report.oldest_transition_date).toContain('2016')
  })

  it('returns clean report for perfect data', () => {
    const tickets = [
      { transitions: [t('In Dev', '2024-01-01'), t('Review', '2024-01-03'), t('Done', '2024-01-05')] },
    ]
    const report = buildHealthReport(tickets, statusOrder, 'In Dev', 'Done')
    expect(report.tickets_without_cycle_start).toBe(0)
    expect(report.tickets_incomplete).toBe(0)
    expect(report.unknown_statuses).toHaveLength(0)
  })
})

// ─── rework detection ────────────────────────────────────────────────

describe('detectRework', () => {
  const statusOrder = ['To Do', 'In Progress', 'In Review', 'Done']

  it('detects backward movement', () => {
    const transitions = [
      t('In Progress', '2024-01-01T12:00:00Z', 'To Do'),
      t('In Review', '2024-01-02T12:00:00Z', 'In Progress'),
      t('In Progress', '2024-01-03T12:00:00Z', 'In Review'),
      t('Done', '2024-01-04T12:00:00Z', 'In Progress'),
    ]
    const result = detectRework(transitions, statusOrder)
    expect(result.has_rework).toBe(true)
    expect(result.backward_moves).toHaveLength(1)
    expect(result.backward_moves[0]).toEqual({ from_status: 'In Review', to_status: 'In Progress' })
  })

  it('returns no rework for clean flow', () => {
    const transitions = [
      t('In Progress', '2024-01-01T12:00:00Z', 'To Do'),
      t('In Review', '2024-01-02T12:00:00Z', 'In Progress'),
      t('Done', '2024-01-03T12:00:00Z', 'In Review'),
    ]
    const result = detectRework(transitions, statusOrder)
    expect(result.has_rework).toBe(false)
    expect(result.backward_moves).toHaveLength(0)
  })

  it('detects multiple backward moves', () => {
    const transitions = [
      t('In Progress', '2024-01-01T12:00:00Z', 'To Do'),
      t('In Review', '2024-01-02T12:00:00Z', 'In Progress'),
      t('In Progress', '2024-01-03T12:00:00Z', 'In Review'),
      t('In Review', '2024-01-04T12:00:00Z', 'In Progress'),
      t('In Progress', '2024-01-05T12:00:00Z', 'In Review'),
      t('Done', '2024-01-06T12:00:00Z', 'In Progress'),
    ]
    const result = detectRework(transitions, statusOrder)
    expect(result.has_rework).toBe(true)
    expect(result.backward_moves).toHaveLength(2)
  })

  it('ignores transitions with unknown statuses', () => {
    const transitions = [
      t('In Progress', '2024-01-01T12:00:00Z', 'Unknown'),
      t('Done', '2024-01-02T12:00:00Z', 'In Progress'),
    ]
    const result = detectRework(transitions, statusOrder)
    expect(result.has_rework).toBe(false)
  })
})

describe('aggregateRework', () => {
  const statusOrder = ['To Do', 'In Progress', 'In Review', 'Done']

  it('aggregates rework across tickets', () => {
    const tickets = [
      {
        cycle_time_days: 10,
        transitions: [
          t('In Progress', '2024-01-01T12:00:00Z', 'To Do'),
          t('In Review', '2024-01-02T12:00:00Z', 'In Progress'),
          t('In Progress', '2024-01-03T12:00:00Z', 'In Review'),
          t('Done', '2024-01-04T12:00:00Z', 'In Progress'),
        ],
      },
      {
        cycle_time_days: 5,
        transitions: [
          t('In Progress', '2024-01-01T12:00:00Z', 'To Do'),
          t('Done', '2024-01-02T12:00:00Z', 'In Progress'),
        ],
      },
    ]
    const result = aggregateRework(tickets, statusOrder)
    expect(result.tickets_with_rework).toBe(1)
    expect(result.total_completed).toBe(2)
    expect(result.rework_paths).toHaveLength(1)
    expect(result.rework_paths[0]).toEqual({ from: 'In Review', to: 'In Progress', count: 1 })
    expect(result.avg_cycle_with_rework).toBe(10)
    expect(result.avg_cycle_without_rework).toBe(5)
  })

  it('handles no completed tickets', () => {
    const result = aggregateRework([{ cycle_time_days: null, transitions: [] }], statusOrder)
    expect(result.total_completed).toBe(0)
    expect(result.tickets_with_rework).toBe(0)
  })
})

// ─── edge cases: special chars in status names ────────────────────────────────

describe('detectRework: status names with special characters', () => {
  it('detects rework when status names contain parentheses', () => {
    const order = ['Backlog', 'In Progress', 'In Review (blocked)', 'Done']
    const transitions = [
      t('In Progress', '2024-01-01T12:00:00Z', 'Backlog'),
      t('In Review (blocked)', '2024-01-02T12:00:00Z', 'In Progress'),
      t('In Progress', '2024-01-03T12:00:00Z', 'In Review (blocked)'),
      t('Done', '2024-01-05T12:00:00Z', 'In Progress'),
    ]
    const result = detectRework(transitions, order)
    expect(result.has_rework).toBe(true)
    expect(result.backward_moves[0]).toEqual({ from_status: 'In Review (blocked)', to_status: 'In Progress' })
  })

  it('correctly round-trips status names with special chars through aggregateRework path key', () => {
    const order = ['To Do', 'In Progress', 'In Review (blocked)', 'Done']
    const ticket = {
      cycle_time_days: 5,
      transitions: [
        t('In Progress', '2024-01-01T12:00:00Z', 'To Do'),
        t('In Review (blocked)', '2024-01-02T12:00:00Z', 'In Progress'),
        t('In Progress', '2024-01-03T12:00:00Z', 'In Review (blocked)'),
        t('Done', '2024-01-04T12:00:00Z', 'In Progress'),
      ],
    }
    const result = aggregateRework([ticket], order)
    expect(result.rework_paths).toHaveLength(1)
    expect(result.rework_paths[0].from).toBe('In Review (blocked)')
    expect(result.rework_paths[0].to).toBe('In Progress')
  })

  it('handles status names with arrows and symbols', () => {
    const order = ['Backlog', 'Dev -> Review', 'Done']
    const transitions = [
      t('Dev -> Review', '2024-01-01T12:00:00Z', 'Backlog'),
      t('Backlog', '2024-01-02T12:00:00Z', 'Dev -> Review'),
      t('Done', '2024-01-03T12:00:00Z', 'Backlog'),
    ]
    const result = detectRework(transitions, order)
    expect(result.has_rework).toBe(true)
    expect(result.backward_moves[0].from_status).toBe('Dev -> Review')
  })
})

// ─── edge cases: equal timestamps ────────────────────────────────────────────

describe('sortTransitions: equal timestamps are deterministic', () => {
  it('sorts by to_status as secondary key when timestamps are equal', () => {
    const sameTs = '2024-01-01T12:00:00Z'
    const transitions = [
      t('In Review', sameTs, 'In Progress'),
      t('In Progress', sameTs, 'Backlog'),
    ]
    const sorted = sortTransitions(transitions)
    expect(sorted[0].to_status).toBe('In Progress')
    expect(sorted[1].to_status).toBe('In Review')
  })

  it('produces identical sort order when called twice (determinism)', () => {
    const sameTs = '2024-06-15T08:00:00Z'
    const transitions = [
      t('Done', sameTs, 'In Review'),
      t('In Review', sameTs, 'In Progress'),
      t('In Progress', sameTs, 'Backlog'),
    ]
    const r1 = sortTransitions(transitions)
    const r2 = sortTransitions(transitions)
    expect(r1.map(x => x.to_status)).toEqual(r2.map(x => x.to_status))
  })

  it('calculateCycleTime returns 0 (not NaN or null) when start and end share a timestamp', () => {
    // endTs === startTs → cycle time of 0, not null (ticket resolved instantly)
    const ts = '2024-01-10T09:00:00Z'
    const transitions = [
      t('In Progress', ts, 'Backlog'),
      t('Done', ts, 'In Progress'),
    ]
    const result = calculateCycleTime(transitions, 'In Progress', 'Done', 'first_last')
    expect(result).toBe(0)
  })
})

// ─── edge cases: Monte Carlo with minimal throughput ─────────────────────────

describe('Monte Carlo: degenerate throughput inputs', () => {
  it('simulateWhen with all-zero buckets caps at 52 weeks', () => {
    const results = simulateWhen([0, 0, 0], 10, 50)
    expect(results.every(r => r === 52)).toBe(true)
  })

  it('simulateWhen with single non-zero bucket runs without crash', () => {
    const results = simulateWhen([0, 0, 1], 5, 100)
    expect(results).toHaveLength(100)
    expect(results.every(r => Number.isFinite(r))).toBe(true)
    expect(results.every(r => r <= 52)).toBe(true)
  })

  it('simulateHowMany with all-zero buckets returns all zeros', () => {
    const results = simulateHowMany([0, 0, 0], 4, 50)
    expect(results.every(r => r === 0)).toBe(true)
  })

  it('simulateHowMany with sparse throughput [0,0,1] returns non-negative integers', () => {
    const results = simulateHowMany([0, 0, 1], 4, 200)
    expect(results.every(r => r >= 0 && Number.isInteger(r))).toBe(true)
  })

  it('computeWeeklyBuckets with single date returns [1]', () => {
    const buckets = computeWeeklyBuckets([new Date('2024-06-01T00:00:00Z')])
    expect(buckets).toEqual([1])
  })
})

// ── CFD ───────────────────────────────────────────────────────────────────────
describe('computeCFD', () => {
  const base = { id: '', external_id: '', title: '', ticket_type: 'story' as const, created_at: '', external_link: null, cycle_time_days: null, lead_time_days: null, completed_at: null }

  it('includes tickets with no transitions via current_status', () => {
    const tickets = [
      { ...base, created_at: '2024-01-01T12:00:00Z', current_status: 'Todo', transitions: [] },
      { ...base, created_at: '2024-01-02T12:00:00Z', current_status: 'Done', transitions: [
        { from_status: 'Todo', to_status: 'Done', transitioned_at: '2024-01-03T12:00:00Z' },
      ]},
    ]
    const result = computeCFD(tickets as any, ['Todo', 'Done'])
    expect(result.statuses).toContain('Todo')
    // On 2024-01-01, the no-transition ticket should appear in Todo
    const day1 = result.data.find(d => d.date === '2024-01-01')
    expect(day1?.['Todo']).toBe(1)
  })

  it('returns empty for tickets with no transitions and no current_status', () => {
    const tickets = [{ ...base, created_at: '2024-01-01T12:00:00Z', current_status: null, transitions: [] }]
    const result = computeCFD(tickets as any, ['Todo'])
    expect(result.data).toEqual([])
  })
})

// ── inferStatusOrder ──────────────────────────────────────────────────────────
describe('inferStatusOrder', () => {
  function t(from: string | null, to: string, at: string): Transition {
    return { from_status: from, to_status: to, transitioned_at: at }
  }

  it('returns empty array for empty input', () => {
    expect(inferStatusOrder([])).toEqual([])
  })

  it('skips tickets with zero transitions', () => {
    expect(inferStatusOrder([{ transitions: [] }])).toEqual([])
  })

  it('orders statuses by median first-occurrence position', () => {
    const ticket = {
      transitions: [
        t('Backlog', 'In Progress', '2024-01-01T10:00:00Z'),
        t('In Progress', 'Review', '2024-01-02T10:00:00Z'),
        t('Review', 'Done', '2024-01-03T10:00:00Z'),
      ],
    }
    expect(inferStatusOrder([ticket])).toEqual(['Backlog', 'In Progress', 'Review', 'Done'])
  })

  it('handles multiple tickets agreeing on same order', () => {
    const make = () => ({
      transitions: [
        t('Backlog', 'In Progress', '2024-01-01T10:00:00Z'),
        t('In Progress', 'Done', '2024-01-02T10:00:00Z'),
      ],
    })
    expect(inferStatusOrder([make(), make(), make()])).toEqual(['Backlog', 'In Progress', 'Done'])
  })

  it('handles rework — only first occurrence counts', () => {
    const ticket = {
      transitions: [
        t('Backlog', 'In Progress', '2024-01-01T10:00:00Z'),
        t('In Progress', 'Review', '2024-01-02T10:00:00Z'),
        t('Review', 'Done', '2024-01-03T10:00:00Z'),
        t('Done', 'In Progress', '2024-01-04T10:00:00Z'), // rework
        t('In Progress', 'Done', '2024-01-05T10:00:00Z'), // second Done occurrence
      ],
    }
    // In Progress and Done must not swap — first occurrences are [Backlog, In Progress, Review, Done]
    expect(inferStatusOrder([ticket])).toEqual(['Backlog', 'In Progress', 'Review', 'Done'])
  })

  it('infers position of a status skipped by some tickets', () => {
    // T1: Backlog → Done (skips In Progress)
    // T2: Backlog → In Progress → Done
    // In Progress should land between Backlog and Done
    const t1 = {
      transitions: [
        t('Backlog', 'Done', '2024-01-01T10:00:00Z'),
      ],
    }
    const t2 = {
      transitions: [
        t('Backlog', 'In Progress', '2024-01-01T10:00:00Z'),
        t('In Progress', 'Done', '2024-01-02T10:00:00Z'),
      ],
    }
    const result = inferStatusOrder([t1, t2])
    const backlogIdx = result.indexOf('Backlog')
    const inProgressIdx = result.indexOf('In Progress')
    const doneIdx = result.indexOf('Done')
    expect(backlogIdx).toBeLessThan(inProgressIdx)
    expect(inProgressIdx).toBeLessThan(doneIdx)
  })

  it('includes from_status of first transition as initial status', () => {
    const ticket = {
      transitions: [
        t('Backlog', 'In Progress', '2024-01-01T10:00:00Z'),
        t('In Progress', 'Done', '2024-01-02T10:00:00Z'),
      ],
    }
    const result = inferStatusOrder([ticket])
    expect(result[0]).toBe('Backlog')
  })

  it('handles null from_status on first transition', () => {
    const ticket = {
      transitions: [
        t(null, 'In Progress', '2024-01-01T10:00:00Z'),
        t('In Progress', 'Done', '2024-01-02T10:00:00Z'),
      ],
    }
    const result = inferStatusOrder([ticket])
    expect(result).toEqual(['In Progress', 'Done'])
  })

  it('breaks ties alphabetically', () => {
    // Single ticket with just one status → position 0.5
    const t1 = { transitions: [t(null, 'Zebra', '2024-01-01T10:00:00Z')] }
    const t2 = { transitions: [t(null, 'Alpha', '2024-01-01T10:00:00Z')] }
    const result = inferStatusOrder([t1, t2])
    expect(result).toEqual(['Alpha', 'Zebra'])
  })
})

// ── calculateFlowEfficiency ───────────────────────────────────────────────────
describe('calculateFlowEfficiency', () => {
  function tr(from: string | null, to: string, at: string): Transition {
    return { from_status: from, to_status: to, transitioned_at: at }
  }

  it('returns null for empty active statuses', () => {
    const transitions = [
      tr(null, 'In Progress', '2024-01-01T00:00:00Z'),
      tr('In Progress', 'Done', '2024-01-03T00:00:00Z'),
    ]
    expect(calculateFlowEfficiency(transitions, [], 'In Progress', 'Done', 'first_last', 2)).toBeNull()
  })

  it('returns null for zero cycle days', () => {
    const transitions = [tr(null, 'Done', '2024-01-01T00:00:00Z')]
    expect(calculateFlowEfficiency(transitions, ['Done'], 'Done', 'Done', 'first_last', 0)).toBeNull()
  })

  it('returns 100% when all cycle time is in active status', () => {
    // 2 days total, 2 days in In Progress (the only status in window)
    const transitions = [
      tr(null, 'In Progress', '2024-01-01T00:00:00Z'),
      tr('In Progress', 'Done', '2024-01-03T00:00:00Z'),
    ]
    // cycle: In Progress → Done, 2 days. Active = [In Progress] = 2 days. Efficiency = 100%
    const result = calculateFlowEfficiency(transitions, ['In Progress'], 'In Progress', 'Done', 'first_last', 2)
    expect(result).toBeCloseTo(100, 0)
  })

  it('calculates partial efficiency correctly', () => {
    // 4-day cycle: 1 day In Progress, 1 day In Review, 2 days in Review Queue (not active)
    const transitions = [
      tr(null, 'In Progress', '2024-01-01T00:00:00Z'),
      tr('In Progress', 'Review Queue', '2024-01-02T00:00:00Z'),  // 1 day active
      tr('Review Queue', 'In Review', '2024-01-04T00:00:00Z'),    // 2 days waiting
      tr('In Review', 'Done', '2024-01-05T00:00:00Z'),            // 1 day active
    ]
    // cycle: In Progress → Done, 4 days
    // active: In Progress (1d) + In Review (1d) = 2d
    // efficiency = 2/4 = 50%
    const result = calculateFlowEfficiency(
      transitions,
      ['In Progress', 'In Review'],
      'In Progress', 'Done', 'first_last', 4
    )
    expect(result).toBeCloseTo(50, 0)
  })

  it('caps at 100% to handle floating point edge cases', () => {
    const transitions = [
      tr(null, 'In Progress', '2024-01-01T00:00:00Z'),
      tr('In Progress', 'Done', '2024-01-02T00:00:00Z'),
    ]
    // cycleDays slightly less than actual due to rounding — should not exceed 100
    const result = calculateFlowEfficiency(transitions, ['In Progress'], 'In Progress', 'Done', 'first_last', 0.99)
    expect(result).toBeLessThanOrEqual(100)
  })

  it('returns null when ticket never entered cycle start', () => {
    const transitions = [tr(null, 'Done', '2024-01-01T00:00:00Z')]
    const result = calculateFlowEfficiency(transitions, ['In Progress'], 'In Progress', 'Done', 'first_last', 1)
    expect(result).toBeNull()
  })
})

describe('calculateCycleTime — invalid timestamps', () => {
  it('returns null (not NaN) when transitioned_at is invalid', () => {
    const transitions = [
      { from_status: null, to_status: 'In Progress', transitioned_at: 'not-a-date' },
      { from_status: 'In Progress', to_status: 'Done', transitioned_at: 'also-invalid' },
    ]
    const result = calculateCycleTime(transitions, 'In Progress', 'Done')
    expect(result).toBeNull()
  })
})

describe('calculateLeadTime — invalid timestamps', () => {
  it('returns null (not NaN) when transitioned_at is invalid', () => {
    const createdAt = new Date('2024-01-01T00:00:00Z')
    const transitions = [
      { from_status: null, to_status: 'Done', transitioned_at: 'not-a-date' },
    ]
    const result = calculateLeadTime(createdAt, transitions, 'Done')
    expect(result).toBeNull()
  })

  it('returns null (not NaN) when ticketCreatedAt is invalid', () => {
    const createdAt = new Date('invalid')
    const transitions = [
      { from_status: null, to_status: 'Done', transitioned_at: '2024-01-05T00:00:00Z' },
    ]
    const result = calculateLeadTime(createdAt, transitions, 'Done')
    expect(result).toBeNull()
  })
})
