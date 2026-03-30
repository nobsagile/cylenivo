import { calculatePercentiles, calculateThroughputPerWeek, type PercentileResult } from '../analyzers/percentiles.js'
import { calculateTimeInStatus } from '../analyzers/timeInStatus.js'
import { trimTransitionsToCycleWindow } from '../analyzers/utils.js'
import { mean, median } from './stats.js'
import type { ImportContext, EnrichedTicket } from './context.js'

export type { PercentileResult }

export interface MetricsAggregate {
  cycleTimes: number[]
  leadTimes: number[]
  completedAtDates: Date[]
  cycleTimePercentiles: PercentileResult
  leadTimePercentiles: PercentileResult
  throughput: number
  dateRange: { from: string | null; to: string | null }
  timeInStatus: Record<string, { mean_days: number; median_days: number }>
  completedTickets: EnrichedTicket[]
}

export function computeAggregate(ctx: ImportContext): MetricsAggregate {
  const { config, tickets, cycleStatuses } = ctx

  const completedTickets = tickets.filter(t => t.cycle_time_days !== null)
  const cycleTimes = completedTickets.map(t => t.cycle_time_days!)
  const leadTimes = tickets.filter(t => t.lead_time_days !== null).map(t => t.lead_time_days!)
  const completedAtDates = completedTickets
    .filter(t => t.completed_at !== null)
    .map(t => t.completed_at!)

  const cycleTimePercentiles = calculatePercentiles(cycleTimes)
  const leadTimePercentiles = calculatePercentiles(leadTimes)
  const throughput = calculateThroughputPerWeek(completedAtDates)

  const dateRange = {
    from: completedAtDates.length
      ? completedAtDates.reduce((a, b) => a < b ? a : b).toISOString()
      : null,
    to: completedAtDates.length
      ? completedAtDates.reduce((a, b) => a > b ? a : b).toISOString()
      : null,
  }

  // Time in status: aggregate across completed tickets, cycle window only, zeros excluded
  const timeInStatusByStatus: Record<string, number[]> = {}
  for (const s of cycleStatuses) timeInStatusByStatus[s] = []

  for (const ticket of completedTickets) {
    const windowed = trimTransitionsToCycleWindow(
      ticket.transitions,
      config.cycle_time_start_status,
      config.cycle_time_end_status,
      config.cycle_time_mode,
    )
    const durations = calculateTimeInStatus(windowed, cycleStatuses)
    for (const [status, days] of Object.entries(durations)) {
      if (days > 0) timeInStatusByStatus[status].push(days)
    }
  }

  const timeInStatus: Record<string, { mean_days: number; median_days: number }> = {}
  for (const [status, vals] of Object.entries(timeInStatusByStatus)) {
    timeInStatus[status] = {
      mean_days: vals.length ? Math.round(mean(vals) * 100) / 100 : 0,
      median_days: vals.length ? Math.round(median(vals) * 100) / 100 : 0,
    }
  }

  return {
    cycleTimes,
    leadTimes,
    completedAtDates,
    cycleTimePercentiles,
    leadTimePercentiles,
    throughput,
    dateRange,
    timeInStatus,
    completedTickets,
  }
}

/** Build the cycle_time / lead_time response shape for /summary.
 *  Shows mean/median even with small samples; p50-p95 are null below threshold. */
export function buildStatsResponse(times: number[], percentiles: PercentileResult) {
  return {
    mean_days: times.length ? Math.round(mean(times) * 100) / 100 : null,
    median_days: times.length ? Math.round(median(times) * 100) / 100 : null,
    p50: percentiles.p50,
    p70: percentiles.p70,
    p85: percentiles.p85,
    p95: percentiles.p95,
    sample_size: percentiles.sample_size,
    warning: percentiles.warning,
  }
}
