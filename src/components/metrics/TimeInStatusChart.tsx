import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import type { TimeInStatusResponse, MetricsSummary, ConfigContext } from '@/types'
import { ChartTooltip } from './ChartTooltip'
import { Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

// Hex gradients matching design system (light → dark)
const LEAD_COLORS = ['#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa']   // violet-100→400
const CYCLE_COLORS = ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6']  // teal-200→500
const OVERLAP_COLORS = ['#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'] // indigo-300→600
const FALLBACK_COLORS = ['#94a3b8', '#64748b', '#475569', '#334155'] // slate

function buildStatusColors(statuses: string[], config: ConfigContext | null | undefined): Record<string, string> {
  if (!config) return Object.fromEntries(statuses.map((s, i) => [s, FALLBACK_COLORS[i % FALLBACK_COLORS.length]]))

  const { status_order, cycle_time_start_status, cycle_time_end_status, lead_time_start_status, lead_time_end_status } = config
  const cycleStart = status_order.indexOf(cycle_time_start_status)
  const cycleEnd = status_order.indexOf(cycle_time_end_status)
  const leadEnd = status_order.indexOf(lead_time_end_status ?? cycle_time_end_status)
  const leadStart = lead_time_start_status ? status_order.indexOf(lead_time_start_status) : -1

  const inCycle = (s: string) => { const i = status_order.indexOf(s); return i >= cycleStart && i <= cycleEnd }
  const inLead = (s: string) => { const i = status_order.indexOf(s); return (lead_time_start_status ? i >= leadStart : true) && i <= leadEnd }

  const groups = { lead: [] as string[], cycle: [] as string[], overlap: [] as string[] }
  for (const s of statuses) {
    if (inCycle(s) && inLead(s)) groups.overlap.push(s)
    else if (inCycle(s)) groups.cycle.push(s)
    else groups.lead.push(s)
  }

  function pick(arr: string[], group: string[], status: string) {
    const pos = group.indexOf(status)
    const idx = group.length <= 1 ? 0 : Math.round((pos / (group.length - 1)) * (arr.length - 1))
    return arr[Math.max(0, Math.min(idx, arr.length - 1))]
  }

  return Object.fromEntries(statuses.map(s => {
    if (inCycle(s) && inLead(s)) return [s, pick(OVERLAP_COLORS, groups.overlap, s)]
    if (inCycle(s)) return [s, pick(CYCLE_COLORS, groups.cycle, s)]
    return [s, pick(LEAD_COLORS, groups.lead, s)]
  }))
}

function AvgTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const color = (payload[0].fill ?? payload[0].color) as string
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p className="font-medium" style={{ color }}>{Number(payload[0].value).toFixed(1)} days</p>
    </ChartTooltip>
  )
}

function StackedTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const entries = payload.filter((p) => (p.value as number) > 0)
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1.5">{label}</p>
      {entries.map((p) => (
        <div key={p.dataKey} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.dataKey}</span>
          <span className="font-medium text-gray-700">{Number(p.value).toFixed(1)} d</span>
        </div>
      ))}
    </ChartTooltip>
  )
}

interface AvgProps {
  timeInStatusData: TimeInStatusResponse
  summary: MetricsSummary
}

export function AvgTimeInStatusChart({ timeInStatusData, summary }: AvgProps) {
  const { t } = useTranslation()
  const { statuses } = timeInStatusData
  const colors = buildStatusColors(statuses, summary.config_context)

  const avgData = statuses.map((status) => ({
    status,
    days: summary.time_in_status[status]?.mean_days ?? 0,
  }))

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{t('metrics.cycleTime')} – Avg Time in Status</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Average per status within the cycle window ({statuses[0]} → {statuses[statuses.length - 1]}).
            Only analyzed tickets included.
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 shrink-0">
              <Info className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="font-semibold text-gray-800 mb-2">How to read this chart</p>
            <div className="space-y-2 text-xs text-gray-600">
              <p>Shows the average time each ticket spent in a status <span className="font-medium">during its cycle</span> — from entry into <span className="font-medium">{statuses[0]}</span> to last entry into <span className="font-medium">{statuses[statuses.length - 1]}</span>.</p>
              <p>Only statuses within this window are shown. Tickets that did not complete the cycle are excluded.</p>
              <p>If <span className="font-medium">{statuses[statuses.length - 1]}</span> shows a value &gt; 0, some tickets returned from {statuses[statuses.length - 1]} to an earlier status (rework) before completing.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={avgData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 11 }} unit=" d" />
          <YAxis dataKey="status" type="category" tick={{ fontSize: 11 }} width={150} />
          <Tooltip content={<AvgTooltip />} wrapperStyle={{ zIndex: 100 }} />
          <Bar dataKey="days">
            {avgData.map((entry) => (
              <Cell key={entry.status} fill={colors[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface BreakdownProps {
  timeInStatusData: TimeInStatusResponse
  config?: ConfigContext | null
}

export function PerTicketBreakdownChart({ timeInStatusData, config }: BreakdownProps) {
  const { statuses } = timeInStatusData
  const colors = buildStatusColors(statuses, config)
  const last30 = timeInStatusData.tickets.slice(-30)

  if (!last30.length) return null

  const stackedData = last30.map((ticket) => ({
    name: ticket.external_id,
    ...Object.fromEntries(statuses.map((s) => [s, ticket.status_durations[s] ?? 0])),
  }))

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Per-Ticket Breakdown (last 30)</h3>
      <p className="text-xs text-gray-400 mb-3">Time per status for each completed ticket, sorted by completion date.</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={stackedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 11 }} unit=" d" />
          <Tooltip content={<StackedTooltip />} wrapperStyle={{ zIndex: 100 }} />
          {statuses.map((status) => (
            <Bar key={status} dataKey={status} stackId="a" fill={colors[status]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


export function TimeInStatusChart({ timeInStatusData, summary }: AvgProps) {
  return (
    <>
      <AvgTimeInStatusChart timeInStatusData={timeInStatusData} summary={summary} />
      <PerTicketBreakdownChart timeInStatusData={timeInStatusData} config={summary.config_context} />
    </>
  )
}
