import type { TicketInsert, TransitionInsert } from '../db/schema.js'

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

function parseDate(value: string): string | null {
  try {
    const d = new Date(value)
    if (isNaN(d.getTime())) return null
    return d.toISOString()
  } catch {
    return null
  }
}

export interface DroppedRows {
  /** external_ids of tickets dropped entirely (unparseable created_at) */
  tickets: string[]
  /** number of transitions dropped (unparseable transitioned_at) */
  transitions: number
  /** external_ids of tickets that lost at least one transition */
  ticketsWithDroppedTransitions: string[]
}

export interface BuiltRows {
  ticketRows: TicketInsert[]
  transitionRows: TransitionInsert[]
  /**
   * What was thrown away. Callers MUST surface this: a dropped ticket or
   * transition silently changes cycle times, and reporting the input count as
   * ticket_count made a dataset claim 200 tickets while holding 195.
   */
  dropped: DroppedRows
}

/**
 * Builds ticket + transition insert rows from raw ticket input.
 * Used by both file import and demo seeding.
 */
export function buildTicketRows(
  importId: string,
  inputTickets: TicketInput[],
): BuiltRows {
  const ticketRows: TicketInsert[] = []
  const transitionRows: TransitionInsert[] = []
  const droppedTickets: string[] = []
  const ticketsWithDroppedTransitions: string[] = []
  let droppedTransitions = 0

  for (const t of inputTickets) {
    const createdAt = parseDate(t.created_at)
    if (!createdAt) {
      console.warn(`[ticketInsert] skipping ${t.external_id}: invalid created_at "${t.created_at}"`)
      droppedTickets.push(t.external_id)
      continue
    }

    const ticketId = crypto.randomUUID()
    ticketRows.push({
      id: ticketId,
      import_id: importId,
      external_id: t.external_id,
      title: t.title,
      ticket_type: t.ticket_type,
      created_at: createdAt,
      external_link: t.external_link ?? null,
      extra_metadata: t.metadata ? JSON.stringify(t.metadata) : null,
    })

    const sorted = [...t.transitions].sort(
      (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
        || a.to_status.localeCompare(b.to_status),
    )
    let lostTransition = false
    for (const tr of sorted) {
      const transitionedAt = parseDate(tr.transitioned_at)
      if (!transitionedAt) {
        console.warn(`[ticketInsert] skipping transition for ${t.external_id}: invalid transitioned_at "${tr.transitioned_at}"`)
        droppedTransitions++
        lostTransition = true
        continue
      }
      transitionRows.push({
        id: crypto.randomUUID(),
        ticket_id: ticketId,
        from_status: tr.from_status ?? null,
        to_status: tr.to_status,
        transitioned_at: transitionedAt,
      })
    }
    if (lostTransition) ticketsWithDroppedTransitions.push(t.external_id)
  }

  return {
    ticketRows,
    transitionRows,
    dropped: {
      tickets: droppedTickets,
      transitions: droppedTransitions,
      ticketsWithDroppedTransitions,
    },
  }
}
