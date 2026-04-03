import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { llmInsights, llmConfig, type LlmConfigRow } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { mean, median } from '../lib/stats.js'
import { loadImportContext } from '../lib/context.js'
import { computeAggregate } from '../lib/aggregate.js'
import { DEFAULT_SYSTEM_PROMPT } from './llm-config.js'

const llm = new Hono()

const CONFIG_ID = 'default'

async function getLlmConfig(): Promise<LlmConfigRow | null> {
  const rows = await db.select().from(llmConfig).where(eq(llmConfig.id, CONFIG_ID))
  return rows.length ? rows[0] : null
}

async function callLLM(
  config: LlmConfigRow,
  messages: { role: string; content: string }[],
): Promise<string> {
  if (config.provider === 'ollama') {
    const baseUrl = config.base_url ?? 'http://localhost:11434'
    const resp = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: config.model, messages, stream: false }),
      signal: AbortSignal.timeout(120000),
    })
    if (!resp.ok) throw new Error('LLM not available')
    const data = await resp.json() as { message?: { content?: string } }
    return data.message?.content ?? ''
  } else {
    const baseUrl = config.provider === 'openai'
      ? 'https://api.openai.com'
      : (config.base_url ?? '')
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (config.api_key) headers['Authorization'] = `Bearer ${config.api_key}`
    const resp = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model: config.model, messages, stream: false }),
      signal: AbortSignal.timeout(120000),
    })
    if (!resp.ok) throw new Error('LLM not available')
    const data = await resp.json() as { choices?: { message?: { content?: string } }[] }
    return data.choices?.[0]?.message?.content ?? ''
  }
}

llm.get('/status', async (c) => {
  const cfg = await getLlmConfig()
  if (!cfg) return c.json(ok({ configured: false, provider: null, model: null, available: false }))

  if (cfg.provider === 'ollama') {
    const baseUrl = cfg.base_url ?? 'http://localhost:11434'
    try {
      const resp = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
      if (resp.ok) {
        return c.json(ok({ configured: true, provider: cfg.provider, model: cfg.model, available: true }))
      }
    } catch { /* fall through */ }
    return c.json(ok({ configured: true, provider: cfg.provider, model: cfg.model, available: false }))
  }

  return c.json(ok({ configured: true, provider: cfg.provider, model: cfg.model, available: true }))
})

llm.post('/analyze/:importId', async (c) => {
  const cfg = await getLlmConfig()
  if (!cfg) return c.json({ data: null, error: 'LLM not configured' }, 503)

  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const agg = computeAggregate(ctx)
  const { imp } = ctx
  const { cycleTimes, leadTimes, cycleTimePercentiles, throughput, dateRange, timeInStatus, completedTickets } = agg

  const dateFrom = dateRange.from ? dateRange.from.slice(0, 10) : 'N/A'
  const dateTo = dateRange.to ? dateRange.to.slice(0, 10) : 'N/A'

  // Cycle time by ticket type
  const ctByType: Record<string, number[]> = {}
  for (const ticket of completedTickets) {
    if (!ctByType[ticket.ticket_type]) ctByType[ticket.ticket_type] = []
    ctByType[ticket.ticket_type].push(ticket.cycle_time_days!)
  }
  const typeLines = Object.entries(ctByType)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([type, times]) => {
      const avg = Math.round(mean(times) * 10) / 10
      const med = Math.round(median(times) * 10) / 10
      return `  ${type}: ${times.length} tickets, avg ${avg}d, median ${med}d`
    })
    .join('\n')

  // Time in status summary lines
  const tisLines = Object.entries(timeInStatus)
    .map(([s, v]) => `  ${s}: avg ${v.mean_days}d, median ${v.median_days}d`)
    .join('\n')

  // Top 5 slowest
  const slowest = [...completedTickets]
    .sort((a, b) => b.cycle_time_days! - a.cycle_time_days!)
    .slice(0, 5)
    .map(t => `  ${t.external_id} [${t.ticket_type}]: ${Math.round(t.cycle_time_days! * 10) / 10}d — ${t.title}`)
    .join('\n')

  const userContent = `PROJECT: ${imp.project_key}
TICKETS ANALYZED: ${ctx.tickets.length} total, ${cycleTimes.length} completed
DATE RANGE: ${dateFrom} to ${dateTo}
THROUGHPUT: ${throughput != null ? `${throughput} tickets/week` : 'n/a (date range < 7 days)'}

CYCLE TIME (from ${ctx.config.cycle_time_start_status} to ${ctx.config.cycle_time_end_status}):
  Mean: ${cycleTimes.length ? Math.round(mean(cycleTimes) * 10) / 10 : 'N/A'} days | Median: ${cycleTimes.length ? Math.round(median(cycleTimes) * 10) / 10 : 'N/A'} days
  P50: ${cycleTimePercentiles.p50} days | P70: ${cycleTimePercentiles.p70} days | P85: ${cycleTimePercentiles.p85} days | P95: ${cycleTimePercentiles.p95} days

LEAD TIME (from ticket creation to ${ctx.config.cycle_time_end_status}):
  Mean: ${leadTimes.length ? Math.round(mean(leadTimes) * 10) / 10 : 'N/A'} days | Median: ${leadTimes.length ? Math.round(median(leadTimes) * 10) / 10 : 'N/A'} days

AVERAGE TIME IN STATUS (completed tickets only):
${tisLines}

CYCLE TIME BY TICKET TYPE:
${typeLines}

TOP 5 SLOWEST TICKETS (by cycle time):
${slowest}

Please provide:
1. Key observations (max 3 bullet points, be specific with numbers)
2. The main bottleneck you see and why
3. One concrete, actionable suggestion for the team`

  const systemPrompt = cfg.system_prompt || DEFAULT_SYSTEM_PROMPT
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent },
  ]

  let insightText: string
  try {
    insightText = await callLLM(cfg, messages)
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'LLM not available' }, 503)
  }

  const model = cfg.model
  const now = new Date().toISOString()
  await db.transaction(async (tx) => {
    const existing = await tx.select().from(llmInsights).where(eq(llmInsights.import_id, imp.id))
    if (existing.length) {
      await tx.update(llmInsights)
        .set({ insight_text: insightText, model_used: model, generated_at: now })
        .where(eq(llmInsights.import_id, imp.id))
    } else {
      await tx.insert(llmInsights).values({
        id: crypto.randomUUID(),
        import_id: imp.id,
        model_used: model,
        insight_text: insightText,
        generated_at: now,
      })
    }
  })

  return c.json(ok({ insight_text: insightText, model_used: model, generated_at: now }))
})

llm.post('/chat/:importId', async (c) => {
  const cfg = await getLlmConfig()
  if (!cfg) return c.json({ data: null, error: 'LLM not configured' }, 503)

  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const body = await c.req.json() as { messages: { role: string; content: string }[] }

  const agg = computeAggregate(ctx)
  const { cycleTimes, leadTimes, cycleTimePercentiles, completedTickets } = agg

  const slowest = [...completedTickets]
    .sort((a, b) => b.cycle_time_days! - a.cycle_time_days!)
    .slice(0, 5)
    .map(t => `${t.external_id} (${Math.round(t.cycle_time_days! * 10) / 10}d)`)
    .join(', ')

  const dataContext = `You have access to the following data for project ${ctx.imp.project_key}:

TICKETS: ${ctx.tickets.length} total, ${cycleTimes.length} completed
CYCLE TIME (${ctx.config.cycle_time_start_status} → ${ctx.config.cycle_time_end_status}):
  Median: ${cycleTimes.length ? Math.round(median(cycleTimes) * 10) / 10 : 'N/A'} days
  P50: ${cycleTimePercentiles.p50} | P70: ${cycleTimePercentiles.p70} | P85: ${cycleTimePercentiles.p85} | P95: ${cycleTimePercentiles.p95} days
LEAD TIME: Median ${leadTimes.length ? Math.round(median(leadTimes) * 10) / 10 : 'N/A'} days
TOP 5 SLOWEST: ${slowest}

Answer questions about this data concisely and specifically. Use numbers from the data above.`

  const systemPrompt = (cfg.system_prompt || DEFAULT_SYSTEM_PROMPT) + '\n\n' + dataContext
  const messages = [{ role: 'system', content: systemPrompt }, ...body.messages]

  let reply: string
  try {
    reply = await callLLM(cfg, messages)
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'LLM not available' }, 503)
  }

  return c.json(ok({ reply }))
})

llm.get('/insights/:importId', async (c) => {
  const rows = await db.select().from(llmInsights).where(eq(llmInsights.import_id, c.req.param('importId')))
  if (!rows.length) return c.json({ data: null, error: 'No analysis found for this import' }, 404)
  const r = rows[0]
  return c.json(ok({ insight_text: r.insight_text, model_used: r.model_used, generated_at: r.generated_at }))
})

export default llm
