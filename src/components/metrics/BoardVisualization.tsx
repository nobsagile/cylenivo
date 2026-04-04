import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import type { ConfigContext, StatusDuration, TimeInStatusResponse } from '@/types'
import { getConfigIndices, isInCycle, isInLead, pickShade, CYCLE_STYLE_SHADES, LEAD_STYLE_SHADES } from '@/lib/statusColors'

interface Props {
  config: ConfigContext
  timeInStatus: Record<string, StatusDuration>
  ticketData?: TimeInStatusResponse | null
}

interface TicketValue {
  value: number
  externalId: string
}

function MiniHistogram({ values }: { values: TicketValue[] }) {
  if (values.length === 0) return null

  const maxVal = Math.max(...values.map(v => v.value), 0.1)
  const bucketCount = 5
  const bucketSize = maxVal / bucketCount
  const buckets: { tickets: string[]; min: number; max: number }[] = Array.from({ length: bucketCount }, (_, i) => ({
    tickets: [],
    min: i * bucketSize,
    max: (i + 1) * bucketSize,
  }))

  for (const { value, externalId } of values) {
    const idx = Math.min(Math.floor((value / maxVal) * bucketCount), bucketCount - 1)
    buckets[idx].tickets.push(externalId)
  }

  const maxCount = Math.max(...buckets.map(b => b.tickets.length), 1)

  return (
    <div className="flex items-end gap-px h-4 mt-1">
      {buckets.map((bucket, i) => {
        if (bucket.tickets.length === 0) return <div key={i} className="flex-1" />
        return (
          <TooltipRoot key={i} delayDuration={100}>
            <TooltipTrigger asChild>
              <div
                className="flex-1 bg-current opacity-40 hover:opacity-70 rounded-sm cursor-default transition-opacity"
                style={{ height: `${Math.max((bucket.tickets.length / maxCount) * 100, 8)}%` }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold text-gray-700 mb-1">{bucket.min.toFixed(1)}–{bucket.max.toFixed(1)} d</p>
              <p className="text-gray-500 mb-1">{bucket.tickets.length} ticket{bucket.tickets.length !== 1 ? 's' : ''}</p>
              <p className="text-gray-600 max-w-[180px] break-words">{bucket.tickets.join(', ')}</p>
            </TooltipContent>
          </TooltipRoot>
        )
      })}
    </div>
  )
}

export function BoardVisualization({ config, timeInStatus, ticketData }: Props) {
  const { t } = useTranslation()
  const { status_order } = config

  const indices = getConfigIndices(config)

  // Only show statuses within lead or cycle window (relevant ones)
  const relevantStatuses = status_order.filter((_, idx) => {
    return isInCycle(idx, indices) || isInLead(idx, indices)
  })

  const meanDays = relevantStatuses.map(s => timeInStatus[s]?.mean_days ?? 0)
  const totalMean = meanDays.reduce((a, b) => a + b, 0) || 1

  // Collect per-ticket values per status for histograms
  const statusValues: Record<string, TicketValue[]> = {}
  if (ticketData) {
    for (const s of relevantStatuses) {
      statusValues[s] = ticketData.tickets
        .filter(t => (t.status_durations[s] ?? 0) > 0)
        .map(t => ({ value: t.status_durations[s], externalId: t.external_id }))
    }
  }

  const cycleAllStatuses = relevantStatuses.filter(s => isInCycle(status_order.indexOf(s), indices))
  const leadOnlyStatuses = relevantStatuses.filter(s => isInLead(status_order.indexOf(s), indices) && !isInCycle(status_order.indexOf(s), indices))

  function getStatusStyle(status: string) {
    const idx = status_order.indexOf(status)
    if (isInCycle(idx, indices)) return pickShade(CYCLE_STYLE_SHADES, cycleAllStatuses, status)
    return pickShade(LEAD_STYLE_SHADES, leadOnlyStatuses, status)
  }

  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <TooltipProvider>
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{t('board.title')}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
              <Info className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-gray-800 mb-1">Time Distribution</p>
              <p>{t('help.boardVisualization')}</p>
              <p>{t('help.boardColors')}</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-1">
        {relevantStatuses.map((status, i) => {
          const mean = meanDays[i]
          const median = timeInStatus[status]?.median_days ?? 0
          const baseFlex = Math.max(mean, totalMean * 0.04)
          const flexValue = hovered === status ? Math.max(baseFlex * 3, totalMean * 0.15) : baseFlex
          const style = getStatusStyle(status)
          const values = statusValues[status] ?? []

          return (
            <div
              key={status}
              className={`rounded-lg border p-2.5 ${style.bg} ${style.border} ${style.text} overflow-hidden cursor-default`}
              style={{ flex: flexValue, minWidth: 0, transition: 'flex 0.2s ease' }}
              onMouseEnter={() => setHovered(status)}
              onMouseLeave={() => setHovered(null)}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70 truncate">{status}</p>
              <p className="text-lg font-bold tabular-nums mt-0.5 whitespace-nowrap">{mean.toFixed(1)}d</p>
              <p className="text-[10px] opacity-60 whitespace-nowrap">med {median.toFixed(1)}d</p>
              {values.length > 0 && (
                <div className={style.bar}>
                  <MiniHistogram values={values} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-[10px] text-gray-400 mt-2">{t('board.footer')}</p>
    </div>
    </TooltipProvider>
  )
}
