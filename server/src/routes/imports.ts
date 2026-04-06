import { Hono } from 'hono'
import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, type ImportSessionRow } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { buildHealthReport } from '../analyzers/healthReport.js'
import { inferStatusOrder } from '../analyzers/statusOrder.js'
import { buildTicketRows } from '../lib/ticketInsert.js'

const imports = new Hono()

interface TransitionInput {
  from_status?: string | null
  to_status: string
  transitioned_at: string
}

interface TicketInput {
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  external_link?: string | null
  transitions: TransitionInput[]
  metadata?: Record<string, unknown> | null
}

interface ImportFile {
  source_type: string
  project_key: string
  exported_at: string
  tickets: TicketInput[]
}

function validateImportFile(raw: unknown): ImportFile {
  const data = raw as Record<string, unknown>
  if (!data.source_type || !data.project_key || !Array.isArray(data.tickets)) {
    throw new Error('Invalid import file: missing source_type, project_key, or tickets')
  }
  if (data.tickets.length === 0) {
    throw new Error('Import file contains no tickets')
  }
  // source_type validation removed — plugins can have any source_type
  return data as unknown as ImportFile
}

function serializeSession(
  row: ImportSessionRow,
  cfg?: { name: string | null; cycle_time_start_status: string; cycle_time_end_status: string } | null,
) {
  return {
    ...row,
    config_name: cfg?.name ?? null,
    cycle_time_start_status: cfg?.cycle_time_start_status ?? null,
    cycle_time_end_status: cfg?.cycle_time_end_status ?? null,
    health_report: row.health_report ? JSON.parse(row.health_report) : null,
  }
}

imports.get('/', async (c) => {
  const rows = await db.select().from(importSessions)
  const configIds = [...new Set(rows.map(r => r.config_id))]
  const cfgRows = configIds.length
    ? await db.select().from(projectConfigs).where(inArray(projectConfigs.id, configIds))
    : []
  const cfgMap = Object.fromEntries(cfgRows.map(c => [c.id, c]))
  return c.json(ok(rows.map(r => serializeSession(r, cfgMap[r.config_id]))))
})

imports.get('/:id', async (c) => {
  const rows = await db.select().from(importSessions).where(eq(importSessions.id, c.req.param('id')))
  if (!rows.length) return c.json({ data: null, error: 'Import not found' }, 404)
  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, rows[0].config_id))
  return c.json(ok(serializeSession(rows[0], cfgRows[0] ?? null)))
})

imports.get('/:id/statuses', async (c) => {
  const id = c.req.param('id')
  const imp = await db.select().from(importSessions).where(eq(importSessions.id, id))
  if (!imp.length) return c.json({ data: null, error: 'Import not found' }, 404)

  const ticketRows = await db.select({ id: tickets.id }).from(tickets).where(eq(tickets.import_id, id))
  if (!ticketRows.length) return c.json(ok([]))

  const ticketIds = ticketRows.map(t => t.id)
  const transRows = await db
    .select({
      ticket_id: ticketTransitions.ticket_id,
      from_status: ticketTransitions.from_status,
      to_status: ticketTransitions.to_status,
      transitioned_at: ticketTransitions.transitioned_at,
    })
    .from(ticketTransitions)
    .where(inArray(ticketTransitions.ticket_id, ticketIds))

  const byTicket = new Map<string, typeof transRows>()
  for (const row of transRows) {
    if (!byTicket.has(row.ticket_id)) byTicket.set(row.ticket_id, [])
    byTicket.get(row.ticket_id)!.push(row)
  }
  const statuses = inferStatusOrder([...byTicket.values()].map(transitions => ({ transitions })))
  return c.json(ok(statuses))
})

imports.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json<{ name?: string; config_id?: string }>()
  const rows = await db.select().from(importSessions).where(eq(importSessions.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Import not found' }, 404)
  const patch: Record<string, unknown> = {}
  if ('name' in body) patch.name = body.name || null
  if ('config_id' in body && body.config_id) patch.config_id = body.config_id
  if (Object.keys(patch).length) {
    await db.update(importSessions).set(patch).where(eq(importSessions.id, id))
  }
  const updated = await db.select().from(importSessions).where(eq(importSessions.id, id))
  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, updated[0].config_id))
  return c.json(ok(serializeSession(updated[0], cfgRows[0] ?? null)))
})

imports.post('/', async (c) => {
  const body = await c.req.parseBody()
  const file = body['file']
  const configId = body['config_id'] as string
  const datasetName = (body['name'] as string) || null
  const connectionId = (body['connection_id'] as string) || null

  if (!file || typeof file === 'string') {
    return c.json({ data: null, error: 'No file provided' }, 400)
  }

  let raw: unknown
  try {
    const text = await (file as File).text()
    raw = JSON.parse(text)
  } catch {
    return c.json({ data: null, error: 'Invalid JSON file' }, 400)
  }

  let data: ImportFile
  try {
    data = validateImportFile(raw)
  } catch (e) {
    return c.json({ data: null, error: (e as Error).message }, 422)
  }

  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, configId))
  if (!cfgRows.length) return c.json({ data: null, error: `Config ${configId} not found` }, 404)

  const importId = crypto.randomUUID()
  const now = new Date().toISOString()
  const fileName = (file as File).name || 'upload.json'

  const cfg = cfgRows[0]
  const statusOrder = JSON.parse(cfg.status_order) as string[]
  const healthReport = buildHealthReport(
    data.tickets,
    statusOrder,
    cfg.cycle_time_start_status,
    cfg.cycle_time_end_status,
  )

  const sessionRow = {
    id: importId,
    config_id: configId,
    name: datasetName,
    source_type: data.source_type,
    project_key: data.project_key,
    file_name: fileName,
    ticket_count: data.tickets.length,
    imported_at: now,
    health_report: JSON.stringify(healthReport),
    connection_id: connectionId,
  }

  for (const t of data.tickets) {
    if (!t.external_id) {
      return c.json({ data: null, error: 'Ticket missing external_id' }, 422)
    }
  }

  const { ticketRows, transitionRows } = buildTicketRows(importId, data.tickets)

  const CHUNK = 500
  await db.insert(importSessions).values(sessionRow)
  for (let i = 0; i < ticketRows.length; i += CHUNK) {
    await db.insert(tickets).values(ticketRows.slice(i, i + CHUNK))
  }
  for (let i = 0; i < transitionRows.length; i += CHUNK) {
    await db.insert(ticketTransitions).values(transitionRows.slice(i, i + CHUNK))
  }

  return c.json(ok(serializeSession(sessionRow, cfgRows[0])), 201)
})

// Replace ticket data for an existing import (Refresh — keeps the same session ID)
imports.put('/:id/data', async (c) => {
  const id = c.req.param('id')
  const rows = await db.select().from(importSessions).where(eq(importSessions.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Import not found' }, 404)

  const body = await c.req.parseBody()
  const file = body['file']
  if (!file || typeof file === 'string') {
    return c.json({ data: null, error: 'No file provided' }, 400)
  }

  let raw: unknown
  try {
    const text = await (file as File).text()
    raw = JSON.parse(text)
  } catch {
    return c.json({ data: null, error: 'Invalid JSON file' }, 400)
  }

  let data: ImportFile
  try {
    data = validateImportFile(raw)
  } catch (e) {
    return c.json({ data: null, error: (e as Error).message }, 422)
  }

  const configId = rows[0].config_id
  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, configId))
  if (!cfgRows.length) return c.json({ data: null, error: 'Config not found' }, 404)

  const cfg = cfgRows[0]
  const statusOrder = JSON.parse(cfg.status_order) as string[]
  const healthReport = buildHealthReport(data.tickets, statusOrder, cfg.cycle_time_start_status, cfg.cycle_time_end_status)
  const now = new Date().toISOString()

  const { ticketRows: newTicketRows, transitionRows } = buildTicketRows(id, data.tickets)
  const CHUNK = 500

  await db.transaction(async (tx) => {
    // Delete old ticket data atomically — prevents double-insert if two requests race
    const existing = await tx.select({ id: tickets.id }).from(tickets).where(eq(tickets.import_id, id))
    if (existing.length) {
      const existingIds = existing.map(t => t.id)
      await tx.delete(ticketTransitions).where(inArray(ticketTransitions.ticket_id, existingIds))
      await tx.delete(tickets).where(inArray(tickets.id, existingIds))
    }

    for (let i = 0; i < newTicketRows.length; i += CHUNK) {
      await tx.insert(tickets).values(newTicketRows.slice(i, i + CHUNK))
    }
    for (let i = 0; i < transitionRows.length; i += CHUNK) {
      await tx.insert(ticketTransitions).values(transitionRows.slice(i, i + CHUNK))
    }

    await tx.update(importSessions).set({
      source_type: data.source_type,
      project_key: data.project_key,
      file_name: (file as File).name || 'upload.json',
      ticket_count: data.tickets.length,
      imported_at: now,
      health_report: JSON.stringify(healthReport),
    }).where(eq(importSessions.id, id))
  })

  const updated = await db.select().from(importSessions).where(eq(importSessions.id, id))
  return c.json(ok(serializeSession(updated[0], cfg)))
})

imports.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const rows = await db.select().from(importSessions).where(eq(importSessions.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Import not found' }, 404)

  // cascade: delete transitions → tickets → import
  const ticketRows = await db.select({ id: tickets.id }).from(tickets).where(eq(tickets.import_id, id))
  if (ticketRows.length) {
    const ticketIds = ticketRows.map(t => t.id)
    await db.delete(ticketTransitions).where(inArray(ticketTransitions.ticket_id, ticketIds))
    await db.delete(tickets).where(inArray(tickets.id, ticketIds))
  }
  await db.delete(importSessions).where(eq(importSessions.id, id))
  return new Response(null, { status: 204 })
})

export default imports
