import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { eq, desc } from 'drizzle-orm'
import { db } from '../db/index.js'
import { sourceConnections, importSessions, type ConnectionRow, type ConnectionInsert } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { testConnection, buildImportFile } from '../connectors/jira.js'
import type { JiraCredentials } from '../connectors/jira.js'

const connections = new Hono()

function serialize(row: ConnectionRow) {
  // Never expose api_token to frontend
  const { api_token: _, issue_types, ...rest } = row
  return {
    ...rest,
    issue_types: issue_types ? JSON.parse(issue_types) : null,
  }
}

connections.get('/', async (c) => {
  const rows = await db.select().from(sourceConnections)
  return c.json(ok(rows.map(serialize)))
})

connections.post('/', async (c) => {
  const body = await c.req.json()
  const required = ['name', 'source_type', 'base_url', 'email', 'api_token']
  for (const field of required) {
    if (!body[field]) return c.json({ data: null, error: `Missing required field: ${field}` }, 422)
  }
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const row = {
    id,
    name: body.name,
    source_type: body.source_type,
    base_url: (body.base_url ?? '').replace(/\/$/, ''),
    email: body.email,
    api_token: body.api_token,
    created_at: now,
    project_key: body.project_key ?? null,
    issue_types: body.issue_types ? JSON.stringify(body.issue_types) : null,
    resolved_from: body.resolved_from ?? null,
    resolved_to: body.resolved_to ?? null,
  }
  await db.insert(sourceConnections).values(row)
  return c.json(ok(serialize(row)), 201)
})

connections.put('/:id', async (c) => {
  const id = c.req.param('id')
  const existing = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  if (!existing.length) return c.json({ data: null, error: 'Connection not found' }, 404)

  const body = await c.req.json()
  const updates: Partial<ConnectionInsert> = {}
  if (body.name !== undefined) updates.name = body.name
  if (body.base_url !== undefined) updates.base_url = (body.base_url ?? '').replace(/\/$/, '')
  if (body.email !== undefined) updates.email = body.email
  if (body.api_token !== undefined) updates.api_token = body.api_token
  if (body.project_key !== undefined) updates.project_key = body.project_key || null
  if (body.issue_types !== undefined) updates.issue_types = body.issue_types ? JSON.stringify(body.issue_types) : null
  if (body.resolved_from !== undefined) updates.resolved_from = body.resolved_from || null
  if (body.resolved_to !== undefined) updates.resolved_to = body.resolved_to || null

  await db.update(sourceConnections).set(updates).where(eq(sourceConnections.id, id))
  const updated = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  return c.json(ok(serialize(updated[0])))
})

connections.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const existing = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  if (!existing.length) return c.json({ data: null, error: 'Connection not found' }, 404)
  await db.delete(sourceConnections).where(eq(sourceConnections.id, id))
  return new Response(null, { status: 204 })
})

connections.post('/:id/test', async (c) => {
  const id = c.req.param('id')
  const rows = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Connection not found' }, 404)

  const conn = rows[0]
  const creds: JiraCredentials = { base_url: conn.base_url, email: conn.email, api_token: conn.api_token }
  try {
    const result = await testConnection(creds)
    return c.json(ok(result))
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Connection failed' }, 400)
  }
})

connections.post('/:id/fetch', async (c) => {
  const id = c.req.param('id')
  const rows = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  if (!rows.length) return c.json({ data: null, error: 'Connection not found' }, 404)

  const conn = rows[0]
  const body = await c.req.json()
  const project = body.project || conn.project_key
  if (!project) return c.json({ data: null, error: 'Missing required field: project' }, 422)

  const creds: JiraCredentials = { base_url: conn.base_url, email: conn.email, api_token: conn.api_token }
  const requestedLimit = typeof body.limit === 'number' ? body.limit : 50
  const storedTypes = conn.issue_types ? JSON.parse(conn.issue_types) : null
  const options = {
    project,
    limit: Math.min(Math.max(1, requestedLimit), 2000),
    issue_types: body.issue_types ?? storedTypes ?? ['Story', 'Task', 'Bug'],
    resolved_from: body.resolved_from ?? conn.resolved_from ?? undefined,
    resolved_to: body.resolved_to ?? conn.resolved_to ?? undefined,
  }

  return streamSSE(c, async (stream) => {
    try {
      const importFile = await buildImportFile(creds, options, async (current, total, key) => {
        await stream.writeSSE({ data: JSON.stringify({ type: 'progress', current, total, key }) })
      })
      await stream.writeSSE({ data: JSON.stringify({ type: 'done', result: importFile }) })
    } catch (e) {
      await stream.writeSSE({ data: JSON.stringify({ type: 'error', message: e instanceof Error ? e.message : 'Fetch failed' }) })
    }
  })
})

connections.post('/:id/duplicate', async (c) => {
  const id = c.req.param('id')
  const existing = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  if (!existing.length) return c.json({ data: null, error: 'Connection not found' }, 404)

  const source = existing[0]
  const newId = crypto.randomUUID()
  const row = {
    ...source,
    id: newId,
    name: `${source.name} (copy)`,
    created_at: new Date().toISOString(),
  }
  await db.insert(sourceConnections).values(row)
  return c.json(ok(serialize(row)), 201)
})

connections.get('/:id/datasets', async (c) => {
  const rows = await db.select().from(importSessions)
    .where(eq(importSessions.connection_id, c.req.param('id')))
    .orderBy(desc(importSessions.imported_at))
  return c.json(ok(rows))
})

export default connections
