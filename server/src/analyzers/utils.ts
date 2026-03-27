export interface Transition {
  from_status: string | null
  to_status: string
  transitioned_at: string // ISO string
}

export function firstTransitionTo(transitions: Transition[], status: string): Date | null {
  const sorted = [...transitions].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )
  for (const t of sorted) {
    if (t.to_status === status) return new Date(t.transitioned_at)
  }
  return null
}

export function lastTransitionTo(transitions: Transition[], status: string): Date | null {
  const sorted = [...transitions].sort(
    (a, b) => new Date(b.transitioned_at).getTime() - new Date(a.transitioned_at).getTime()
  )
  for (const t of sorted) {
    if (t.to_status === status) return new Date(t.transitioned_at)
  }
  return null
}

/**
 * Trims transitions to the cycle window, respecting the measurement mode.
 * - first_last / first_first: window starts at first entry into cycleStart
 * - last_last: window starts at last entry into cycleStart
 * End boundary: last entry into cycleEnd (or first for first_first),
 * falling back to last known transition for incomplete tickets.
 * Returns [] if the ticket never entered cycleStart.
 */
export function trimTransitionsToCycleWindow(
  transitions: Transition[],
  cycleStart: string,
  cycleEnd: string,
  mode: 'first_last' | 'first_first' | 'last_last' = 'first_last',
): Transition[] {
  const sorted = [...transitions].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )
  const startEntries = sorted.filter(t => t.to_status === cycleStart)
  if (!startEntries.length) return []

  const startEntry = mode === 'last_last'
    ? startEntries[startEntries.length - 1]
    : startEntries[0]
  const windowStart = new Date(startEntry.transitioned_at).getTime()

  const endEntries = sorted.filter(t => t.to_status === cycleEnd)
  const endEntry = mode === 'first_first' && endEntries.length
    ? endEntries[0]
    : endEntries.length
      ? endEntries[endEntries.length - 1]
      : sorted[sorted.length - 1]
  const windowEnd = new Date(endEntry.transitioned_at).getTime()

  return sorted.filter(t => {
    const ts = new Date(t.transitioned_at).getTime()
    return ts >= windowStart && ts <= windowEnd
  })
}
