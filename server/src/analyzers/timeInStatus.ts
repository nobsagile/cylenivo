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
    const leftAt = new Date(sorted[i + 1].transitioned_at)
    result[status] += (leftAt.getTime() - enteredAt.getTime()) / (1000 * 86400)
  }

  return result
}
