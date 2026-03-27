import { firstTransitionTo, type Transition } from './utils.js'

export function calculateLeadTime(
  ticketCreatedAt: Date,
  transitions: Transition[],
  endStatus: string,
  leadTimeStartStatus?: string | null,
): number | null {
  const endTs = firstTransitionTo(transitions, endStatus)
  if (endTs === null) return null

  let startTs: Date
  if (!leadTimeStartStatus) {
    startTs = ticketCreatedAt
  } else {
    const found = firstTransitionTo(transitions, leadTimeStartStatus)
    if (found === null) return null
    startTs = found
  }

  if (endTs <= startTs) return null
  return (endTs.getTime() - startTs.getTime()) / (1000 * 86400)
}
