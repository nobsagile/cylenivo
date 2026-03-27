import { firstTransitionTo, type Transition } from './utils.js'

export function calculateCycleTime(
  transitions: Transition[],
  startStatus: string,
  endStatus: string,
): number | null {
  const startTs = firstTransitionTo(transitions, startStatus)
  const endTs = firstTransitionTo(transitions, endStatus)
  if (startTs === null || endTs === null) return null
  if (endTs <= startTs) return null
  return (endTs.getTime() - startTs.getTime()) / (1000 * 86400)
}
