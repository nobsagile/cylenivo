import type { EnrichedTicket } from '../lib/context.js'
import { sortTransitions } from './utils.js'

export type CfdDataPoint = { date: string } & Record<string, string | number>

export interface CfdResult {
  statuses: string[]
  data: CfdDataPoint[]
}

export function computeCFD(tickets: EnrichedTicket[], statusOrder: string[]): CfdResult {
  // Collect all statuses that appear in transitions or as current_status
  const statusSet = new Set<string>()
  for (const ticket of tickets) {
    for (const t of ticket.transitions) {
      if (t.from_status) statusSet.add(t.from_status)
      statusSet.add(t.to_status)
    }
    if (ticket.transitions.length === 0 && ticket.current_status) {
      statusSet.add(ticket.current_status)
    }
  }

  // Ordered: configured status_order first, then any unlisted statuses
  const statuses = [
    ...statusOrder.filter(s => statusSet.has(s)),
    ...[...statusSet].filter(s => !statusOrder.includes(s)).sort(),
  ]

  if (statuses.length === 0 || tickets.length === 0) return { statuses: [], data: [] }

  // Pre-compute per-ticket: created timestamp, initial status, sorted transitions with ms
  type TicketEntry = {
    createdMs: number
    firstFromStatus: string | null
    transitions: { ms: number; toStatus: string }[]
  }

  let minMs = Infinity
  let maxTransitionMs = -Infinity

  const ticketData: TicketEntry[] = []
  for (const ticket of tickets) {
    const sorted = sortTransitions(ticket.transitions)
    const createdMs = new Date(ticket.created_at).getTime()

    if (sorted.length === 0) {
      // Ticket has no transitions — place it in current_status from created_at onwards
      if (!ticket.current_status || !statusSet.has(ticket.current_status)) continue
      if (createdMs < minMs) minMs = createdMs
      ticketData.push({ createdMs, firstFromStatus: ticket.current_status, transitions: [] })
      continue
    }

    if (createdMs < minMs) minMs = createdMs

    const transitions = sorted.map(t => {
      const ms = new Date(t.transitioned_at).getTime()
      if (ms > maxTransitionMs) maxTransitionMs = ms
      return { ms, toStatus: t.to_status }
    })

    ticketData.push({ createdMs, firstFromStatus: sorted[0].from_status, transitions })
  }

  if (ticketData.length === 0) return { statuses: [], data: [] }
  // If all tickets have no transitions, use today as the end date
  if (maxTransitionMs === -Infinity) maxTransitionMs = Date.now()

  // Date range: UTC midnight of first created_at → UTC midnight of last transition
  const MS_PER_DAY = 86_400_000
  const startDay = Math.floor(minMs / MS_PER_DAY) * MS_PER_DAY
  const endDay = Math.floor(maxTransitionMs / MS_PER_DAY) * MS_PER_DAY

  const data: CfdDataPoint[] = []

  for (let dayMs = startDay; dayMs <= endDay; dayMs += MS_PER_DAY) {
    const dayEnd = dayMs + MS_PER_DAY - 1
    const dateStr = new Date(dayMs).toISOString().slice(0, 10)

    const counts: Record<string, number> = {}
    for (const s of statuses) counts[s] = 0

    for (const { createdMs, firstFromStatus, transitions } of ticketData) {
      if (createdMs > dayEnd) continue

      // Walk sorted transitions to find status at end of day
      let status: string | null = firstFromStatus
      for (const t of transitions) {
        if (t.ms <= dayEnd) {
          status = t.toStatus
        } else {
          break
        }
      }

      if (status !== null && status in counts) {
        counts[status]++
      }
    }

    data.push({ date: dateStr, ...counts })
  }

  return { statuses, data }
}
