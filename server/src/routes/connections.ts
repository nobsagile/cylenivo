import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { sourceConnections, type ConnectionRow, type ConnectionInsert } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { testConnection, buildImportFile } from '../connectors/jira.js'
import type { JiraCredentials } from '../connectors/jira.js'

const connections = new Hono()

function serialize(row: ConnectionRow) {
  // Never expose api_token to frontend
  const { api_token: _, ...rest } = row
  return rest
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
  if (!body.project) return c.json({ data: null, error: 'Missing required field: project' }, 422)

  const creds: JiraCredentials = { base_url: conn.base_url, email: conn.email, api_token: conn.api_token }
  const requestedLimit = typeof body.limit === 'number' ? body.limit : 50
  const options = {
    project: body.project,
    limit: Math.min(Math.max(1, requestedLimit), 2000),
    issue_types: body.issue_types ?? ['Story', 'Task', 'Bug'],
    resolved_from: body.resolved_from as string | undefined,
    resolved_to: body.resolved_to as string | undefined,
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

export default connections
