import type { RestartInfo } from './cycleWindow.js'

export interface RestartSummary {
  /** restarted and came back into the cycle */
  restarted: number
  /** restarted and never came back */
  abandoned: number
  /** total time of aborted attempts — unrounded */
  discarded_days: number
}

/**
 * Counts aborted attempts (#143). The date range applies to the restart event
 * itself (re-entry, or the abort for abandoned tickets) — abandoned tickets
 * have no completion date and would otherwise vanish under any date filter.
 */
export function aggregateRestarts(
  tickets: { restart: RestartInfo | null }[],
  from?: Date,
  to?: Date,
): RestartSummary {
  const result: RestartSummary = { restarted: 0, abandoned: 0, discarded_days: 0 }
  for (const { restart } of tickets) {
    if (!restart) continue
    const at = restart.restarted_at ?? restart.aborted_at
    if (from && at < from) continue
    if (to && at > to) continue
    if (restart.abandoned) result.abandoned++
    else result.restarted++
    result.discarded_days += restart.discarded_days
  }
  return result
}
