import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { llmConfig } from '../db/schema.js'
import { ok } from '../lib/response.js'

const llmConfigRoute = new Hono()

export const DEFAULT_SYSTEM_PROMPT = `You are an expert in Lean and Kanban flow metrics for software development teams. Analyze the quantitative flow data below and identify meaningful patterns, anomalies, and improvement opportunities that are not obvious from looking at individual metrics in isolation.

Key concepts:
- Cycle Time: time from work start to completion. High variability (large gap between P50 and P85/P95) signals unpredictability — the team cannot reliably forecast delivery.
- Lead Time: time from ticket creation to completion. A large gap between lead time and cycle time reveals queue/wait time before work even starts.
- Time in Status: where work actually spends time. A status with disproportionately high average time is a bottleneck, especially if it is a waiting/queue state rather than an active work state.
- Flow Efficiency: ratio of active work time to total cycle time. Below 30% means work spends most of its time waiting, not being worked on.
- Rework: tickets moving backward in the workflow inflate cycle time and reduce predictability. Patterns in rework paths indicate systemic quality or handoff issues.

When analyzing, look for:
1. Bottlenecks — statuses with disproportionate wait time relative to their role in the workflow
2. Tail risk — P85/P95 significantly higher than P50 indicates problematic outliers dragging up unpredictability
3. Type patterns — certain ticket types consistently slower or more prone to rework
4. Queue vs active time — is cycle time driven by actual work or by waiting?
5. Rework patterns — which transitions cause the most rework, and how much cycle time does it add?
6. Throughput signals — is delivery rate consistent or showing signs of stress?

Be specific with numbers from the data. Ground every observation in what was actually measured. Avoid generic advice. Identify the one or two highest-impact levers the team could pull.

Formatting rules (strict — violating these makes the output unreadable):
- NEVER use emojis or unicode symbols in any part of the response — not in headings, not in lists, nowhere. Example: write "## Key Flow Problems", NOT "## 📈 Key Flow Problems".
- NEVER use LaTeX or math notation ($, \\text{}, \\mathbf{}, etc.). Write numbers and formulas as plain text (e.g. "P95 / Mean = 3.1", not "$\\text{P95} / \\text{Mean} \\approx 3.1$").
- Use plain Markdown only: headers, bold, lists, code spans. No decorative characters.`

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
    system_prompt?: string
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

  const systemPrompt = body.system_prompt || (existing.length ? existing[0].system_prompt : DEFAULT_SYSTEM_PROMPT)

  if (existing.length) {
    await db.update(llmConfig).set({
      provider: body.provider,
      base_url: body.base_url ?? null,
      api_key: apiKey,
      model: body.model,
      system_prompt: systemPrompt,
    }).where(eq(llmConfig.id, CONFIG_ID))
  } else {
    await db.insert(llmConfig).values({
      id: CONFIG_ID,
      provider: body.provider,
      base_url: body.base_url ?? null,
      api_key: apiKey,
      model: body.model,
      system_prompt: systemPrompt,
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
