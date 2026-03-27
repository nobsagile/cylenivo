import { Hono } from 'hono'
import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights, llmConfig } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { mean, median } from '../lib/stats.js'
import { calculateCycleTime } from '../analyzers/cycleTime.js'
import { calculateLeadTime } from '../analyzers/leadTime.js'
import { calculatePercentiles } from '../analyzers/percentiles.js'
import { firstTransitionTo, type Transition } from '../analyzers/utils.js'
import { DEFAULT_SYSTEM_PROMPT } from './llm-config.js'

const llm = new Hono()

const CONFIG_ID = 'default'

type LlmConfigRow = typeof llmConfig.$inferSelect

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

async function getContext(importId: string) {
  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, importId))
  if (!impRows.length) return null
  const imp = impRows[0]
  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, imp.config_id))
  if (!cfgRows.length) return null
  const config = { ...cfgRows[0], status_order: JSON.parse(cfgRows[0].status_order) as string[] }

  const ticketRows = await db.select().from(tickets).where(eq(tickets.import_id, importId))
  const transMap: Record<string, Transition[]> = {}

  if (ticketRows.length) {
    const ticketIds = ticketRows.map(t => t.id)
    const transRows = await db.select().from(ticketTransitions).where(inArray(ticketTransitions.ticket_id, ticketIds))
    for (const tr of transRows) {
      if (!transMap[tr.ticket_id]) transMap[tr.ticket_id] = []
      transMap[tr.ticket_id].push({ from_status: tr.from_status, to_status: tr.to_status, transitioned_at: tr.transitioned_at })
    }
  }

  const allTickets = ticketRows.map(t => ({ ...t, transitions: transMap[t.id] ?? [] }))
  return { imp, config, allTickets }
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

  // OpenAI / openai_compatible — assume reachable
  return c.json(ok({ configured: true, provider: cfg.provider, model: cfg.model, available: true }))
})

llm.post('/analyze/:importId', async (c) => {
  const cfg = await getLlmConfig()
  if (!cfg) return c.json({ data: null, error: 'LLM not configured' }, 503)

  const ctx = await getContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config, allTickets } = ctx

  const cycleTimes: number[] = []
  const leadTimes: number[] = []
  const completedAtDates: Date[] = []
  const ctWithTicket: [number, string][] = []

  for (const ticket of allTickets) {
    const ct = calculateCycleTime(ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status)
    if (ct !== null) {
      cycleTimes.push(ct)
      ctWithTicket.push([ct, ticket.external_id])
      const endTs = firstTransitionTo(ticket.transitions, config.cycle_time_end_status)
      if (endTs) completedAtDates.push(endTs)
    }
    const lt = calculateLeadTime(new Date(ticket.created_at), ticket.transitions, config.cycle_time_end_status, config.lead_time_start_status)
    if (lt !== null) leadTimes.push(lt)
  }

  const percentiles = calculatePercentiles(cycleTimes)
  const slowest = ctWithTicket.sort((a, b) => b[0] - a[0]).slice(0, 5)
  const dateFrom = completedAtDates.length ? completedAtDates.reduce((a, b) => a < b ? a : b).toISOString().slice(0, 10) : 'N/A'
  const dateTo = completedAtDates.length ? completedAtDates.reduce((a, b) => a > b ? a : b).toISOString().slice(0, 10) : 'N/A'

  const userContent = `PROJECT: ${imp.project_key}
TICKETS ANALYZED: ${allTickets.length} total, ${cycleTimes.length} completed
DATE RANGE: ${dateFrom} to ${dateTo}

CYCLE TIME (from ${config.cycle_time_start_status} to ${config.cycle_time_end_status}):
  Mean: ${cycleTimes.length ? Math.round(mean(cycleTimes) * 10) / 10 : 'N/A'} days | Median: ${cycleTimes.length ? Math.round(median(cycleTimes) * 10) / 10 : 'N/A'} days
  P50: ${percentiles.p50} days | P70: ${percentiles.p70} days | P85: ${percentiles.p85} days | P95: ${percentiles.p95} days

LEAD TIME (from ticket creation to ${config.cycle_time_end_status}):
  Mean: ${leadTimes.length ? Math.round(mean(leadTimes) * 10) / 10 : 'N/A'} days | Median: ${leadTimes.length ? Math.round(median(leadTimes) * 10) / 10 : 'N/A'} days

TOP 5 SLOWEST TICKETS (by cycle time):
${slowest.map(([ct, id]) => `  ${id}: ${Math.round(ct * 10) / 10} days`).join('\n')}

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
  const existing = await db.select().from(llmInsights).where(eq(llmInsights.import_id, imp.id))

  if (existing.length) {
    await db.update(llmInsights)
      .set({ insight_text: insightText, model_used: model, generated_at: now })
      .where(eq(llmInsights.import_id, imp.id))
  } else {
    await db.insert(llmInsights).values({
      id: crypto.randomUUID(),
      import_id: imp.id,
      model_used: model,
      insight_text: insightText,
      generated_at: now,
    })
  }

  return c.json(ok({ insight_text: insightText, model_used: model, generated_at: now }))
})

llm.post('/chat/:importId', async (c) => {
  const cfg = await getLlmConfig()
  if (!cfg) return c.json({ data: null, error: 'LLM not configured' }, 503)

  const ctx = await getContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config, allTickets } = ctx

  const body = await c.req.json() as { messages: { role: string; content: string }[] }

  const cycleTimes: number[] = []
  const leadTimes: number[] = []
  const ctWithTicket: [number, string][] = []

  for (const ticket of allTickets) {
    const ct = calculateCycleTime(ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status)
    if (ct !== null) { cycleTimes.push(ct); ctWithTicket.push([ct, ticket.external_id]) }
    const lt = calculateLeadTime(new Date(ticket.created_at), ticket.transitions, config.cycle_time_end_status, config.lead_time_start_status)
    if (lt !== null) leadTimes.push(lt)
  }

  const percentiles = calculatePercentiles(cycleTimes)
  const slowest = ctWithTicket.sort((a, b) => b[0] - a[0]).slice(0, 5)

  const dataContext = `You have access to the following data for project ${imp.project_key}:

TICKETS: ${allTickets.length} total, ${cycleTimes.length} completed
CYCLE TIME (${config.cycle_time_start_status} → ${config.cycle_time_end_status}):
  Median: ${cycleTimes.length ? Math.round(median(cycleTimes) * 10) / 10 : 'N/A'} days
  P50: ${percentiles.p50} | P70: ${percentiles.p70} | P85: ${percentiles.p85} | P95: ${percentiles.p95} days
LEAD TIME: Median ${leadTimes.length ? Math.round(median(leadTimes) * 10) / 10 : 'N/A'} days
TOP 5 SLOWEST: ${slowest.map(([ct, id]) => `${id} (${Math.round(ct * 10) / 10}d)`).join(', ')}

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
