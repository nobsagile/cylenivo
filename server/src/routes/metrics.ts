import { Hono } from 'hono'
import { ok } from '../lib/response.js'
import { calculateTimeInStatus } from '../analyzers/timeInStatus.js'
import { trimTransitionsToCycleWindow } from '../analyzers/utils.js'
import { loadImportContext } from '../lib/context.js'
import { computeAggregate, buildStatsResponse } from '../lib/aggregate.js'
import { aggregateRework } from '../analyzers/rework.js'
import { computeWeeklyBuckets, computeWeeklyThroughput, simulateHowMany, simulateWhen, percentileFromSorted, buildHistogram } from '../analyzers/monteCarlo.js'
import { computeCFD } from '../analyzers/cfd.js'
import { mean, median } from '../lib/stats.js'

const metrics = new Hono()

metrics.get('/:importId/summary', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const agg = computeAggregate(ctx)

  return c.json(ok({
    import_id: ctx.imp.id,
    project_key: ctx.imp.project_key,
    ticket_count: ctx.tickets.length,
    completed_ticket_count: agg.cycleTimes.length,
    date_range: agg.dateRange,
    cycle_time: buildStatsResponse(agg.cycleTimes, agg.cycleTimePercentiles),
    lead_time: buildStatsResponse(agg.leadTimes, agg.leadTimePercentiles),
    time_in_status: agg.timeInStatus,
    throughput_per_week: agg.throughput,
    config_context: {
      status_order: ctx.config.status_order,
      cycle_time_start_status: ctx.config.cycle_time_start_status,
      cycle_time_end_status: ctx.config.cycle_time_end_status,
      cycle_time_mode: ctx.config.cycle_time_mode,
      lead_time_start_status: ctx.config.lead_time_start_status,
      lead_time_end_status: ctx.config.lead_time_end_status,
    },
  }))
})

metrics.get('/:importId/cycle-times', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const result = ctx.tickets
    .filter(t => t.cycle_time_days !== null && t.completed_at !== null)
    .map(t => ({
      id: t.id,
      external_id: t.external_id,
      title: t.title,
      cycle_time_days: Math.round(t.cycle_time_days! * 100) / 100,
      completed_at: t.completed_at!.toISOString(),
      external_link: t.external_link,
    }))

  return c.json(ok({ tickets: result }))
})

metrics.get('/:importId/lead-times', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const tickets = ctx.tickets
    .filter(t => t.lead_time_days !== null && t.completed_at !== null)
    .map(t => ({
      id: t.id,
      external_id: t.external_id,
      title: t.title,
      lead_time_days: Math.round(t.lead_time_days! * 100) / 100,
      completed_at: t.completed_at!.toISOString(),
      external_link: t.external_link,
    }))

  const values = tickets.map(t => t.lead_time_days)

  return c.json(ok({ values, tickets }))
})

metrics.get('/:importId/time-in-status', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const { config, cycleStatuses } = ctx

  const result = ctx.tickets
    .filter(t => t.cycle_time_days !== null)
    .map(t => ({
      id: t.id,
      external_id: t.external_id,
      title: t.title,
      status_durations: Object.fromEntries(
        Object.entries(calculateTimeInStatus(
          trimTransitionsToCycleWindow(
            t.transitions,
            config.cycle_time_start_status,
            config.cycle_time_end_status,
            config.cycle_time_mode,
          ),
          cycleStatuses,
        )).map(([s, d]) => [s, Math.round(d * 100) / 100])
      ),
    }))

  return c.json(ok({ statuses: cycleStatuses, tickets: result }))
})

metrics.get('/:importId/rework', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const result = aggregateRework(ctx.tickets, ctx.config.status_order)
  return c.json(ok(result))
})

metrics.get('/:importId/cycle-time-by-type', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const completed = ctx.tickets.filter(t => t.cycle_time_days !== null)
  const groups = new Map<string, number[]>()

  for (const t of completed) {
    const type = t.ticket_type || 'Unknown'
    if (!groups.has(type)) groups.set(type, [])
    groups.get(type)!.push(t.cycle_time_days!)
  }

  const types = [...groups.entries()].map(([type, values]) => {
    const sorted = [...values].sort((a, b) => a - b)
    const count = sorted.length
    const m = mean(sorted)
    const med = median(sorted)
    const p85idx = Math.ceil(count * 0.85) - 1
    const p85 = sorted[Math.min(p85idx, count - 1)]
    return {
      type,
      count,
      mean: Math.round(m * 100) / 100,
      median: Math.round(med * 100) / 100,
      p85: Math.round(p85 * 100) / 100,
    }
  }).sort((a, b) => b.count - a.count)

  return c.json(ok({ types }))
})

metrics.get('/:importId/throughput', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const agg = computeAggregate(ctx)
  const weeks = computeWeeklyThroughput(agg.completedAtDates)
  return c.json(ok({ weeks }))
})

metrics.get('/:importId/cfd', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const result = computeCFD(ctx.tickets, ctx.config.status_order)
  return c.json(ok(result))
})

metrics.get('/:importId/forecast', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const mode = c.req.query('mode') as 'how_many' | 'when'
  const value = parseInt(c.req.query('value') ?? '0', 10)
  if ((mode !== 'how_many' && mode !== 'when') || !value || value < 1) {
    return c.json({ data: null, error: 'Invalid mode or value' }, 400)
  }
  if (value > 10000) {
    return c.json({ data: null, error: 'value must be ≤ 10000' }, 422)
  }

  const agg = computeAggregate(ctx)
  const buckets = computeWeeklyBuckets(agg.completedAtDates)

  if (buckets.length === 0) {
    return c.json({ data: null, error: 'No completed tickets to simulate from' }, 422)
  }

  const sorted = mode === 'how_many'
    ? simulateHowMany(buckets, value)
    : simulateWhen(buckets, value)

  return c.json(ok({
    mode,
    value,
    // how_many: "at least X tickets with Y% confidence" → use lower tail (inverted)
    // when:     "within X weeks Y% of the time"         → use upper tail (normal)
    p50: percentileFromSorted(sorted, 50),
    p85: mode === 'how_many' ? percentileFromSorted(sorted, 15) : percentileFromSorted(sorted, 85),
    p95: mode === 'how_many' ? percentileFromSorted(sorted, 5)  : percentileFromSorted(sorted, 95),
    histogram: buildHistogram(sorted),
    weeks_of_data: buckets.length,
    weeks_with_completions: buckets.filter(b => b > 0).length,
    total_completed: agg.completedAtDates.length,
  }))
})

export default metrics
