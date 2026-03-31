import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, type ImportSessionRow, type TicketRow } from '../db/schema.js'
import { calculateCycleTime, type CycleTimeMode } from '../analyzers/cycleTime.js'
import { calculateLeadTime } from '../analyzers/leadTime.js'
import { firstTransitionTo, lastTransitionTo, sortTransitions, type Transition } from '../analyzers/utils.js'

export interface ParsedConfig {
  id: string
  name: string
  source_type: string
  base_url: string | null
  status_order: string[]
  cycle_time_start_status: string
  cycle_time_end_status: string
  cycle_time_mode: CycleTimeMode
  lead_time_start_status: string | null
  lead_time_end_status: string | null
  created_at: string
}

export interface EnrichedTicket {
  id: string
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  external_link: string | null
  transitions: Transition[]
  // computed — unrounded (routes round at HTTP boundary)
  cycle_time_days: number | null
  lead_time_days: number | null
  completed_at: Date | null   // mode-aware completion timestamp
  current_status: string | null
  completed: boolean
}

export interface ImportContext {
  imp: ImportSessionRow
  config: ParsedConfig
  tickets: EnrichedTicket[]
  cycleStatuses: string[]   // status_order sliced to cycle window
}

export function buildEnrichedTicket(
  ticket: TicketRow,
  transitions: Transition[],
  config: ParsedConfig,
): EnrichedTicket {
  const { cycle_time_start_status, cycle_time_end_status, cycle_time_mode, lead_time_start_status, lead_time_end_status } = config

  const ct = calculateCycleTime(transitions, cycle_time_start_status, cycle_time_end_status, cycle_time_mode)
  const lt = calculateLeadTime(
    new Date(ticket.created_at),
    transitions,
    lead_time_end_status ?? cycle_time_end_status,
    lead_time_start_status,
    cycle_time_mode,
  )

  const completedAt = cycle_time_mode === 'first_first'
    ? firstTransitionTo(transitions, cycle_time_end_status)
    : lastTransitionTo(transitions, cycle_time_end_status)

  const sorted = sortTransitions(transitions)

  return {
    id: ticket.id,
    external_id: ticket.external_id,
    title: ticket.title,
    ticket_type: ticket.ticket_type,
    created_at: ticket.created_at,
    external_link: ticket.external_link,
    transitions,
    cycle_time_days: ct,
    lead_time_days: lt,
    completed_at: completedAt,
    current_status: sorted.length ? sorted[sorted.length - 1].to_status : null,
    completed: completedAt !== null,
  }
}

export async function loadImportContext(importId: string): Promise<ImportContext | null> {
  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, importId))
  if (!impRows.length) return null
  const imp = impRows[0]

  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, imp.config_id))
  if (!cfgRows.length) return null
  const raw = cfgRows[0]

  const config: ParsedConfig = {
    ...raw,
    status_order: JSON.parse(raw.status_order) as string[],
    cycle_time_mode: (raw.cycle_time_mode ?? 'first_last') as CycleTimeMode,
    lead_time_start_status: raw.lead_time_start_status ?? null,
    lead_time_end_status: raw.lead_time_end_status ?? null,
  }

  const startIdx = config.status_order.indexOf(config.cycle_time_start_status)
  const endIdx = config.status_order.indexOf(config.cycle_time_end_status)
  const cycleStatuses = startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx
    ? config.status_order.slice(startIdx, endIdx + 1)
    : config.status_order

  const ticketRows = await db.select().from(tickets).where(eq(tickets.import_id, importId))
  const enrichedTickets: EnrichedTicket[] = []

  if (ticketRows.length) {
    const ticketIds = ticketRows.map(t => t.id)
    const transRows = await db.select().from(ticketTransitions)
      .where(inArray(ticketTransitions.ticket_id, ticketIds))

    const transMap: Record<string, Transition[]> = {}
    for (const tr of transRows) {
      if (!transMap[tr.ticket_id]) transMap[tr.ticket_id] = []
      transMap[tr.ticket_id].push({
        from_status: tr.from_status,
        to_status: tr.to_status,
        transitioned_at: tr.transitioned_at,
      })
    }

    for (const ticket of ticketRows) {
      enrichedTickets.push(buildEnrichedTicket(ticket, transMap[ticket.id] ?? [], config))
    }
  }

  return { imp, config, tickets: enrichedTickets, cycleStatuses }
}
