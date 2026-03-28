import { useState } from 'react'
import type { ConfigContext, StatusDuration, TimeInStatusResponse } from '@/types'

interface Props {
  config: ConfigContext
  timeInStatus: Record<string, StatusDuration>
  ticketData?: TimeInStatusResponse | null
}

function MiniHistogram({ values }: { values: number[] }) {
  if (values.length === 0) return null

  const maxVal = Math.max(...values, 0.1)
  const bucketCount = 5
  const buckets = Array(bucketCount).fill(0) as number[]

  for (const v of values) {
    const idx = Math.min(Math.floor((v / maxVal) * bucketCount), bucketCount - 1)
    buckets[idx]++
  }

  const maxBucket = Math.max(...buckets, 1)

  return (
    <div className="flex items-end gap-px h-4 mt-1">
      {buckets.map((count, i) => (
        <div
          key={i}
          className="flex-1 bg-current opacity-30 rounded-sm"
          style={{ height: `${Math.max((count / maxBucket) * 100, 4)}%` }}
        />
      ))}
    </div>
  )
}

export function BoardVisualization({ config, timeInStatus, ticketData }: Props) {
  const { status_order, cycle_time_start_status, cycle_time_end_status, lead_time_start_status, lead_time_end_status } = config

  const cycleStartIdx = status_order.indexOf(cycle_time_start_status)
  const cycleEndIdx = status_order.indexOf(cycle_time_end_status)
  const leadEndStatus = lead_time_end_status ?? cycle_time_end_status
  const leadStartIdx = lead_time_start_status ? status_order.indexOf(lead_time_start_status) : -1
  const leadEndIdx = status_order.indexOf(leadEndStatus)

  // Only show statuses within lead or cycle window (relevant ones)
  const relevantStatuses = status_order.filter((_, idx) => {
    const inCycle = idx >= cycleStartIdx && idx <= cycleEndIdx && cycleStartIdx !== -1
    const inLead = (lead_time_start_status ? idx >= leadStartIdx : true) && idx <= leadEndIdx && leadEndIdx !== -1
    return inCycle || inLead
  })

  const meanDays = relevantStatuses.map(s => timeInStatus[s]?.mean_days ?? 0)
  const totalMean = meanDays.reduce((a, b) => a + b, 0) || 1

  // Collect per-ticket values per status for histograms
  const statusValues: Record<string, number[]> = {}
  if (ticketData) {
    for (const s of relevantStatuses) {
      statusValues[s] = ticketData.tickets
        .map(t => t.status_durations[s] ?? 0)
        .filter(v => v > 0)
    }
  }

  const inLeadFn = (idx: number) => (lead_time_start_status ? idx >= leadStartIdx : true) && idx <= leadEndIdx
  const inCycleFn = (idx: number) => idx >= cycleStartIdx && idx <= cycleEndIdx

  const leadOnlyStatuses = relevantStatuses.filter(s => { const i = status_order.indexOf(s); return inLeadFn(i) && !inCycleFn(i) })
  const cycleOnlyStatuses = relevantStatuses.filter(s => { const i = status_order.indexOf(s); return inCycleFn(i) && !inLeadFn(i) })
  const overlapStatuses = relevantStatuses.filter(s => { const i = status_order.indexOf(s); return inCycleFn(i) && inLeadFn(i) })

  // Gradient shades per category (light → dark)
  const LEAD_SHADES = [
    { bg: 'bg-violet-100', border: 'border-violet-200', text: 'text-violet-800', bar: 'text-violet-300' },
    { bg: 'bg-violet-200', border: 'border-violet-300', text: 'text-violet-800', bar: 'text-violet-400' },
    { bg: 'bg-violet-300', border: 'border-violet-400', text: 'text-violet-900', bar: 'text-violet-500' },
    { bg: 'bg-violet-400', border: 'border-violet-500', text: 'text-violet-950', bar: 'text-violet-600' },
  ]
  const CYCLE_SHADES = [
    { bg: 'bg-teal-200', border: 'border-teal-300', text: 'text-teal-800', bar: 'text-teal-400' },
    { bg: 'bg-teal-300', border: 'border-teal-400', text: 'text-teal-800', bar: 'text-teal-500' },
    { bg: 'bg-teal-400', border: 'border-teal-500', text: 'text-teal-900', bar: 'text-teal-600' },
    { bg: 'bg-teal-500', border: 'border-teal-600', text: 'text-teal-950', bar: 'text-teal-700' },
  ]
  const OVERLAP_SHADES = [
    { bg: 'bg-indigo-300', border: 'border-indigo-400', text: 'text-indigo-900', bar: 'text-indigo-500' },
    { bg: 'bg-indigo-400', border: 'border-indigo-500', text: 'text-indigo-950', bar: 'text-indigo-600' },
    { bg: 'bg-indigo-500', border: 'border-indigo-600', text: 'text-white', bar: 'text-indigo-200' },
    { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-white', bar: 'text-indigo-200' },
  ]

  function pickShade<T>(arr: T[], statuses: string[], status: string): T {
    const pos = statuses.indexOf(status)
    const idx = statuses.length <= 1 ? 0 : Math.round((pos / (statuses.length - 1)) * (arr.length - 1))
    return arr[Math.max(0, Math.min(idx, arr.length - 1))]
  }

  function getStatusStyle(status: string) {
    const idx = status_order.indexOf(status)
    const inCycle = inCycleFn(idx)
    const inLead = inLeadFn(idx)
    if (inCycle && inLead) return pickShade(OVERLAP_SHADES, overlapStatuses, status)
    if (inCycle) return pickShade(CYCLE_SHADES, cycleOnlyStatuses, status)
    return pickShade(LEAD_SHADES, leadOnlyStatuses, status)
  }

  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Time Distribution Across Statuses</h3>
      <div className="flex gap-1">
        {relevantStatuses.map((status, i) => {
          const mean = meanDays[i]
          const median = timeInStatus[status]?.median_days ?? 0
          const baseFlex = Math.max(mean, totalMean * 0.04)
          const flexValue = hovered === status ? Math.max(baseFlex * 3, totalMean * 0.15) : baseFlex
          const style = getStatusStyle(status)
          const values = statusValues[status] ?? []
          const isHovered = hovered === status

          return (
            <div
              key={status}
              className={`rounded-lg border p-2.5 ${style.bg} ${style.border} ${style.text} overflow-hidden cursor-default`}
              style={{ flex: flexValue, minWidth: 0, transition: 'flex 0.2s ease' }}
              onMouseEnter={() => setHovered(status)}
              onMouseLeave={() => setHovered(null)}
            >
              <p className={`text-[10px] font-semibold uppercase tracking-wide opacity-70 ${isHovered ? '' : 'truncate'}`}>{status}</p>
              <p className="text-lg font-bold tabular-nums mt-0.5">{mean.toFixed(1)}d</p>
              <p className="text-[10px] opacity-60">med {median.toFixed(1)}d</p>
              {values.length > 0 && (
                <div className={style.bar}>
                  <MiniHistogram values={values} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-[10px] text-gray-400 mt-2">Column width proportional to average time spent. Histogram shows ticket distribution.</p>
    </div>
  )
}
