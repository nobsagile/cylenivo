import { firstTransitionTo, lastTransitionTo, type Transition } from './utils.js'

export type CycleTimeMode = 'first_last' | 'first_first' | 'last_last'

export function calculateCycleTime(
  transitions: Transition[],
  startStatus: string,
  endStatus: string,
  mode: CycleTimeMode = 'first_last',
): number | null {
  const startTs = mode === 'last_last'
    ? lastTransitionTo(transitions, startStatus)
    : firstTransitionTo(transitions, startStatus)

  const endTs = mode === 'first_first'
    ? firstTransitionTo(transitions, endStatus)
    : lastTransitionTo(transitions, endStatus)

  if (startTs === null || endTs === null) return null
  if (endTs < startTs) return null
  return (endTs.getTime() - startTs.getTime()) / (1000 * 86400)
}
