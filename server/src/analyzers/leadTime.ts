import { firstTransitionTo, lastTransitionTo, type Transition } from './utils.js'
import type { CycleTimeMode } from './cycleTime.js'

export function calculateLeadTime(
  ticketCreatedAt: Date,
  transitions: Transition[],
  endStatus: string,
  leadTimeStartStatus?: string | null,
  mode: CycleTimeMode = 'first_last',
): number | null {
  const endTs = mode === 'first_first'
    ? firstTransitionTo(transitions, endStatus)
    : lastTransitionTo(transitions, endStatus)

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
