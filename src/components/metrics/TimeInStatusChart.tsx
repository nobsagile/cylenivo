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
import type { TimeInStatusResponse, MetricsSummary } from '@/types'
import { ChartTooltip } from './ChartTooltip'
import { Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

export const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

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
            {avgData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface BreakdownProps {
  timeInStatusData: TimeInStatusResponse
}

export function PerTicketBreakdownChart({ timeInStatusData }: BreakdownProps) {
  const { statuses } = timeInStatusData
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
          {statuses.map((status, i) => (
            <Bar key={status} dataKey={status} stackId="a" fill={COLORS[i % COLORS.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
