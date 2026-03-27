import { Hono } from 'hono'
import { and, eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { calculateCycleTime } from '../analyzers/cycleTime.js'
import { calculateLeadTime } from '../analyzers/leadTime.js'
import { firstTransitionTo, lastTransitionTo, type Transition } from '../analyzers/utils.js'

const ticketsRouter = new Hono()

function enrichTicket(
  ticket: typeof tickets.$inferSelect,
  transitions: Transition[],
  config: { cycle_time_start_status: string; cycle_time_end_status: string; lead_time_start_status: string | null; cycle_time_mode: string },
) {
  const mode = config.cycle_time_mode as 'first_last' | 'first_first' | 'last_last'
  const ct = calculateCycleTime(transitions, config.cycle_time_start_status, config.cycle_time_end_status, mode)
  const lt = calculateLeadTime(
    new Date(ticket.created_at),
    transitions,
    config.cycle_time_end_status,
    config.lead_time_start_status,
    mode,
  )
  const endTs = mode === 'first_first'
    ? firstTransitionTo(transitions, config.cycle_time_end_status)
    : lastTransitionTo(transitions, config.cycle_time_end_status)
  const sorted = [...transitions].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )
  const currentStatus = sorted.length ? sorted[sorted.length - 1].to_status : null

  return {
    id: ticket.id,
    external_id: ticket.external_id,
    title: ticket.title,
    ticket_type: ticket.ticket_type,
    created_at: ticket.created_at,
    external_link: ticket.external_link,
    cycle_time_days: ct !== null ? Math.round(ct * 100) / 100 : null,
    lead_time_days: lt !== null ? Math.round(lt * 100) / 100 : null,
    current_status: currentStatus,
    completed: endTs !== null,
  }
}

ticketsRouter.get('/', async (c) => {
  const importId = c.req.query('import_id')
  if (!importId) return c.json({ data: null, error: 'import_id required' }, 400)

  const page = Math.max(1, Number(c.req.query('page') ?? 1))
  const limit = Math.min(200, Math.max(1, Number(c.req.query('limit') ?? 50)))
  const type = c.req.query('type')
  const completedOnly = c.req.query('completed_only') === '1'
  const offset = (page - 1) * limit

  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, importId))
  if (!impRows.length) return c.json({ data: null, error: 'Import not found' }, 404)

  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, impRows[0].config_id))
  const config = { ...cfgRows[0], status_order: JSON.parse(cfgRows[0].status_order) as string[] }

  // For completed_only we must enrich-then-filter; fetch all matching rows first
  let allRows: (typeof tickets.$inferSelect)[]
  if (type) {
    allRows = await db.select().from(tickets)
      .where(and(eq(tickets.import_id, importId), eq(tickets.ticket_type, type)))
  } else {
    allRows = await db.select().from(tickets).where(eq(tickets.import_id, importId))
  }

  if (!allRows.length) {
    return c.json(ok({ tickets: [], total: 0, page, limit }))
  }

  const ticketIds = allRows.map(t => t.id)
  const transRows = await db.select().from(ticketTransitions).where(inArray(ticketTransitions.ticket_id, ticketIds))

  const transMap: Record<string, Transition[]> = {}
  for (const tr of transRows) {
    if (!transMap[tr.ticket_id]) transMap[tr.ticket_id] = []
    transMap[tr.ticket_id].push({
      from_status: tr.from_status,
      to_status: tr.to_status,
      transitioned_at: tr.transitioned_at,
    })
  }

  let enriched = allRows.map(t => enrichTicket(t, transMap[t.id] ?? [], config))
  if (completedOnly) enriched = enriched.filter(t => t.cycle_time_days !== null)

  const total = enriched.length
  const paginated = enriched.slice(offset, offset + limit)
  return c.json(ok({ tickets: paginated, total, page, limit }))
})

ticketsRouter.get('/:id', async (c) => {
  const ticketId = c.req.param('id')
  const ticketRows = await db.select().from(tickets).where(eq(tickets.id, ticketId))
  if (!ticketRows.length) return c.json({ data: null, error: 'Ticket not found' }, 404)

  const ticket = ticketRows[0]
  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, ticket.import_id))
  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, impRows[0].config_id))
  const config = { ...cfgRows[0], status_order: JSON.parse(cfgRows[0].status_order) as string[] }

  const transRows = await db.select().from(ticketTransitions).where(eq(ticketTransitions.ticket_id, ticketId))
  const transitions: Transition[] = transRows.map(tr => ({
    from_status: tr.from_status,
    to_status: tr.to_status,
    transitioned_at: tr.transitioned_at,
  }))

  const enriched = enrichTicket(ticket, transitions, config)
  const sorted = [...transRows].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )

  return c.json(ok({
    ...enriched,
    transitions: sorted.map(t => ({
      id: t.id,
      from_status: t.from_status,
      to_status: t.to_status,
      transitioned_at: t.transitioned_at,
    })),
  }))
})

export default ticketsRouter
