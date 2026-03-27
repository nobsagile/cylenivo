import { describe, it, expect } from 'vitest'
import { firstTransitionTo, lastTransitionTo, trimTransitionsToCycleWindow, type Transition } from '../src/analyzers/utils.js'
import { buildHealthReport } from '../src/analyzers/healthReport.js'
import { calculateCycleTime } from '../src/analyzers/cycleTime.js'
import { calculateLeadTime } from '../src/analyzers/leadTime.js'
import { calculatePercentiles, calculateThroughputPerWeek } from '../src/analyzers/percentiles.js'
import { calculateTimeInStatus } from '../src/analyzers/timeInStatus.js'

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

  it('returns 1 for single date', () => {
    expect(calculateThroughputPerWeek([new Date()])).toBe(1)
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
