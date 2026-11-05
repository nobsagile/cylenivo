/**
 * MCP tools — a thin layer like routes/: load context → aggregate → format.
 * Same rules as routes: no metric calculation here, everything goes through
 * loadImportContext / computeAggregate / analyzers.
 *
 * Read-only by design. Tools touch import_sessions, project_configs, tickets
 * and transitions only — never source_connections or llm_config (tokens).
 *
 * Written for small local models as much as for Claude: few tools, flat and
 * optional parameters, compact output with the unit in every field name.
 */
import { desc, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { importSessions, projectConfigs } from '../db/schema.js'
import { loadImportContext, type ImportContext, type EnrichedTicket } from '../lib/context.js'
import { computeAggregate, buildStatsResponse } from '../lib/aggregate.js'
import { filterTickets, type MetricFilter } from '../lib/filter.js'
import { aggregateRework, detectRework } from '../analyzers/rework.js'
import { runForecast } from '../analyzers/monteCarlo.js'
import { workItemAgeDays } from '../analyzers/age.js'
import { ToolError, type ToolDef, type JsonSchemaProp } from './protocol.js'

const r2 = (x: number | null | undefined) => (x === null || x === undefined ? null : Math.round(x * 100) / 100)
const day = (d: Date | null | undefined) => (d ? d.toISOString().slice(0, 10) : null)

const DATASET_PROP: JsonSchemaProp = {
  type: 'string',
  description: 'Dataset id from list_datasets. Omit to use the most recently imported dataset.',
}
const FILTER_PROPS: Record<string, JsonSchemaProp> = {
  from: { type: 'string', description: 'Only tickets completed on or after this date (YYYY-MM-DD).' },
  to: { type: 'string', description: 'Only tickets completed on or before this date (YYYY-MM-DD).' },
  last: { type: 'integer', minimum: 1, maximum: 100000, description: 'Only the N most recently completed tickets. Do not combine with from/to.' },
}

async function resolveDataset(args: Record<string, unknown>): Promise<ImportContext> {
  let id = args.dataset_id as string | undefined
  if (!id) {
    const latest = await db.select({ id: importSessions.id }).from(importSessions)
      .orderBy(desc(importSessions.imported_at)).limit(1)
    if (!latest.length) throw new ToolError('No datasets yet. Import data in the Cylenivo app first.')
    id = latest[0].id
  }
  const ctx = await loadImportContext(id)
  if (!ctx) throw new ToolError(`Dataset "${id}" not found. Call list_datasets for valid ids.`)
  return ctx
}

function applyFilter(ctx: ImportContext, args: Record<string, unknown>): MetricFilter {
  const f = filterTickets(ctx.tickets, {
    from: args.from as string | undefined,
    to: args.to as string | undefined,
    last: args.last !== undefined ? String(args.last) : undefined,
  })
  if ('error' in f) throw new ToolError(f.error)
  return f
}

function datasetRef(ctx: ImportContext) {
  return { dataset_id: ctx.imp.id, name: ctx.imp.name ?? ctx.imp.file_name, project_key: ctx.imp.project_key }
}

function filterRef(args: Record<string, unknown>) {
  const f: Record<string, unknown> = {}
  for (const k of ['from', 'to', 'last']) if (args[k] !== undefined) f[k] = args[k]
  return Object.keys(f).length ? f : 'all completed tickets'
}

function stats(times: number[], percentiles: ReturnType<typeof computeAggregate>['cycleTimePercentiles']) {
  const s = buildStatsResponse(times, percentiles)
  return {
    mean_days: r2(s.mean_days), median_days: r2(s.median_days),
    p50_days: r2(s.p50), p70_days: r2(s.p70), p85_days: r2(s.p85), p95_days: r2(s.p95),
    sample_size: s.sample_size,
    ...(s.warning ? { warning: s.warning } : {}),
  }
}

const listDatasets: ToolDef = {
  name: 'list_datasets',
  title: 'List datasets',
  description: 'Lists the imported datasets (one per team/project export). Call this first when the user names a team or project, to find its dataset_id.',
  inputSchema: { type: 'object', properties: {} },
  async handler() {
    const rows = await db.select({
      id: importSessions.id,
      name: importSessions.name,
      file_name: importSessions.file_name,
      project_key: importSessions.project_key,
      ticket_count: importSessions.ticket_count,
      imported_at: importSessions.imported_at,
      config_name: projectConfigs.name,
    }).from(importSessions)
      .leftJoin(projectConfigs, eq(importSessions.config_id, projectConfigs.id))
      .orderBy(desc(importSessions.imported_at))
    if (!rows.length) return { datasets: [], hint: 'No datasets yet. Import data in the Cylenivo app first.' }
    return {
      datasets: rows.map((r, i) => ({
        dataset_id: r.id,
        name: r.name ?? r.file_name,
        project_key: r.project_key,
        config: r.config_name,
        tickets: r.ticket_count,
        imported_at: r.imported_at.slice(0, 10),
        ...(i === 0 ? { default: true } : {}),
      })),
    }
  },
}

const getFlowMetrics: ToolDef = {
  name: 'get_flow_metrics',
  title: 'Get flow metrics',
  description: 'Cycle time, lead time, throughput, time in status and flow efficiency for a dataset. Use for questions like "how fast are we", "how long does a ticket take", "where do tickets wait". Percentiles: p85_days = 85% of tickets finished within that many days.',
  inputSchema: { type: 'object', properties: { dataset_id: DATASET_PROP, ...FILTER_PROPS } },
  async handler(args) {
    const ctx = await resolveDataset(args)
    const f = applyFilter(ctx, args)
    const agg = computeAggregate({ ...ctx, tickets: f.tickets })
    const { config } = ctx
    return {
      dataset: datasetRef(ctx),
      filter: filterRef(args),
      definitions: {
        cycle_time: `from "${config.cycle_time_start_status}" to "${config.cycle_time_end_status}"`,
        lead_time: `from ${config.lead_time_start_status ? `"${config.lead_time_start_status}"` : 'ticket creation'} to "${config.lead_time_end_status ?? config.cycle_time_end_status}"`,
        measurement_mode: config.cycle_time_mode,
      },
      tickets_total: ctx.allTickets.length,
      tickets_excluded_by_user: ctx.allTickets.length - ctx.tickets.length,
      tickets_completed: agg.cycleTimes.length,
      tickets_in_progress: ctx.tickets.filter(t => t.cycle_started_at && !t.completed).length,
      completed_between: { from: agg.dateRange.from?.slice(0, 10) ?? null, to: agg.dateRange.to?.slice(0, 10) ?? null },
      cycle_time: stats(agg.cycleTimes, agg.cycleTimePercentiles),
      lead_time: stats(agg.leadTimes, agg.leadTimePercentiles),
      throughput_tickets_per_week: r2(agg.throughput),
      time_in_status: Object.fromEntries(Object.entries(agg.timeInStatus)
        .map(([s, v]) => [s, { mean_days: v.mean_days, median_days: v.median_days }])),
      flow_efficiency_pct: agg.flowEfficiency
        ? { mean: agg.flowEfficiency.mean, median: agg.flowEfficiency.median }
        : null,
    }
  },
}

const getRework: ToolDef = {
  name: 'get_rework',
  title: 'Get rework',
  description: 'How often completed tickets moved backwards on the board (e.g. Review → In Dev), the most common backward paths, and the average cycle time with vs. without rework. Use for quality and retro questions.',
  inputSchema: { type: 'object', properties: { dataset_id: DATASET_PROP, ...FILTER_PROPS } },
  async handler(args) {
    const ctx = await resolveDataset(args)
    const f = applyFilter(ctx, args)
    const r = aggregateRework(f.tickets, ctx.config.status_order, ctx.restart.restartStatuses)
    return {
      dataset: datasetRef(ctx),
      filter: filterRef(args),
      tickets_completed: r.total_completed,
      tickets_with_rework: r.tickets_with_rework,
      rework_pct: r.total_completed ? Math.round((r.tickets_with_rework / r.total_completed) * 100) : null,
      avg_cycle_time_with_rework_days: r.avg_cycle_with_rework,
      avg_cycle_time_without_rework_days: r.avg_cycle_without_rework,
      top_backward_paths: r.rework_paths.slice(0, 10).map(p => ({ from: p.from, to: p.to, times: p.count })),
    }
  },
}

const listTickets: ToolDef = {
  name: 'list_tickets',
  title: 'List tickets',
  description: 'Lists individual tickets. state=completed (default) sorts by longest cycle time — use it to find outliers. state=in_progress sorts by age — use it to find work that is stuck now. from/to/last apply to completed tickets only.',
  inputSchema: {
    type: 'object',
    properties: {
      dataset_id: DATASET_PROP,
      state: { type: 'string', enum: ['completed', 'in_progress', 'all'], description: 'Which tickets. Default: completed.' },
      ticket_type: { type: 'string', description: 'Only this ticket type, e.g. Bug or Story.' },
      limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Max tickets to return. Default 20.' },
      include_excluded: { type: 'boolean', description: 'Also list tickets the user excluded from metrics. Default false.' },
      ...FILTER_PROPS,
    },
  },
  async handler(args) {
    const ctx = await resolveDataset(args)
    const state = (args.state as string | undefined) ?? 'completed'
    const limit = (args.limit as number | undefined) ?? 20
    const pool = args.include_excluded ? ctx.allTickets : ctx.tickets
    const now = new Date()

    let selected: EnrichedTicket[]
    if (state === 'completed') {
      const f = filterTickets(pool, {
        from: args.from as string | undefined,
        to: args.to as string | undefined,
        last: args.last !== undefined ? String(args.last) : undefined,
      })
      if ('error' in f) throw new ToolError(f.error)
      selected = f.tickets.filter(t => t.cycle_time_days !== null)
    } else if (state === 'in_progress') {
      selected = pool.filter(t => t.cycle_started_at && !t.completed)
    } else {
      selected = pool
    }
    if (args.ticket_type) {
      const type = (args.ticket_type as string).toLowerCase()
      selected = selected.filter(t => t.ticket_type.toLowerCase() === type)
    }

    const rows = selected.map(t => ({ t, age: workItemAgeDays(t.cycle_started_at, t.completed, now) }))
    rows.sort((a, b) =>
      (b.t.cycle_time_days ?? b.age ?? -1) - (a.t.cycle_time_days ?? a.age ?? -1)
      || a.t.external_id.localeCompare(b.t.external_id))

    return {
      dataset: datasetRef(ctx),
      state,
      tickets_matching: rows.length,
      tickets_returned: Math.min(limit, rows.length),
      tickets: rows.slice(0, limit).map(({ t, age }) => ({
        key: t.external_id,
        title: t.title.length > 120 ? t.title.slice(0, 117) + '...' : t.title,
        type: t.ticket_type,
        status: t.current_status,
        ...(t.cycle_time_days !== null ? { cycle_time_days: r2(t.cycle_time_days) } : {}),
        ...(t.lead_time_days !== null ? { lead_time_days: r2(t.lead_time_days) } : {}),
        ...(t.completed_at ? { completed: day(t.completed_at) } : {}),
        ...(age !== null ? { age_days: r2(age) } : {}),
        rework_moves: detectRework(t.transitions, ctx.config.status_order, ctx.restart.restartStatuses).backward_moves.length,
        ...(t.excluded ? { excluded: true, exclusion_reason: t.exclusion_reason } : {}),
        ...(t.external_link ? { url: t.external_link } : {}),
      })),
    }
  },
}

const forecast: ToolDef = {
  name: 'forecast',
  title: 'Forecast',
  description: 'Monte Carlo forecast from past weekly throughput. mode=when: how many weeks to finish `value` tickets. mode=how_many: how many tickets get done in `value` weeks. Use for "when will we be done" and "how much fits into the next N weeks".',
  inputSchema: {
    type: 'object',
    properties: {
      mode: { type: 'string', enum: ['when', 'how_many'], description: 'when = weeks for N tickets; how_many = tickets in N weeks.' },
      value: { type: 'integer', minimum: 1, maximum: 10000, description: 'Number of tickets (mode=when) or weeks (mode=how_many).' },
      dataset_id: DATASET_PROP,
      ...FILTER_PROPS,
    },
    required: ['mode', 'value'],
  },
  async handler(args) {
    const ctx = await resolveDataset(args)
    const f = applyFilter(ctx, args)
    const agg = computeAggregate({ ...ctx, tickets: f.tickets })
    const mode = args.mode as 'when' | 'how_many'
    const value = args.value as number
    const r = runForecast(agg.completedAtDates, mode, value, f.weeksFrom)
    if (!r) throw new ToolError('No completed tickets in this selection — nothing to forecast from.')

    const basis = {
      weeks_of_history: r.weeks_of_data,
      weeks_with_completions: r.weeks_with_completions,
      tickets_completed: r.total_completed,
    }
    if (mode === 'when') {
      return {
        dataset: datasetRef(ctx),
        question: `weeks to finish ${value} tickets`,
        weeks_50pct: r.p50,
        weeks_85pct: r.p85,
        weeks_95pct: r.p95,
        interpretation: `85% chance to finish ${value} tickets within ${r.p85} weeks.`,
        ...(r.p95 >= 52 ? { warning: 'Simulation is capped at 52 weeks; the real value may be higher.' } : {}),
        basis,
      }
    }
    return {
      dataset: datasetRef(ctx),
      question: `tickets finished in ${value} weeks`,
      tickets_50pct: r.p50,
      tickets_85pct: r.p85,
      tickets_95pct: r.p95,
      interpretation: `85% chance to finish at least ${r.p85} tickets in ${value} weeks.`,
      basis,
    }
  },
}

export const TOOLS: ToolDef[] = [listDatasets, getFlowMetrics, getRework, listTickets, forecast]

export const SERVER_INSTRUCTIONS = [
  'Cylenivo holds flow metrics computed from a team\'s ticket history (Jira etc.).',
  'Start with list_datasets if the user names a team or project; otherwise the newest dataset is used.',
  'All durations are calendar days. Percentiles need at least 10 completed tickets.',
  'Status names are the team\'s own board columns.',
].join(' ')
