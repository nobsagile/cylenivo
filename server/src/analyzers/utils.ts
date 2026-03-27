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
 * Trims transitions to the cycle window: from the first entry into cycleStart
 * to the last entry into cycleEnd (or the last known transition for incomplete tickets).
 * Returns [] if the ticket never entered cycleStart.
 */
export function trimTransitionsToCycleWindow(
  transitions: Transition[],
  cycleStart: string,
  cycleEnd: string,
): Transition[] {
  const sorted = [...transitions].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )
  const startIdx = sorted.findIndex(t => t.to_status === cycleStart)
  if (startIdx === -1) return []

  const windowStart = new Date(sorted[startIdx].transitioned_at).getTime()

  const endTransitions = sorted.filter(t => t.to_status === cycleEnd)
  const windowEnd = endTransitions.length > 0
    ? new Date(endTransitions[endTransitions.length - 1].transitioned_at).getTime()
    : new Date(sorted[sorted.length - 1].transitioned_at).getTime()

  return sorted.filter(t => {
    const ts = new Date(t.transitioned_at).getTime()
    return ts >= windowStart && ts <= windowEnd
  })
}
