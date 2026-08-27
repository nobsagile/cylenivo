import { Hono } from 'hono'
import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights, type ImportSessionRow } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { buildHealthReport, type ImportHealthReport } from '../analyzers/healthReport.js'
import { inferStatusOrder } from '../analyzers/statusOrder.js'
import { buildTicketRows, type DroppedRows } from '../lib/ticketInsert.js'

const imports = new Hono()

/**
 * Merges import-time row drops into the health report so the UI can show them.
 * buildHealthReport only sees transitions, not why rows went missing, so the
 * drop lists from buildTicketRows are attached here.
 */
function withDropped(report: ImportHealthReport, dropped: DroppedRows): ImportHealthReport {
  return {
    ...report,
    tickets_dropped: dropped.tickets,
    transitions_dropped: dropped.transitions,
    tickets_with_dropped_transitions: dropped.ticketsWithDroppedTransitions,
  }
}

/**
 * Builds the health report from the rows that will actually be stored.
 *
 * Running it on the raw input instead was subtly wrong: a ticket dropped for a
 * bad created_at still counted towards "started but never reached <end>", while
 * a stored ticket that lost its end transition did not. The report described
 * data that was never inserted.
 */
function buildHealthReportFromRows(
  builtRows: ReturnType<typeof buildTicketRows>,
  statusOrder: string[],
  cycleStart: string,
  cycleEnd: string,
): ImportHealthReport {
  const byTicket = new Map<string, { to_status: string; transitioned_at: string }[]>()
  for (const tr of builtRows.transitionRows) {
    const list = byTicket.get(tr.ticket_id)
    if (list) list.push(tr)
    else byTicket.set(tr.ticket_id, [tr])
  }
  const stored = builtRows.ticketRows.map(row => ({ transitions: byTicket.get(row.id) ?? [] }))
  return withDropped(
    buildHealthReport(stored, statusOrder, cycleStart, cycleEnd),
    builtRows.dropped,
  )
}

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
    issue_types: row.issue_types ? JSON.parse(row.issue_types) : null,
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
  const resolvedFrom = (body['resolved_from'] as string) || null
  const resolvedTo = (body['resolved_to'] as string) || null
  const issueTypesRaw = (body['issue_types'] as string) || null

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

  for (const t of data.tickets) {
    if (!t.external_id) {
      return c.json({ data: null, error: 'Ticket missing external_id' }, 422)
    }
  }

  const built = buildTicketRows(importId, data.tickets)
  const { ticketRows, transitionRows } = built
  const healthReport = buildHealthReportFromRows(
    built, statusOrder, cfg.cycle_time_start_status, cfg.cycle_time_end_status,
  )

  const sessionRow = {
    id: importId,
    config_id: configId,
    name: datasetName,
    source_type: data.source_type,
    project_key: data.project_key,
    file_name: fileName,
    // Rows actually inserted, not rows offered. Using the input length made a
    // dataset report 200 tickets while holding 195 — silently, because rows with
    // an unparseable created_at are dropped in buildTicketRows.
    ticket_count: ticketRows.length,
    imported_at: now,
    health_report: JSON.stringify(healthReport),
    connection_id: connectionId,
    resolved_from: resolvedFrom,
    resolved_to: resolvedTo,
    issue_types: issueTypesRaw,
  }

  // Synchronous callback: bun:sqlite is a synchronous driver, and
  // db.transaction(async tx => …) does NOT roll back on failure — statements
  // before the error stay committed. A failed import would leave a partially
  // written dataset behind. Sync + .run() rolls back correctly.
  const CHUNK = 500
  db.transaction((tx) => {
    tx.insert(importSessions).values(sessionRow).run()
    for (let i = 0; i < ticketRows.length; i += CHUNK) {
      tx.insert(tickets).values(ticketRows.slice(i, i + CHUNK)).run()
    }
    for (let i = 0; i < transitionRows.length; i += CHUNK) {
      tx.insert(ticketTransitions).values(transitionRows.slice(i, i + CHUNK)).run()
    }
  })

  return c.json(ok(serializeSession(sessionRow, cfgRows[0])), 201)
})

// Replace ticket data for an existing import (Refresh — keeps the same session ID)
imports.put('/:id/data', async (c) => {
  const id = c.req.param('id')
  const rows = await db.select().from(importSessions).where(eq(importSessions.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Import not found' }, 404)

  const body = await c.req.parseBody()
  const file = body['file']
  const resolvedFrom = body['resolved_from'] as string | undefined
  const resolvedTo = body['resolved_to'] as string | undefined
  const issueTypesRaw = body['issue_types'] as string | undefined
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
  const now = new Date().toISOString()

  const built = buildTicketRows(id, data.tickets)
  const { ticketRows: newTicketRows, transitionRows } = built
  const healthReport = buildHealthReportFromRows(
    built, statusOrder, cfg.cycle_time_start_status, cfg.cycle_time_end_status,
  )
  const CHUNK = 500

  // Synchronous callback — see the POST route above. A refresh that failed
  // halfway through used to leave the dataset with the old data deleted and the
  // new data only partly inserted, with no way to tell.
  db.transaction((tx) => {
    // Delete old ticket data atomically — prevents double-insert if two requests race
    const existingIds = tx.select({ id: tickets.id }).from(tickets).where(eq(tickets.import_id, id)).all().map(t => t.id)
    for (let i = 0; i < existingIds.length; i += CHUNK) {
      const slice = existingIds.slice(i, i + CHUNK)
      tx.delete(ticketTransitions).where(inArray(ticketTransitions.ticket_id, slice)).run()
    }
    for (let i = 0; i < existingIds.length; i += CHUNK) {
      const slice = existingIds.slice(i, i + CHUNK)
      tx.delete(tickets).where(inArray(tickets.id, slice)).run()
    }

    for (let i = 0; i < newTicketRows.length; i += CHUNK) {
      tx.insert(tickets).values(newTicketRows.slice(i, i + CHUNK)).run()
    }
    for (let i = 0; i < transitionRows.length; i += CHUNK) {
      tx.insert(ticketTransitions).values(transitionRows.slice(i, i + CHUNK)).run()
    }

    tx.update(importSessions).set({
      source_type: data.source_type,
      project_key: data.project_key,
      file_name: (file as File).name || 'upload.json',
      ticket_count: newTicketRows.length,
      imported_at: now,
      health_report: JSON.stringify(healthReport),
      ...(resolvedFrom !== undefined ? { resolved_from: resolvedFrom || null } : {}),
      ...(resolvedTo !== undefined ? { resolved_to: resolvedTo || null } : {}),
      ...(issueTypesRaw !== undefined ? { issue_types: issueTypesRaw || null } : {}),
    }).where(eq(importSessions.id, id)).run()
  })

  const updated = await db.select().from(importSessions).where(eq(importSessions.id, id))
  return c.json(ok(serializeSession(updated[0], cfg)))
})

imports.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const rows = await db.select().from(importSessions).where(eq(importSessions.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Import not found' }, 404)

  // Cascade in one transaction: transitions → tickets → llm_insights → import.
  // llm_insights was missing, and it has a FK on import_sessions with
  // PRAGMA foreign_keys = ON — so after any AI analysis the delete failed with
  // "FOREIGN KEY constraint failed" and the dataset became undeletable forever.
  // Every table with a FK into import_sessions or tickets must be listed here.
  //
  // The callback is SYNCHRONOUS on purpose. bun:sqlite is a synchronous driver:
  // with `db.transaction(async tx => …)` the await points break the BEGIN/COMMIT
  // boundary and a failure does NOT roll back — verified, statements before the
  // error stay committed. That is what turned a failed delete into a zombie
  // dataset (tickets gone, session left claiming N tickets). Sync + .run() rolls
  // back correctly.
  const ticketIds = (
    await db.select({ id: tickets.id }).from(tickets).where(eq(tickets.import_id, id))
  ).map(t => t.id)

  const CHUNK = 500
  db.transaction((tx) => {
    for (let i = 0; i < ticketIds.length; i += CHUNK) {
      const slice = ticketIds.slice(i, i + CHUNK)
      tx.delete(ticketTransitions).where(inArray(ticketTransitions.ticket_id, slice)).run()
    }
    for (let i = 0; i < ticketIds.length; i += CHUNK) {
      const slice = ticketIds.slice(i, i + CHUNK)
      tx.delete(tickets).where(inArray(tickets.id, slice)).run()
    }
    tx.delete(llmInsights).where(eq(llmInsights.import_id, id)).run()
    tx.delete(importSessions).where(eq(importSessions.id, id)).run()
  })

  return new Response(null, { status: 204 })
})

export default imports
