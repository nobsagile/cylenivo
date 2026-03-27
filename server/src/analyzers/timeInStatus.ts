import type { Transition } from './utils.js'

export function calculateTimeInStatus(
  transitions: Transition[],
  referenceStatuses: string[],
): Record<string, number> {
  const result: Record<string, number> = {}
  for (const s of referenceStatuses) result[s] = 0

  const sorted = [...transitions].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )

  for (let i = 0; i < sorted.length; i++) {
    const status = sorted[i].to_status
    if (!(status in result)) continue
    const enteredAt = new Date(sorted[i].transitioned_at)
    if (i + 1 >= sorted.length) continue  // terminal status — don't project forward
    const next = sorted[i + 1]
    // If the next status is untracked AND this status re-appears later, it's a detour
    // through untracked territory (e.g. Done→Released→Done bulk ops) — skip this period
    if (!(next.to_status in result) && sorted.slice(i + 1).some(tr => tr.to_status === status)) continue
    const leftAt = new Date(next.transitioned_at)
    result[status] += (leftAt.getTime() - enteredAt.getTime()) / (1000 * 86400)
  }

  return result
}
