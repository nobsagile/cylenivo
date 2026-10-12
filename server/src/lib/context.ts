import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, type ImportSessionRow, type TicketRow } from '../db/schema.js'
import type { CycleTimeMode } from '../analyzers/cycleTime.js'
import { resolveCycleWindow, windowDays, type RestartInfo, type RestartOptions } from '../analyzers/cycleWindow.js'
import { resolveLeadWindow } from '../analyzers/leadTime.js'
import { calculateFlowEfficiency } from '../analyzers/flowEfficiency.js'
import { sortTransitions, type Transition } from '../analyzers/utils.js'

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
  active_statuses: string[] | null
  restart_statuses: string[]
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
  cycle_started_at: Date | null   // mode-aware, restart-aware cycle start
  lead_started_at: Date | null    // created_at or lead start status; null if lead time is null
  lead_ended_at: Date | null      // mode-aware lead end; null if lead time is null
  restart: RestartInfo | null     // set when the ticket was moved to a restart status after starting
  current_status: string | null
  flow_efficiency: number | null
  completed: boolean
  excluded: boolean
  exclusion_reason: string | null
}

export interface ImportContext {
  imp: ImportSessionRow
  config: ParsedConfig
  /**
   * Tickets for ALL metric calculations — user-excluded tickets are already
   * filtered out. The UI promises "excluded from all metric calculations", so
   * this is the safe default: forgetting to filter can no longer leak an
   * excluded ticket into a chart.
   */
  tickets: EnrichedTicket[]
  /**
   * Every ticket, including excluded ones. Only for listing tickets and for
   * counts ("N of M excluded") — never for a metric.
   */
  allTickets: EnrichedTicket[]
  cycleStatuses: string[]   // status_order sliced to cycle window
  restart: RestartOptions   // derived once — pass to every cycle-window trim
}

export function buildEnrichedTicket(
  ticket: TicketRow,
  transitions: Transition[],
  config: ParsedConfig,
  restart: RestartOptions,
): EnrichedTicket {
  const { cycle_time_start_status, cycle_time_end_status, cycle_time_mode, lead_time_start_status, lead_time_end_status, active_statuses } = config

  const window = resolveCycleWindow(transitions, cycle_time_start_status, cycle_time_end_status, cycle_time_mode, restart)
  const ct = windowDays(window)
  const leadWindow = resolveLeadWindow(
    new Date(ticket.created_at),
    transitions,
    lead_time_end_status ?? cycle_time_end_status,
    lead_time_start_status,
    cycle_time_mode,
  )
  const lt = leadWindow ? (leadWindow.end.getTime() - leadWindow.start.getTime()) / (1000 * 86400) : null

  // An abandoned ticket (restarted, never came back) has no end even if it
  // reached the end status before the abort.
  const completedAt = window.end

  const sorted = sortTransitions(transitions)

  const fe = ct !== null && active_statuses?.length
    ? calculateFlowEfficiency(transitions, active_statuses, cycle_time_start_status, cycle_time_end_status, cycle_time_mode, ct, restart)
    : null

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
    cycle_started_at: window.start,
    lead_started_at: leadWindow?.start ?? null,
    lead_ended_at: leadWindow?.end ?? null,
    restart: window.restart,
    current_status: sorted.length ? sorted[sorted.length - 1].to_status : null,
    flow_efficiency: fe,
    completed: completedAt !== null,
    excluded: ticket.excluded === 1,
    exclusion_reason: ticket.exclusion_reason ?? null,
  }
}

export async function loadImportContext(importId: string): Promise<ImportContext | null> {
  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, importId))
  if (!impRows.length) return null
  const imp = impRows[0]

  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, imp.config_id))
  if (!cfgRows.length) return null
  const raw = cfgRows[0]

  let statusOrder: string[]
  let activeStatuses: string[] | null = null
  let restartStatuses: string[] = []
  try {
    statusOrder = JSON.parse(raw.status_order) as string[]
  } catch {
    console.error(`[context] import ${importId}: corrupted status_order JSON`)
    return null
  }
  try {
    activeStatuses = raw.active_statuses ? JSON.parse(raw.active_statuses) as string[] : null
  } catch {
    console.warn(`[context] import ${importId}: corrupted active_statuses JSON, ignoring`)
  }
  try {
    restartStatuses = raw.restart_statuses ? JSON.parse(raw.restart_statuses) as string[] : []
  } catch {
    console.warn(`[context] import ${importId}: corrupted restart_statuses JSON, ignoring`)
  }

  const config: ParsedConfig = {
    ...raw,
    status_order: statusOrder,
    cycle_time_mode: (raw.cycle_time_mode ?? 'first_last') as CycleTimeMode,
    lead_time_start_status: raw.lead_time_start_status ?? null,
    lead_time_end_status: raw.lead_time_end_status ?? null,
    active_statuses: activeStatuses,
    restart_statuses: restartStatuses,
  }

  if (config.status_order.length === 0) {
    console.warn(`[context] import ${importId}: status_order is empty — time-in-status will have no data`)
  }
  const startIdx = config.status_order.indexOf(config.cycle_time_start_status)
  const endIdx = config.status_order.indexOf(config.cycle_time_end_status)
  const cycleStatuses = startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx
    ? config.status_order.slice(startIdx, endIdx + 1)
    : []
  // A restart status inside the cycle window would abort every ticket passing
  // through it — ignore such misconfiguration instead of corrupting metrics.
  const restart: RestartOptions = {
    cycleStatuses,
    restartStatuses: config.restart_statuses.filter(s => !cycleStatuses.includes(s)),
  }

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
      enrichedTickets.push(buildEnrichedTicket(ticket, transMap[ticket.id] ?? [], config, restart))
    }
  }

  // Derive the exclusion filter exactly once — same reasoning as cycleStatuses.
  return {
    imp,
    config,
    tickets: enrichedTickets.filter(t => !t.excluded),
    allTickets: enrichedTickets,
    cycleStatuses,
    restart,
  }
}
