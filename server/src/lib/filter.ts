import { selectLastN } from '../analyzers/lastN.js'
import type { EnrichedTicket } from './context.js'

export interface FilterInput {
  /** YYYY-MM-DD, inclusive */
  from?: string
  /** YYYY-MM-DD, inclusive (end of day UTC) */
  to?: string
  /** last N completed tickets, as string (query param) */
  last?: string
}

export interface MetricFilter {
  tickets: EnrichedTicket[]
  /** period the selection covers — for date-based views (CFD, restarts) */
  from?: Date
  to?: Date
  /** weekly views start here; set when `last` cut the oldest week */
  weeksFrom?: Date
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function applyDateFilter(tickets: EnrichedTicket[], from?: Date, to?: Date): EnrichedTicket[] {
  if (!from && !to) return tickets
  return tickets.filter(t => {
    if (!t.completed_at) return false
    if (from && t.completed_at < from) return false
    if (to && t.completed_at > to) return false
    return true
  })
}

/**
 * Either a date range (`from`/`to`) or the last N completed tickets (`last`),
 * never both (#144). Shared by the HTTP routes and the MCP tools so both
 * select exactly the same tickets.
 */
export function filterTickets(tickets: EnrichedTicket[], input: FilterInput): MetricFilter | { error: string } {
  const { from: f, to: t, last } = input
  if (f !== undefined && !DATE_RE.test(f)) return { error: 'from must be YYYY-MM-DD' }
  if (t !== undefined && !DATE_RE.test(t)) return { error: 'to must be YYYY-MM-DD' }

  if (last === undefined) {
    const from = f ? new Date(f) : undefined
    const to = t ? new Date(t + 'T23:59:59.999Z') : undefined
    return { tickets: applyDateFilter(tickets, from, to), from, to }
  }
  if (f || t) return { error: 'last cannot be combined with from/to' }
  const n = Number(last)
  if (!/^\d+$/.test(last) || n < 1 || n > 100000) return { error: 'last must be a positive integer' }
  const sel = selectLastN(tickets, n)
  return { tickets: sel.tickets, from: sel.from ?? undefined, weeksFrom: sel.fullWeeksFrom ?? undefined }
}
