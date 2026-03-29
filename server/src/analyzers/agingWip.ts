import type { EnrichedTicket } from '../lib/context.js'
import { firstTransitionTo, lastTransitionTo } from './utils.js'

const MS_PER_DAY = 1000 * 60 * 60 * 24

export interface AgingWIPTicket {
  id: string
  external_id: string
  title: string
  ticket_type: string
  current_status: string
  days_in_current_status: number
  wip_age_days: number
  external_link: string | null
}

/**
 * Returns in-progress tickets that have entered the cycle but not yet completed,
 * sorted by wip_age_days descending (oldest first).
 * Uses importedAt as the reference "now" since data is a snapshot.
 */
export function computeAgingWip(
  tickets: EnrichedTicket[],
  cycleStartStatus: string,
  cycleStatuses: string[],
  importedAt: Date,
): AgingWIPTicket[] {
  const now = importedAt.getTime()
  const result: AgingWIPTicket[] = []

  for (const t of tickets) {
    if (t.completed) continue
    if (!t.current_status) continue
    // Only tickets currently within the cycle window (excludes OBSOLET, cancelled, etc.)
    if (!cycleStatuses.includes(t.current_status)) continue

    const cycleEntry = firstTransitionTo(t.transitions, cycleStartStatus)
    if (!cycleEntry) continue // never entered the cycle

    const wip_age_days = Math.round((now - cycleEntry.getTime()) / MS_PER_DAY * 10) / 10

    const statusEntry = lastTransitionTo(t.transitions, t.current_status)
    const days_in_current_status = statusEntry
      ? Math.round((now - statusEntry.getTime()) / MS_PER_DAY * 10) / 10
      : 0

    result.push({
      id: t.id,
      external_id: t.external_id,
      title: t.title,
      ticket_type: t.ticket_type,
      current_status: t.current_status,
      days_in_current_status,
      wip_age_days,
      external_link: t.external_link,
    })
  }

  return result.sort((a, b) => b.wip_age_days - a.wip_age_days)
}
