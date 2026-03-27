import { describe, it, expect } from 'vitest'
import { firstTransitionTo, type Transition } from '../src/analyzers/utils.js'
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
})
