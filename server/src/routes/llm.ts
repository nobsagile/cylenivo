import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { llmInsights, llmConfig, type LlmConfigRow } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { mean, median } from '../lib/stats.js'
import { loadImportContext } from '../lib/context.js'
import { computeAggregate } from '../lib/aggregate.js'
import { aggregateRework } from '../analyzers/rework.js'
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
      body: JSON.stringify({ model: config.model, messages, stream: true }),
      signal: AbortSignal.timeout(600000),
    })
    if (!resp.ok) throw new Error('LLM not available')
    // Collect streamed chunks — keeps connection alive while model is thinking
    const reader = resp.body!.getReader()
    const decoder = new TextDecoder()
    let content = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      for (const line of decoder.decode(value).split('\n')) {
        if (!line.trim()) continue
        try {
          const chunk = JSON.parse(line) as { message?: { content?: string }; done?: boolean }
          content += chunk.message?.content ?? ''
          if (chunk.done) break
        } catch { /* incomplete JSON line, skip */ }
      }
    }
    return content
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

async function* callLLMStream(
  config: LlmConfigRow,
  messages: { role: string; content: string }[],
): AsyncGenerator<string> {
  if (config.provider === 'ollama') {
    const baseUrl = config.base_url ?? 'http://localhost:11434'
    const resp = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: config.model, messages, stream: true }),
      signal: AbortSignal.timeout(600000),
    })
    if (!resp.ok) throw new Error('LLM not available')
    const reader = resp.body!.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      for (const line of decoder.decode(value).split('\n')) {
        if (!line.trim()) continue
        try {
          const chunk = JSON.parse(line) as { message?: { content?: string }; done?: boolean }
          if (chunk.message?.content) yield chunk.message.content
          if (chunk.done) return
        } catch { /* incomplete line */ }
      }
    }
  } else {
    const baseUrl = config.provider === 'openai'
      ? 'https://api.openai.com'
      : (config.base_url ?? '')
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (config.api_key) headers['Authorization'] = `Bearer ${config.api_key}`
    const resp = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model: config.model, messages, stream: true }),
      signal: AbortSignal.timeout(600000),
    })
    if (!resp.ok) throw new Error('LLM not available')
    const reader = resp.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        const raw = line.slice(5).trim()
        if (raw === '[DONE]') return
        try {
          const chunk = JSON.parse(raw) as { choices?: { delta?: { content?: string } }[] }
          const content = chunk.choices?.[0]?.delta?.content
          if (content) yield content
        } catch { /* skip */ }
      }
    }
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
  const { cycleTimes, leadTimes, cycleTimePercentiles, leadTimePercentiles, throughput, dateRange, timeInStatus, flowEfficiency, completedTickets } = agg

  const excludedCount = ctx.tickets.filter(t => t.excluded).length
  const dateFrom = dateRange.from ? dateRange.from.slice(0, 10) : 'N/A'
  const dateTo = dateRange.to ? dateRange.to.slice(0, 10) : 'N/A'

  // Rework
  const rework = aggregateRework(completedTickets, ctx.config.status_order)
  const reworkPct = completedTickets.length ? Math.round((rework.tickets_with_rework / completedTickets.length) * 100) : 0
  const topReworkPaths = rework.rework_paths.slice(0, 3).map(p => `  ${p.from} → ${p.to}: ${p.count}x`).join('\n')
  const reworkLine = rework.tickets_with_rework > 0
    ? `${rework.tickets_with_rework} of ${completedTickets.length} completed tickets (${reworkPct}%) had rework\n  Avg cycle WITH rework: ${rework.avg_cycle_with_rework}d vs WITHOUT: ${rework.avg_cycle_without_rework}d\n  Top rework paths:\n${topReworkPaths}`
    : `No rework detected`

  // Flow efficiency
  const feLine = flowEfficiency
    ? `Mean: ${flowEfficiency.mean}% | Median: ${flowEfficiency.median}% (active work time / total cycle time)`
    : `Not configured (no active statuses defined)`

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

  // Time in status — sorted by mean desc so bottlenecks are obvious
  const tisLines = Object.entries(timeInStatus)
    .sort((a, b) => b[1].mean_days - a[1].mean_days)
    .map(([s, v]) => `  ${s}: avg ${v.mean_days}d, median ${v.median_days}d`)
    .join('\n')

  // Top 5 slowest
  const slowest = [...completedTickets]
    .sort((a, b) => b.cycle_time_days! - a.cycle_time_days!)
    .slice(0, 5)
    .map(t => `  ${t.external_id} [${t.ticket_type}]: ${Math.round(t.cycle_time_days! * 10) / 10}d — ${t.title}`)
    .join('\n')

  const userContent = `PROJECT: ${imp.project_key}
DATASET: ${ctx.tickets.length} total tickets, ${completedTickets.length} completed, ${excludedCount} excluded
DATE RANGE: ${dateFrom} to ${dateTo}
THROUGHPUT: ${throughput != null ? `${Math.round(throughput * 10) / 10} tickets/week` : 'n/a (date range < 7 days)'}

CYCLE TIME (from "${ctx.config.cycle_time_start_status}" to "${ctx.config.cycle_time_end_status}", measurement mode: ${ctx.config.cycle_time_mode}):
  Mean: ${cycleTimes.length ? Math.round(mean(cycleTimes) * 10) / 10 : 'N/A'} days | Median: ${cycleTimes.length ? Math.round(median(cycleTimes) * 10) / 10 : 'N/A'} days
  P50: ${cycleTimePercentiles.p50 ?? 'N/A'}d | P70: ${cycleTimePercentiles.p70 ?? 'N/A'}d | P85: ${cycleTimePercentiles.p85 ?? 'N/A'}d | P95: ${cycleTimePercentiles.p95 ?? 'N/A'}d
  Sample size: ${cycleTimes.length}

LEAD TIME (from ticket creation to "${ctx.config.cycle_time_end_status}"):
  Mean: ${leadTimes.length ? Math.round(mean(leadTimes) * 10) / 10 : 'N/A'} days | Median: ${leadTimes.length ? Math.round(median(leadTimes) * 10) / 10 : 'N/A'} days
  P85: ${leadTimePercentiles.p85 ?? 'N/A'}d | P95: ${leadTimePercentiles.p95 ?? 'N/A'}d

FLOW EFFICIENCY:
  ${feLine}

REWORK:
  ${reworkLine}

AVERAGE TIME IN STATUS (completed tickets, cycle window only, sorted by avg desc):
${tisLines || '  (no data)'}

CYCLE TIME BY TICKET TYPE:
${typeLines || '  (no data)'}

TOP 5 SLOWEST TICKETS (by cycle time):
${slowest || '  (no data)'}

Provide your analysis in clear sections. Identify the most significant flow problems and what is likely causing them. Be direct — use the numbers above.`

  const systemPrompt = DEFAULT_SYSTEM_PROMPT
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent },
  ]

  const model = cfg.model
  const importId = imp.id

  return streamSSE(c, async (stream) => {
    let insightText = ''
    try {
      for await (const token of callLLMStream(cfg, messages)) {
        insightText += token
        await stream.writeSSE({ data: JSON.stringify({ type: 'token', content: token }) })
      }
      const now = new Date().toISOString()
      await db.transaction(async (tx) => {
        const existing = await tx.select().from(llmInsights).where(eq(llmInsights.import_id, importId))
        if (existing.length) {
          await tx.update(llmInsights)
            .set({ insight_text: insightText, model_used: model, generated_at: now })
            .where(eq(llmInsights.import_id, importId))
        } else {
          await tx.insert(llmInsights).values({
            id: crypto.randomUUID(),
            import_id: importId,
            model_used: model,
            insight_text: insightText,
            generated_at: now,
          })
        }
      })
      await stream.writeSSE({ data: JSON.stringify({ type: 'done', insight_text: insightText, model_used: model, generated_at: now }) })
    } catch (e) {
      await stream.writeSSE({ data: JSON.stringify({ type: 'error', message: e instanceof Error ? e.message : 'LLM not available' }) })
    }
  })
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

  const systemPrompt = DEFAULT_SYSTEM_PROMPT + '\n\n' + dataContext
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
