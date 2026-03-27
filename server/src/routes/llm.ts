import { Hono } from 'hono'
import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { mean, median } from '../lib/stats.js'
import { calculateCycleTime } from '../analyzers/cycleTime.js'
import { calculateLeadTime } from '../analyzers/leadTime.js'
import { calculatePercentiles } from '../analyzers/percentiles.js'
import { firstTransitionTo, type Transition } from '../analyzers/utils.js'

const llm = new Hono()

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'qwen3:14b'

const LLM_PROMPT_TEMPLATE = `You are a flow analysis expert for software development teams.
Analyze the following metrics and identify patterns, bottlenecks, and anomalies.
Be concise and actionable. Focus on what the team should pay attention to.

PROJECT: {project_key}
TICKETS ANALYZED: {ticket_count} total, {completed_count} completed
DATE RANGE: {date_from} to {date_to}

CYCLE TIME (from {cycle_start} to {cycle_end}):
  Mean: {cycle_mean} days | Median: {cycle_median} days
  P50: {p50} days | P70: {p70} days | P85: {p85} days | P95: {p95} days

LEAD TIME (from ticket creation to {cycle_end}):
  Mean: {lead_mean} days | Median: {lead_median} days

TOP 5 SLOWEST TICKETS (by cycle time):
{slow_tickets_formatted}

Please provide:
1. Key observations (max 3 bullet points, be specific with numbers)
2. The main bottleneck you see and why
3. One concrete, actionable suggestion for the team
`

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
  try {
    const resp = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (resp.ok) {
      const data = await resp.json() as { models?: { name: string }[] }
      const models = (data.models ?? []).map((m) => m.name)
      return c.json(ok({ available: true, models, recommended_model: OLLAMA_MODEL }))
    }
  } catch {
    // fall through
  }
  return c.json(ok({ available: false, models: [], recommended_model: OLLAMA_MODEL }))
})

llm.post('/analyze/:importId', async (c) => {
  const ctx = await getContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config, allTickets } = ctx

  const body = await c.req.json().catch(() => ({})) as { model?: string }
  const model = body.model ?? OLLAMA_MODEL

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

  const prompt = LLM_PROMPT_TEMPLATE
    .replace('{project_key}', imp.project_key)
    .replace('{ticket_count}', String(allTickets.length))
    .replace('{completed_count}', String(cycleTimes.length))
    .replace('{date_from}', dateFrom)
    .replace('{date_to}', dateTo)
    .replace('{cycle_start}', config.cycle_time_start_status)
    .replace('{cycle_end}', config.cycle_time_end_status)
    .replace('{cycle_mean}', cycleTimes.length ? String(Math.round(mean(cycleTimes) * 10) / 10) : 'N/A')
    .replace('{cycle_median}', cycleTimes.length ? String(Math.round(median(cycleTimes) * 10) / 10) : 'N/A')
    .replace('{p50}', String(percentiles.p50))
    .replace('{p70}', String(percentiles.p70))
    .replace('{p85}', String(percentiles.p85))
    .replace('{p95}', String(percentiles.p95))
    .replace('{lead_mean}', leadTimes.length ? String(Math.round(mean(leadTimes) * 10) / 10) : 'N/A')
    .replace('{lead_median}', leadTimes.length ? String(Math.round(median(leadTimes) * 10) / 10) : 'N/A')
    .replace('{slow_tickets_formatted}', slowest.map(([ct, id]) => `  ${id}: ${Math.round(ct * 10) / 10} days`).join('\n'))

  let insightText: string
  try {
    const resp = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false }),
      signal: AbortSignal.timeout(120000),
    })
    if (!resp.ok) return c.json({ data: null, error: 'Ollama not available' }, 503)
    const data = await resp.json() as { response?: string }
    insightText = data.response ?? ''
  } catch {
    return c.json({ data: null, error: 'Ollama not available' }, 503)
  }

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
  const ctx = await getContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config, allTickets } = ctx

  const body = await c.req.json() as { messages: { role: string; content: string }[]; model?: string }
  const model = body.model ?? OLLAMA_MODEL

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

  const systemPrompt = `You are a flow analysis expert for software development teams.
You have access to the following data for project ${imp.project_key}:

TICKETS: ${allTickets.length} total, ${cycleTimes.length} completed
CYCLE TIME (${config.cycle_time_start_status} → ${config.cycle_time_end_status}):
  Median: ${cycleTimes.length ? Math.round(median(cycleTimes) * 10) / 10 : 'N/A'} days
  P50: ${percentiles.p50} | P70: ${percentiles.p70} | P85: ${percentiles.p85} | P95: ${percentiles.p95} days
LEAD TIME: Median ${leadTimes.length ? Math.round(median(leadTimes) * 10) / 10 : 'N/A'} days
TOP 5 SLOWEST: ${slowest.map(([ct, id]) => `${id} (${Math.round(ct * 10) / 10}d)`).join(', ')}

Answer questions about this data concisely and specifically. Use numbers from the data above.`

  const messages = [{ role: 'system', content: systemPrompt }, ...body.messages]

  let reply: string
  try {
    const resp = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: false }),
      signal: AbortSignal.timeout(120000),
    })
    if (!resp.ok) return c.json({ data: null, error: 'Ollama not available' }, 503)
    const data = await resp.json() as { message?: { content?: string } }
    reply = data.message?.content ?? ''
  } catch {
    return c.json({ data: null, error: 'Ollama not available' }, 503)
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
