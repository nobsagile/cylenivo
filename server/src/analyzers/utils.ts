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
