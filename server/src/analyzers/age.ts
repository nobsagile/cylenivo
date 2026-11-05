const MS_PER_DAY = 86400 * 1000

/**
 * Work item age: days since an unfinished ticket entered the cycle.
 * null when the ticket never started or is already completed.
 */
export function workItemAgeDays(cycleStartedAt: Date | null, completed: boolean, now: Date): number | null {
  if (!cycleStartedAt || completed) return null
  return Math.max(0, (now.getTime() - cycleStartedAt.getTime()) / MS_PER_DAY)
}
