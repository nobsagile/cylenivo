import type { tickets, ticketTransitions } from '../db/schema.js'

interface TicketInput {
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  external_link?: string | null
  transitions: {
    from_status?: string | null
    to_status: string
    transitioned_at: string
  }[]
  metadata?: Record<string, unknown> | null
}

/**
 * Builds ticket + transition insert rows from raw ticket input.
 * Used by both file import and demo seeding.
 */
export function buildTicketRows(
  importId: string,
  inputTickets: TicketInput[],
): {
  ticketRows: (typeof tickets.$inferInsert)[]
  transitionRows: (typeof ticketTransitions.$inferInsert)[]
} {
  const ticketRows: (typeof tickets.$inferInsert)[] = []
  const transitionRows: (typeof ticketTransitions.$inferInsert)[] = []

  for (const t of inputTickets) {
    const ticketId = crypto.randomUUID()
    ticketRows.push({
      id: ticketId,
      import_id: importId,
      external_id: t.external_id,
      title: t.title,
      ticket_type: t.ticket_type,
      created_at: new Date(t.created_at).toISOString(),
      external_link: t.external_link ?? null,
      extra_metadata: t.metadata ? JSON.stringify(t.metadata) : null,
    })

    const sorted = [...t.transitions].sort(
      (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime(),
    )
    for (const tr of sorted) {
      transitionRows.push({
        id: crypto.randomUUID(),
        ticket_id: ticketId,
        from_status: tr.from_status ?? null,
        to_status: tr.to_status,
        transitioned_at: new Date(tr.transitioned_at).toISOString(),
      })
    }
  }

  return { ticketRows, transitionRows }
}
