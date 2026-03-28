import { Hono } from 'hono'
import { ok } from '../lib/response.js'
import { calculateTimeInStatus } from '../analyzers/timeInStatus.js'
import { trimTransitionsToCycleWindow } from '../analyzers/utils.js'
import { loadImportContext } from '../lib/context.js'
import { computeAggregate, buildStatsResponse } from '../lib/aggregate.js'

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

  const values = ctx.tickets
    .filter(t => t.lead_time_days !== null)
    .map(t => Math.round(t.lead_time_days! * 100) / 100)

  return c.json(ok({ values }))
})

metrics.get('/:importId/time-in-status', async (c) => {
  const ctx = await loadImportContext(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)

  const { config, cycleStatuses } = ctx

  const result = ctx.tickets
    .filter(t => t.cycle_time_days !== null)
    .map(t => ({
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

export default metrics
