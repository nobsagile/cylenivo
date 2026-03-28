import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions } from '../db/schema.js'
import { ok } from '../lib/response.js'

const configs = new Hono()

function serializeConfig(row: typeof projectConfigs.$inferSelect) {
  return {
    ...row,
    status_order: JSON.parse(row.status_order) as string[],
  }
}

configs.get('/', async (c) => {
  const rows = await db.select().from(projectConfigs)
  return c.json(ok(rows.map(serializeConfig)))
})

configs.get('/:id', async (c) => {
  const rows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, c.req.param('id')))
  if (!rows.length) return c.json({ data: null, error: 'Config not found' }, 404)
  return c.json(ok(serializeConfig(rows[0])))
})

configs.post('/', async (c) => {
  const body = await c.req.json()
  const required = ['name', 'source_type', 'status_order', 'cycle_time_start_status', 'cycle_time_end_status']
  for (const field of required) {
    if (!body[field]) return c.json({ data: null, error: `Missing required field: ${field}` }, 422)
  }
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const row = {
    id,
    name: body.name,
    source_type: body.source_type,
    base_url: body.base_url ?? null,
    status_order: JSON.stringify(body.status_order),
    cycle_time_start_status: body.cycle_time_start_status,
    cycle_time_end_status: body.cycle_time_end_status,
    cycle_time_mode: body.cycle_time_mode ?? 'first_last',
    lead_time_start_status: body.lead_time_start_status ?? null,
    lead_time_end_status: body.lead_time_end_status ?? null,
    created_at: now,
  }
  await db.insert(projectConfigs).values(row)
  return c.json(ok(serializeConfig(row)), 201)
})

configs.put('/:id', async (c) => {
  const id = c.req.param('id')
  const existing = await db.select().from(projectConfigs).where(eq(projectConfigs.id, id))
  if (!existing.length) return c.json({ data: null, error: 'Config not found' }, 404)

  const body = await c.req.json()
  // Validate that required string fields are not set to empty string
  if (body.cycle_time_start_status === '') return c.json({ data: null, error: 'cycle_time_start_status cannot be empty' }, 422)
  if (body.cycle_time_end_status === '') return c.json({ data: null, error: 'cycle_time_end_status cannot be empty' }, 422)
  if (body.name === '') return c.json({ data: null, error: 'name cannot be empty' }, 422)

  const updates: Partial<typeof projectConfigs.$inferInsert> = {}
  if (body.name !== undefined) updates.name = body.name
  if (body.source_type !== undefined) updates.source_type = body.source_type
  if (body.base_url !== undefined) updates.base_url = body.base_url
  if (Array.isArray(body.status_order) && body.status_order.length > 0) updates.status_order = JSON.stringify(body.status_order)
  if (body.cycle_time_start_status !== undefined) updates.cycle_time_start_status = body.cycle_time_start_status
  if (body.cycle_time_end_status !== undefined) updates.cycle_time_end_status = body.cycle_time_end_status
  if (body.cycle_time_mode !== undefined) updates.cycle_time_mode = body.cycle_time_mode
  if (body.lead_time_start_status !== undefined) updates.lead_time_start_status = body.lead_time_start_status
  if (body.lead_time_end_status !== undefined) updates.lead_time_end_status = body.lead_time_end_status

  await db.update(projectConfigs).set(updates).where(eq(projectConfigs.id, id))
  const updated = await db.select().from(projectConfigs).where(eq(projectConfigs.id, id))
  return c.json(ok(serializeConfig(updated[0])))
})

configs.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const existing = await db.select().from(projectConfigs).where(eq(projectConfigs.id, id))
  if (!existing.length) return c.json({ data: null, error: 'Config not found' }, 404)

  const imports = await db.select().from(importSessions).where(eq(importSessions.config_id, id))
  if (imports.length) {
    return c.json({ data: null, error: 'Config has associated imports. Delete imports first.' }, 409)
  }

  await db.delete(projectConfigs).where(eq(projectConfigs.id, id))
  return new Response(null, { status: 204 })
})

export default configs
