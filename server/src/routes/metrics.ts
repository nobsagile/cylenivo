import { Hono } from 'hono'
import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { mean, median } from '../lib/stats.js'
import { calculateCycleTime, type CycleTimeMode } from '../analyzers/cycleTime.js'
import { calculateLeadTime } from '../analyzers/leadTime.js'
import { calculatePercentiles, calculateThroughputPerWeek } from '../analyzers/percentiles.js'
import { calculateTimeInStatus } from '../analyzers/timeInStatus.js'
import { firstTransitionTo, lastTransitionTo, trimTransitionsToCycleWindow, type Transition } from '../analyzers/utils.js'

const metrics = new Hono()

async function getImportWithConfig(importId: string) {
  const impRows = await db.select().from(importSessions).where(eq(importSessions.id, importId))
  if (!impRows.length) return null
  const imp = impRows[0]
  const cfgRows = await db.select().from(projectConfigs).where(eq(projectConfigs.id, imp.config_id))
  if (!cfgRows.length) return null
  const config = {
    ...cfgRows[0],
    status_order: JSON.parse(cfgRows[0].status_order) as string[],
    cycle_time_mode: (cfgRows[0].cycle_time_mode ?? 'first_last') as CycleTimeMode,
  }
  return { imp, config }
}

async function getTicketsWithTransitions(importId: string) {
  const ticketRows = await db.select().from(tickets).where(eq(tickets.import_id, importId))
  if (!ticketRows.length) return []

  const ticketIds = ticketRows.map(t => t.id)
  const transRows = await db.select().from(ticketTransitions).where(inArray(ticketTransitions.ticket_id, ticketIds))

  const transMap: Record<string, Transition[]> = {}
  for (const tr of transRows) {
    if (!transMap[tr.ticket_id]) transMap[tr.ticket_id] = []
    transMap[tr.ticket_id].push({
      from_status: tr.from_status,
      to_status: tr.to_status,
      transitioned_at: tr.transitioned_at,
    })
  }

  return ticketRows.map(t => ({ ...t, transitions: transMap[t.id] ?? [] }))
}

metrics.get('/:importId/summary', async (c) => {
  const ctx = await getImportWithConfig(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config } = ctx
  const allTickets = await getTicketsWithTransitions(imp.id)

  const cycleTimes: number[] = []
  const leadTimes: number[] = []
  const completedAtDates: Date[] = []

  for (const ticket of allTickets) {
    const ct = calculateCycleTime(ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status, config.cycle_time_mode)
    if (ct !== null) {
      cycleTimes.push(ct)
      const endTs = config.cycle_time_mode === 'first_first'
        ? firstTransitionTo(ticket.transitions, config.cycle_time_end_status)
        : lastTransitionTo(ticket.transitions, config.cycle_time_end_status)
      if (endTs) completedAtDates.push(endTs)
    }
    const lt = calculateLeadTime(
      new Date(ticket.created_at),
      ticket.transitions,
      config.cycle_time_end_status,
      config.lead_time_start_status,
      config.cycle_time_mode,
    )
    if (lt !== null) leadTimes.push(lt)
  }

  const ctPercentiles = calculatePercentiles(cycleTimes)
  const ltPercentiles = calculatePercentiles(leadTimes)

  const buildStats = (times: number[], percentiles: ReturnType<typeof calculatePercentiles>) => ({
    mean_days: times.length ? Math.round(mean(times) * 100) / 100 : null,
    median_days: times.length ? (() => { const s = [...times].sort((a, b) => a - b); return s[Math.floor(s.length * 50 / 100)] })() : null,
    p50: percentiles.p50,
    p70: percentiles.p70,
    p85: percentiles.p85,
    p95: percentiles.p95,
    sample_size: percentiles.sample_size,
    warning: percentiles.warning,
  })

  const timeInStatusByStatus: Record<string, number[]> = {}
  for (const s of config.status_order) timeInStatusByStatus[s] = []

  for (const ticket of allTickets) {
    const windowed = trimTransitionsToCycleWindow(ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status)
    const durations = calculateTimeInStatus(windowed, config.status_order)
    for (const [status, days] of Object.entries(durations)) {
      timeInStatusByStatus[status].push(days)
    }
  }

  const timeInStatusSummary: Record<string, { mean_days: number; median_days: number }> = {}
  for (const [status, vals] of Object.entries(timeInStatusByStatus)) {
    timeInStatusSummary[status] = {
      mean_days: vals.length ? Math.round(mean(vals) * 100) / 100 : 0,
      median_days: vals.length ? Math.round(median(vals) * 100) / 100 : 0,
    }
  }

  return c.json(ok({
    import_id: imp.id,
    project_key: imp.project_key,
    ticket_count: allTickets.length,
    completed_ticket_count: cycleTimes.length,
    date_range: {
      from: completedAtDates.length ? completedAtDates.reduce((a, b) => a < b ? a : b).toISOString() : null,
      to: completedAtDates.length ? completedAtDates.reduce((a, b) => a > b ? a : b).toISOString() : null,
    },
    cycle_time: buildStats(cycleTimes, ctPercentiles),
    lead_time: buildStats(leadTimes, ltPercentiles),
    time_in_status: timeInStatusSummary,
    throughput_per_week: calculateThroughputPerWeek(completedAtDates),
  }))
})

metrics.get('/:importId/cycle-times', async (c) => {
  const ctx = await getImportWithConfig(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config } = ctx
  const allTickets = await getTicketsWithTransitions(imp.id)

  const result = []
  for (const ticket of allTickets) {
    const ct = calculateCycleTime(ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status, config.cycle_time_mode)
    if (ct === null) continue
    const endTs = firstTransitionTo(ticket.transitions, config.cycle_time_end_status)
    result.push({
      external_id: ticket.external_id,
      title: ticket.title,
      cycle_time_days: Math.round(ct * 100) / 100,
      completed_at: endTs!.toISOString(),
      external_link: ticket.external_link,
    })
  }
  return c.json(ok({ tickets: result }))
})

metrics.get('/:importId/lead-times', async (c) => {
  const ctx = await getImportWithConfig(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config } = ctx
  const allTickets = await getTicketsWithTransitions(imp.id)

  const values: number[] = []
  for (const ticket of allTickets) {
    const lt = calculateLeadTime(
      new Date(ticket.created_at),
      ticket.transitions,
      config.cycle_time_end_status,
      config.lead_time_start_status,
      config.cycle_time_mode,
    )
    if (lt !== null) values.push(Math.round(lt * 100) / 100)
  }
  return c.json(ok({ values }))
})

metrics.get('/:importId/time-in-status', async (c) => {
  const ctx = await getImportWithConfig(c.req.param('importId'))
  if (!ctx) return c.json({ data: null, error: 'Import not found' }, 404)
  const { imp, config } = ctx
  const allTickets = await getTicketsWithTransitions(imp.id)

  const result = allTickets.map(ticket => ({
    external_id: ticket.external_id,
    title: ticket.title,
    status_durations: Object.fromEntries(
      Object.entries(calculateTimeInStatus(
        trimTransitionsToCycleWindow(ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status),
        config.status_order,
      )).map(([s, d]) => [s, Math.round(d * 100) / 100])
    ),
  }))

  return c.json(ok({ statuses: config.status_order, tickets: result }))
})

export default metrics
