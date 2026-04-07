import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { eq, desc } from 'drizzle-orm'
import { db } from '../db/index.js'
import { sourceConnections, importSessions, type ConnectionRow, type ConnectionInsert } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { testConnection, buildImportFile } from '../connectors/jira.js'
import type { JiraCredentials } from '../connectors/jira.js'
import { loadPlugin } from '../lib/pluginRunner.js'

const connections = new Hono()

function serialize(row: ConnectionRow) {
  return {
    id: row.id,
    name: row.name,
    source_type: row.source_type,
    base_url: row.base_url,
    email: row.email,
    created_at: row.created_at,
    project_key: row.project_key,
    issue_types: row.issue_types ? JSON.parse(row.issue_types) : null,
    resolved_from: row.resolved_from,
    resolved_to: row.resolved_to,
  }
}

connections.get('/', async (c) => {
  const rows = await db.select().from(sourceConnections)
  return c.json(ok(rows.map(serialize)))
})

connections.post('/', async (c) => {
  const body = await c.req.json()
  if (!body.name) return c.json({ data: null, error: 'Missing required field: name' }, 422)
  if (!body.source_type) return c.json({ data: null, error: 'Missing required field: source_type' }, 422)

  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  let row: ConnectionInsert

  if (body.source_type === 'jira') {
    for (const field of ['base_url', 'email', 'api_token']) {
      if (!body[field]) return c.json({ data: null, error: `Missing required field: ${field}` }, 422)
    }
    row = {
      id, name: body.name, source_type: 'jira',
      base_url: (body.base_url ?? '').replace(/\/$/, ''),
      email: body.email, api_token: body.api_token,
      credentials_json: null,
      created_at: now,
      project_key: body.project_key ?? null,
      issue_types: body.issue_types ? JSON.stringify(body.issue_types) : null,
      resolved_from: body.resolved_from ?? null, resolved_to: body.resolved_to ?? null,
    }
  } else {
    row = {
      id, name: body.name, source_type: body.source_type,
      base_url: '', email: '', api_token: '',
      credentials_json: JSON.stringify(body.credentials ?? {}),
      created_at: now,
      project_key: null, issue_types: null, resolved_from: null, resolved_to: null,
    }
  }

  await db.insert(sourceConnections).values(row)
  return c.json(ok(serialize(row as ConnectionRow)), 201)
})

connections.put('/:id', async (c) => {
  const id = c.req.param('id')
  const existing = await db.select().from(sourceConnections).where(eq(sourceConnections.id, id))
  if (!existing.length) return c.json({ data: null, error: 'Connection not found' }, 404)

  const body = await c.req.json()
  const updates: Partial<ConnectionInsert> = {}
  if (body.name !== undefined) updates.name = body.name
  if (existing[0].source_type === 'jira') {
    if (body.base_url !== undefined) updates.base_url = (body.base_url ?? '').replace(/\/$/, '')
    if (body.email !== undefined) updates.email = body.email
    if (body.api_token !== undefined) updates.api_token = body.api_token
    if (body.project_key !== undefined) updates.project_key = body.project_key || null
    if (body.issue_types !== undefined) updates.issue_types = body.issue_types ? JSON.stringify(body.issue_types) : null
    if (body.resolved_from !== undefined) updates.resolved_from = body.resolved_from || null
    if (body.resolved_to !== undefined) updates.resolved_to = body.resolved_to || null
  } else {
    if (body.credentials !== undefined) updates.credentials_json = JSON.stringify(body.credentials)
  }

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
  try {
    if (conn.source_type === 'jira') {
      const creds: JiraCredentials = { base_url: conn.base_url, email: conn.email, api_token: conn.api_token }
      const result = await testConnection(creds)
      return c.json(ok(result))
    } else {
      const plugin = await loadPlugin(conn.source_type)
      const credentials = JSON.parse(conn.credentials_json ?? '{}')
      const result = await plugin.test(credentials)
      return c.json(ok(result))
    }
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

  if (conn.source_type === 'jira') {
    const project = body.project || conn.project_key
    if (!project) return c.json({ data: null, error: 'Missing required field: project' }, 422)
  }

  return streamSSE(c, async (stream) => {
    try {
      if (conn.source_type === 'jira') {
        const project = body.project || conn.project_key
        const creds: JiraCredentials = { base_url: conn.base_url, email: conn.email, api_token: conn.api_token }
        const storedTypes = conn.issue_types ? JSON.parse(conn.issue_types) : null
        const options = {
          project,
          issue_types: body.issue_types ?? storedTypes ?? ['Story', 'Task', 'Bug'],
          resolved_from: body.resolved_from ?? conn.resolved_from ?? undefined,
          resolved_to: body.resolved_to ?? conn.resolved_to ?? undefined,
        }
        const importFile = await buildImportFile(creds, options, async (current, total, key) => {
          await stream.writeSSE({ data: JSON.stringify({ type: 'progress', current, total, key }) })
        })
        await stream.writeSSE({ data: JSON.stringify({ type: 'done', result: importFile }) })
      } else {
        const plugin = await loadPlugin(conn.source_type)
        const credentials = JSON.parse(conn.credentials_json ?? '{}')
        const result = await plugin.fetch(credentials, body, async (current: number, total: number, key: string) => {
          await stream.writeSSE({ data: JSON.stringify({ type: 'progress', current, total, key }) })
        })
        await stream.writeSSE({ data: JSON.stringify({ type: 'done', result }) })
      }
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
  return c.json(ok(serialize(row as ConnectionRow)), 201)
})

connections.get('/:id/datasets', async (c) => {
  const rows = await db.select().from(importSessions)
    .where(eq(importSessions.connection_id, c.req.param('id')))
    .orderBy(desc(importSessions.imported_at))
  return c.json(ok(rows))
})

export default connections
