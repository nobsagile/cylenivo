import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { llmConfig } from '../db/schema.js'
import { ok } from '../lib/response.js'

const llmConfigRoute = new Hono()

export const DEFAULT_SYSTEM_PROMPT = `You are a flow analysis expert for software development teams. Analyze flow metrics data and provide clear, actionable insights. Be specific with numbers and focus on what matters most to the team.`

export const OPENAI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']

const CONFIG_ID = 'default'

llmConfigRoute.get('/', async (c) => {
  const rows = await db.select().from(llmConfig).where(eq(llmConfig.id, CONFIG_ID))
  if (!rows.length) return c.json(ok(null))
  const { api_key, ...rest } = rows[0]
  return c.json(ok({ ...rest, key_set: !!api_key }))
})

llmConfigRoute.put('/', async (c) => {
  const body = await c.req.json() as {
    provider: string
    base_url?: string
    api_key?: string
    model: string
    system_prompt: string
  }
  const existing = await db.select().from(llmConfig).where(eq(llmConfig.id, CONFIG_ID))
  const now = new Date().toISOString()

  // Keep existing api_key if not provided (empty string = clear it)
  let apiKey: string | null = null
  if (body.api_key !== undefined) {
    apiKey = body.api_key || null
  } else if (existing.length) {
    apiKey = existing[0].api_key
  }

  if (existing.length) {
    await db.update(llmConfig).set({
      provider: body.provider,
      base_url: body.base_url ?? null,
      api_key: apiKey,
      model: body.model,
      system_prompt: body.system_prompt,
    }).where(eq(llmConfig.id, CONFIG_ID))
  } else {
    await db.insert(llmConfig).values({
      id: CONFIG_ID,
      provider: body.provider,
      base_url: body.base_url ?? null,
      api_key: apiKey,
      model: body.model,
      system_prompt: body.system_prompt,
      created_at: now,
    })
  }

  const updated = await db.select().from(llmConfig).where(eq(llmConfig.id, CONFIG_ID))
  const { api_key: _k, ...rest } = updated[0]
  return c.json(ok({ ...rest, key_set: !!_k }))
})

llmConfigRoute.delete('/', async (c) => {
  await db.delete(llmConfig).where(eq(llmConfig.id, CONFIG_ID))
  return c.json(ok(null))
})

llmConfigRoute.get('/ollama-models', async (c) => {
  const baseUrl = c.req.query('base_url') ?? 'http://localhost:11434'
  try {
    const resp = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (!resp.ok) return c.json(ok({ models: [] }))
    const data = await resp.json() as { models?: { name: string }[] }
    return c.json(ok({ models: (data.models ?? []).map((m) => m.name) }))
  } catch {
    return c.json(ok({ models: [] }))
  }
})

llmConfigRoute.get('/openai-models', async (c) => {
  return c.json(ok({ models: OPENAI_MODELS }))
})

export default llmConfigRoute
