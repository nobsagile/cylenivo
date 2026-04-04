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

import type { TimeInStatusResponse, MetricsSummary, ConfigContext } from '@/types'
import { getConfigIndices, isInCycle, isInLead, pickShade, CYCLE_HEX, LEAD_HEX, FALLBACK_HEX } from '@/lib/statusColors'
import { ChartTooltip } from './ChartTooltip'
import { Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

function buildStatusColors(statuses: string[], config: ConfigContext | null | undefined): Record<string, string> {
  if (!config) return Object.fromEntries(statuses.map((s, i) => [s, FALLBACK_HEX[i % FALLBACK_HEX.length]]))

  const indices = getConfigIndices(config)
  const { status_order } = config

  const inCycle = (s: string) => isInCycle(status_order.indexOf(s), indices)
  const inLead = (s: string) => isInLead(status_order.indexOf(s), indices)

  const cycleAll = statuses.filter(s => inCycle(s))
  const leadOnly = statuses.filter(s => inLead(s) && !inCycle(s))

  return Object.fromEntries(statuses.map(s => {
    if (inCycle(s)) return [s, pickShade([...CYCLE_HEX], cycleAll, s)]
    if (inLead(s)) return [s, pickShade([...LEAD_HEX], leadOnly, s)]
    return [s, FALLBACK_HEX[0]]
  }))
}

function AvgTooltip({ active, payload, label, medians }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; fill?: string; dataKey?: string }>; label?: string; medians?: Record<string, number> }) {
  if (!active || !payload?.length) return null
  const color = (payload[0].fill ?? payload[0].color) as string
  const median = label ? medians?.[label] : undefined
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p className="font-medium" style={{ color }}>{Number(payload[0].value).toFixed(1)} d avg</p>
      {median !== undefined && <p className="text-gray-500 text-xs">{median.toFixed(1)} d median</p>}
    </ChartTooltip>
  )
}

function StackedTooltip({ active, payload, label, titles }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; fill?: string; dataKey?: string }>; label?: string; titles?: Record<string, string> }) {
  if (!active || !payload?.length) return null
  const entries = payload.filter((p) => (p.value as number) > 0)
  const title = label ? titles?.[label] : undefined
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-0.5">{label}</p>
      {title && <p className="text-gray-400 text-xs mb-1.5 max-w-[200px] truncate">{title}</p>}
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
  const medianByStatus = Object.fromEntries(statuses.map(s => [s, summary.time_in_status[s]?.median_days ?? 0]))

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{t('metrics.cycleTime')} – {t('timeInStatus.avgTitle')}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {t('timeInStatus.avgSubtitle', { start: statuses[0], end: statuses[statuses.length - 1] })}
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 shrink-0">
              <Info className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="font-semibold text-gray-800 mb-2">{t('timeInStatus.howToRead')}</p>
            <div className="space-y-2 text-xs text-gray-600">
              <p>{t('timeInStatus.howToReadDesc', { start: statuses[0], end: statuses[statuses.length - 1] })}</p>
              <p>{t('timeInStatus.howToReadExclude')}</p>
              <p>{t('timeInStatus.howToReadRework', { status: statuses[statuses.length - 1] })}</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={avgData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 11 }} unit=" d" />
          <YAxis dataKey="status" type="category" tick={{ fontSize: 11 }} width={150} />
          <Tooltip content={<AvgTooltip medians={medianByStatus} />} wrapperStyle={{ zIndex: 100 }} cursor={false} />
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
  onTicketClick?: (id: string) => void
}

export function PerTicketBreakdownChart({ timeInStatusData, config, onTicketClick }: BreakdownProps) {
  const { t } = useTranslation()
  const { statuses } = timeInStatusData
  const colors = buildStatusColors(statuses, config)
  const last30 = timeInStatusData.tickets.slice(-30)

  if (!last30.length) return null

  const idByExternalId = Object.fromEntries(last30.map(t => [t.external_id, t.id]))
  const titleByExternalId = Object.fromEntries(last30.map(t => [t.external_id, t.title]))
  const stackedData = last30.map((ticket) => ({
    name: ticket.external_id,
    ...Object.fromEntries(statuses.map((s) => [s, ticket.status_durations[s] ?? 0])),
  }))

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{t('timeInStatus.perTicketTitle')}</h3>
          <p className="text-xs text-gray-400 mt-0.5 mb-3">{t('help.perTicketBreakdown')}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={stackedData}
          onClick={(d) => {
            const label = d?.activeLabel
            if (label && onTicketClick) {
              const id = idByExternalId[label]
              if (id) onTicketClick(id)
            }
          }}
          style={{ cursor: onTicketClick ? 'pointer' : 'default' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 11 }} unit=" d" />
          <Tooltip content={<StackedTooltip titles={titleByExternalId} />} wrapperStyle={{ zIndex: 100 }} cursor={false} />
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
