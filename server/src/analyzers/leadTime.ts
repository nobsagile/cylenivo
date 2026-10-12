import { firstTransitionTo, lastTransitionTo, type Transition } from './utils.js'
import type { CycleTimeMode } from './cycleTime.js'

export interface LeadWindow {
  start: Date
  end: Date
}

/** Start and end of a ticket's lead time window; null if incomplete or inverted. */
export function resolveLeadWindow(
  ticketCreatedAt: Date,
  transitions: Transition[],
  endStatus: string,
  leadTimeStartStatus?: string | null,
  mode: CycleTimeMode = 'first_last',
): LeadWindow | null {
  const endTs = mode === 'first_first'
    ? firstTransitionTo(transitions, endStatus)
    : lastTransitionTo(transitions, endStatus)

  if (endTs === null) return null

  let startTs: Date
  if (!leadTimeStartStatus) {
    if (isNaN(ticketCreatedAt.getTime())) return null
    startTs = ticketCreatedAt
  } else {
    const found = mode === 'last_last'
      ? lastTransitionTo(transitions, leadTimeStartStatus)
      : firstTransitionTo(transitions, leadTimeStartStatus)
    if (found === null) return null
    startTs = found
  }

  if (endTs < startTs) return null
  return { start: startTs, end: endTs }
}

export function calculateLeadTime(
  ticketCreatedAt: Date,
  transitions: Transition[],
  endStatus: string,
  leadTimeStartStatus?: string | null,
  mode: CycleTimeMode = 'first_last',
): number | null {
  const w = resolveLeadWindow(ticketCreatedAt, transitions, endStatus, leadTimeStartStatus, mode)
  return w ? (w.end.getTime() - w.start.getTime()) / (1000 * 86400) : null
}
