const ITERATIONS = 10_000

/** Returns the Monday (UTC midnight) of the ISO week containing `d`. */
function weekStart(d: Date): number {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  const day = date.getUTCDay() || 7 // Mon=1 … Sun=7
  date.setUTCDate(date.getUTCDate() - day + 1)
  return date.getTime()
}

/**
 * Groups completion dates into weekly buckets (ISO week).
 * Includes empty weeks (0 completions) between first and last completion.
 */
export function computeWeeklyBuckets(completedAtDates: Date[]): number[] {
  if (completedAtDates.length === 0) return []

  const timestamps = completedAtDates.map(weekStart)
  const minWeek = Math.min(...timestamps)
  const maxWeek = Math.max(...timestamps)

  // Build map of week → count
  const counts = new Map<number, number>()
  for (const ts of timestamps) {
    counts.set(ts, (counts.get(ts) ?? 0) + 1)
  }

  // Fill in all weeks including empty ones
  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
  const buckets: number[] = []
  for (let w = minWeek; w <= maxWeek; w += MS_PER_WEEK) {
    buckets.push(counts.get(w) ?? 0)
  }
  return buckets
}

function sample(buckets: number[]): number {
  return buckets[Math.floor(Math.random() * buckets.length)]
}

/**
 * Simulates: how many tickets completed in targetWeeks?
 * Returns sorted array of simulation results.
 */
export function simulateHowMany(buckets: number[], targetWeeks: number, iterations = ITERATIONS): number[] {
  const results: number[] = []
  for (let i = 0; i < iterations; i++) {
    let total = 0
    for (let w = 0; w < targetWeeks; w++) total += sample(buckets)
    results.push(total)
  }
  return results.sort((a, b) => a - b)
}

/**
 * Simulates: how many weeks to complete targetTickets?
 * Returns sorted array of simulation results (in weeks).
 * Capped at 52 weeks per run to prevent infinite loops with 0-throughput data.
 */
export function simulateWhen(buckets: number[], targetTickets: number, iterations = ITERATIONS): number[] {
  const results: number[] = []
  const maxWeeks = 52
  for (let i = 0; i < iterations; i++) {
    let total = 0
    let weeks = 0
    while (total < targetTickets && weeks < maxWeeks) {
      total += sample(buckets)
      weeks++
    }
    results.push(weeks)
  }
  return results.sort((a, b) => a - b)
}

/** Returns value at given percentile from a sorted array (NIST nearest-rank). */
export function percentileFromSorted(sorted: number[], p: number): number {
  const idx = Math.ceil((sorted.length * p) / 100) - 1
  return sorted[Math.min(Math.max(0, idx), sorted.length - 1)]
}

export interface WeeklyThroughput {
  week: string // Monday of that ISO week, YYYY-MM-DD
  count: number
}

/**
 * Returns completed ticket count per calendar week (Mon–Sun), including empty weeks.
 */
export function computeWeeklyThroughput(completedAtDates: Date[]): WeeklyThroughput[] {
  if (completedAtDates.length === 0) return []

  const timestamps = completedAtDates.map(weekStart)
  const minWeek = Math.min(...timestamps)
  const maxWeek = Math.max(...timestamps)

  const counts = new Map<number, number>()
  for (const ts of timestamps) counts.set(ts, (counts.get(ts) ?? 0) + 1)

  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
  const result: WeeklyThroughput[] = []
  for (let w = minWeek; w <= maxWeek; w += MS_PER_WEEK) {
    result.push({ week: new Date(w).toISOString().slice(0, 10), count: counts.get(w) ?? 0 })
  }
  return result
}

/** Builds histogram buckets from sorted simulation results. */
export function buildHistogram(sorted: number[]): { bucket: number; count: number }[] {
  const counts = new Map<number, number>()
  for (const v of sorted) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts.entries()]
    .map(([bucket, count]) => ({ bucket, count }))
    .sort((a, b) => a.bucket - b.bucket)
}
