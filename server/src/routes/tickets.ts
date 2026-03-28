import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { importSessions, tickets, ticketTransitions } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { loadImportContext, buildEnrichedTicket } from '../lib/context.js'
import type { ParsedConfig } from '../lib/context.js'
import type { Transition } from '../analyzers/utils.js'

const ticketsRouter = new Hono()

ticketsRouter.get('/', async (c) => {
  const importId = c.req.query('import_id')
  if (!importId) return c.json({ data: null, error: 'import_id required' }, 400)

  const ctx = await loadImportContext(importId)
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const page = Math.max(1, Number(c.req.query('page') ?? 1))
  const limit = Math.min(200, Math.max(1, Number(c.req.query('limit') ?? 50)))
  const type = c.req.query('type')
  const completedOnly = c.req.query('completed_only') === '1'
  const offset = (page - 1) * limit

  let filtered = ctx.tickets
  if (type) filtered = filtered.filter(t => t.ticket_type === type)
  if (completedOnly) filtered = filtered.filter(t => t.cycle_time_days !== null)

  const total = filtered.length
  const paginated = filtered.slice(offset, offset + limit).map(t => ({
    id: t.id,
    external_id: t.external_id,
    title: t.title,
    ticket_type: t.ticket_type,
    created_at: t.created_at,
    external_link: t.external_link,
    cycle_time_days: t.cycle_time_days !== null ? Math.round(t.cycle_time_days * 100) / 100 : null,
    lead_time_days: t.lead_time_days !== null ? Math.round(t.lead_time_days * 100) / 100 : null,
    current_status: t.current_status,
    completed: t.completed,
  }))

  return c.json(ok({ tickets: paginated, total, page, limit }))
})

ticketsRouter.get('/:id', async (c) => {
  const ticketId = c.req.param('id')

  const ticketRows = await db.select().from(tickets).where(eq(tickets.id, ticketId))
  if (!ticketRows.length) return c.json({ data: null, error: 'Ticket not found' }, 404)
  const ticket = ticketRows[0]

  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, ticket.import_id))
  if (!impRows.length) return c.json({ data: null, error: 'Import not found' }, 404)

  const ctx = await loadImportContext(ticket.import_id)
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const transRows = await db.select().from(ticketTransitions).where(eq(ticketTransitions.ticket_id, ticketId))
  const transitions: Transition[] = transRows.map(tr => ({
    from_status: tr.from_status,
    to_status: tr.to_status,
    transitioned_at: tr.transitioned_at,
  }))

  const enriched = buildEnrichedTicket(ticket, transitions, ctx.config)
  const sorted = [...transRows].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime(),
  )

  return c.json(ok({
    id: enriched.id,
    external_id: enriched.external_id,
    title: enriched.title,
    ticket_type: enriched.ticket_type,
    created_at: enriched.created_at,
    external_link: enriched.external_link,
    cycle_time_days: enriched.cycle_time_days !== null ? Math.round(enriched.cycle_time_days * 100) / 100 : null,
    lead_time_days: enriched.lead_time_days !== null ? Math.round(enriched.lead_time_days * 100) / 100 : null,
    current_status: enriched.current_status,
    completed: enriched.completed,
    transitions: sorted.map(t => ({
      id: t.id,
      from_status: t.from_status,
      to_status: t.to_status,
      transitioned_at: t.transitioned_at,
    })),
  }))
})

export default ticketsRouter
