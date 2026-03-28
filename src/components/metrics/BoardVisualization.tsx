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

  function getStatusStyle(status: string) {
    const idx = status_order.indexOf(status)
    const inCycle = idx >= cycleStartIdx && idx <= cycleEndIdx
    const inLead = (lead_time_start_status ? idx >= leadStartIdx : true) && idx <= leadEndIdx

    if (inCycle && inLead) return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', bar: 'text-indigo-400' }
    if (inCycle) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', bar: 'text-blue-400' }
    return { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-800', bar: 'text-violet-400' }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Time Distribution Across Statuses</h3>
      <div className="flex gap-1">
        {relevantStatuses.map((status, i) => {
          const mean = meanDays[i]
          const median = timeInStatus[status]?.median_days ?? 0
          const widthPct = Math.max((mean / totalMean) * 100, 8)
          const style = getStatusStyle(status)
          const values = statusValues[status] ?? []

          return (
            <div
              key={status}
              className={`rounded-lg border p-2.5 ${style.bg} ${style.border} ${style.text} overflow-hidden`}
              style={{ width: `${widthPct}%`, minWidth: '60px' }}
            >
              <p className="text-[10px] font-semibold truncate uppercase tracking-wide opacity-70">{status}</p>
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
