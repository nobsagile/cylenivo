import { weekStart } from './monteCarlo.js'

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

export interface LastNSelection<T> {
  /** the selected tickets, in input order */
  tickets: T[]
  /** oldest completion among the selected tickets — the start of the covered period */
  from: Date | null
  /**
   * Start of the first fully selected week, when the oldest week was cut: a
   * completed ticket outside the selection falls into the same week. Weekly
   * charts and the forecast skip that week, it would understate throughput.
   * null = nothing was cut.
   */
  fullWeeksFrom: Date | null
}

/**
 * Selects the N most recently completed tickets (#144). Completed = has a cycle
 * time and a completion date, the same tickets that make up every chart.
 * Ties on completed_at break by external_id so the result is stable and has
 * exactly N tickets.
 */
export function selectLastN<T extends { external_id: string; completed_at: Date | null; cycle_time_days: number | null }>(
  tickets: T[],
  n: number,
): LastNSelection<T> {
  const ranked = tickets
    .filter(t => t.completed_at !== null && t.cycle_time_days !== null)
    .sort((a, b) =>
      b.completed_at!.getTime() - a.completed_at!.getTime() || b.external_id.localeCompare(a.external_id))

  const selected = ranked.slice(0, n)
  if (selected.length === 0) return { tickets: [], from: null, fullWeeksFrom: null }

  const oldest = selected[selected.length - 1].completed_at!
  const firstCut = ranked[n]
  const oldestWeek = weekStart(oldest)
  const fullWeeksFrom = firstCut && weekStart(firstCut.completed_at!) === oldestWeek
    ? new Date(oldestWeek + MS_PER_WEEK)
    : null

  const keep = new Set(selected)
  return { tickets: tickets.filter(t => keep.has(t)), from: oldest, fullWeeksFrom }
}
