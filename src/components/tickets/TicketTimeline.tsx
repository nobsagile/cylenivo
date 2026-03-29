import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeftRight, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { TicketTransition, ConfigContext } from '@/types'

interface Props {
  transitions: TicketTransition[]
  config: ConfigContext
  createdAt: string
  externalLink?: string | null
}

interface StatusAggregate {
  status: string
  totalDays: number
  visitCount: number
  isBackward: boolean
}

interface ReworkMovement {
  from: string
  to: string
  count: number
}

export function TicketTimeline({ transitions, config, createdAt, externalLink }: Props) {
  const { t } = useTranslation()
  const { status_order, cycle_time_start_status, cycle_time_end_status, lead_time_start_status, lead_time_end_status } = config

  const cycleStartIdx = status_order.indexOf(cycle_time_start_status)
  const cycleEndIdx = status_order.indexOf(cycle_time_end_status)
  const leadEndStatus = lead_time_end_status ?? cycle_time_end_status
  const leadStartIdx = lead_time_start_status ? status_order.indexOf(lead_time_start_status) : -1
  const leadEndIdx = status_order.indexOf(leadEndStatus)

  const sorted = [...transitions].sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )

  if (sorted.length === 0) {
    return <p className="text-xs text-gray-400">{t('timeline.noTransitions')}</p>
  }

  // Build segments: each segment = time in a status
  interface Segment {
    status: string
    startTime: number
    endTime: number
    durationDays: number
    isBackward: boolean
  }

  const segments: Segment[] = []
  for (let i = 0; i < sorted.length; i++) {
    const tr = sorted[i]
    const startTime = new Date(tr.transitioned_at).getTime()
    const endTime = i + 1 < sorted.length
      ? new Date(sorted[i + 1].transitioned_at).getTime()
      : startTime
    const durationDays = (endTime - startTime) / (1000 * 86400)

    let isBackward = false
    if (i > 0 && tr.from_status) {
      const fromIdx = status_order.indexOf(tr.from_status)
      const toIdx = status_order.indexOf(tr.to_status)
      if (fromIdx !== -1 && toIdx !== -1 && toIdx < fromIdx) isBackward = true
    }

    if (durationDays > 0 || i === sorted.length - 1) {
      segments.push({ status: tr.to_status, startTime, endTime, durationDays, isBackward })
    }
  }

  const totalDuration = segments.reduce((sum, s) => sum + s.durationDays, 0) || 1

  // --- Color logic ---
  const inCycleFn = (i: number) => i >= cycleStartIdx && i <= cycleEndIdx && cycleStartIdx !== -1
  const inLeadFn = (i: number) => (lead_time_start_status ? i >= leadStartIdx : true) && i <= leadEndIdx && leadEndIdx !== -1

  const cycleAll = status_order.filter((_, i) => inCycleFn(i))
  const leadOnly = status_order.filter((_, i) => inLeadFn(i) && !inCycleFn(i))

  const LEAD_SHADES = [
    { bg: 'bg-violet-100', bar: 'bg-violet-300', border: 'border-l-violet-300' },
    { bg: 'bg-violet-200', bar: 'bg-violet-400', border: 'border-l-violet-400' },
    { bg: 'bg-violet-300', bar: 'bg-violet-500', border: 'border-l-violet-500' },
    { bg: 'bg-violet-400', bar: 'bg-violet-600', border: 'border-l-violet-500' },
  ]
  const CYCLE_SHADES = [
    { bg: 'bg-teal-200', bar: 'bg-teal-400', border: 'border-l-teal-400' },
    { bg: 'bg-teal-300', bar: 'bg-teal-500', border: 'border-l-teal-500' },
    { bg: 'bg-teal-400', bar: 'bg-teal-600', border: 'border-l-teal-500' },
    { bg: 'bg-teal-500', bar: 'bg-teal-600', border: 'border-l-teal-600' },
  ]

  function pickShade<T>(arr: T[], group: string[], status: string): T {
    const pos = group.indexOf(status)
    if (pos === -1) return arr[0]
    const idx = group.length <= 1 ? 0 : Math.round((pos / (group.length - 1)) * (arr.length - 1))
    return arr[Math.max(0, Math.min(idx, arr.length - 1))]
  }

  function getSegmentBg(status: string, isBackward: boolean): string {
    if (isBackward) return 'bg-rose-400'
    const idx = status_order.indexOf(status)
    if (inCycleFn(idx)) return pickShade(CYCLE_SHADES, cycleAll, status).bg
    if (inLeadFn(idx)) return pickShade(LEAD_SHADES, leadOnly, status).bg
    return 'bg-gray-200'
  }

  function getRowColors(status: string, isBackward: boolean) {
    if (isBackward) return { bar: 'bg-rose-300', border: 'border-l-rose-400' }
    const idx = status_order.indexOf(status)
    if (inCycleFn(idx)) {
      const s = pickShade(CYCLE_SHADES, cycleAll, status)
      return { bar: s.bar, border: s.border }
    }
    if (inLeadFn(idx)) {
      const s = pickShade(LEAD_SHADES, leadOnly, status)
      return { bar: s.bar, border: s.border }
    }
    return { bar: 'bg-gray-300', border: 'border-l-gray-300' }
  }

  // --- Aggregate segments by status (rework as separate bucket) ---
  const aggregateMap = new Map<string, StatusAggregate>()
  for (const seg of segments) {
    const key = seg.isBackward ? `__rework__${seg.status}` : seg.status
    const existing = aggregateMap.get(key)
    if (existing) {
      existing.totalDays += seg.durationDays
      existing.visitCount += 1
    } else {
      aggregateMap.set(key, { status: seg.status, totalDays: seg.durationDays, visitCount: 1, isBackward: seg.isBackward })
    }
  }

  const aggregates = [...aggregateMap.values()].sort((a, b) => {
    const ai = status_order.indexOf(a.status)
    const bi = status_order.indexOf(b.status)
    if (ai !== bi) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    return Number(a.isBackward) - Number(b.isBackward)
  })

  const aggregateTotalDuration = aggregates.reduce((sum, a) => sum + a.totalDays, 0) || 1

  // --- Rework movements from raw transitions ---
  const movementMap = new Map<string, ReworkMovement>()
  for (const tr of sorted) {
    if (!tr.from_status) continue
    const fromIdx = status_order.indexOf(tr.from_status)
    const toIdx = status_order.indexOf(tr.to_status)
    if (fromIdx !== -1 && toIdx !== -1 && toIdx < fromIdx) {
      const key = `${tr.from_status}→${tr.to_status}`
      const existing = movementMap.get(key)
      if (existing) existing.count++
      else movementMap.set(key, { from: tr.from_status, to: tr.to_status, count: 1 })
    }
  }
  const reworkMovements = [...movementMap.values()].sort((a, b) => b.count - a.count)
  const totalReworkCount = reworkMovements.reduce((sum, m) => sum + m.count, 0)

  const completedAt = cycle_time_end_status
    ? [...sorted].reverse().find(t => t.to_status === cycle_time_end_status)?.transitioned_at ?? null
    : null

  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <div className="space-y-3">

      {/* Help */}
      <div className="flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-gray-800 mb-1">Ticket Timeline</p>
              <p>{t('help.ticketTimeline')}</p>
              <p>{t('help.boardColors')}</p>
            </div>
          </PopoverContent>
        </Popover>
        <span className="text-[10px] text-gray-400">{t('timeline.hoverToExplore')}</span>
      </div>

      {/* 1. Timeline bar */}
      <div>
        <div className="flex h-8 rounded-md overflow-hidden border border-gray-200">
          {segments.filter(s => s.durationDays > 0).map((seg, i) => (
            <div
              key={`${seg.status}-${seg.startTime}`}
              className={getSegmentBg(seg.status, seg.isBackward)}
              style={{ flex: seg.durationDays / totalDuration, minWidth: 4 }}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            />
          ))}
        </div>
        <div className="h-4 mt-1">
          {hoveredBar !== null && (
            <p className="text-[10px] text-gray-500 tabular-nums">
              {segments[hoveredBar].isBackward ? '↺ ' : ''}{segments[hoveredBar].status}: {segments[hoveredBar].durationDays.toFixed(1)}d
            </p>
          )}
        </div>
      </div>

      {/* 2. Status table */}
      <div className="space-y-0.5">
        {aggregates.map((agg) => {
          const key = agg.isBackward ? `__rework__${agg.status}` : agg.status
          const pct = (agg.totalDays / aggregateTotalDuration) * 100
          const { bar, border } = getRowColors(agg.status, agg.isBackward)

          return (
            <div key={key} className={`flex items-center gap-3 py-1 pl-2.5 border-l-2 ${border}`}>
              <span className="text-xs text-gray-700 flex-1 min-w-0">
                {agg.isBackward ? <span className="text-rose-500 mr-1">↺</span> : null}{agg.status}
              </span>
              {agg.visitCount > 1 && (
                <span className="text-[10px] text-gray-400 shrink-0">×{agg.visitCount}</span>
              )}
              <span className="text-xs font-semibold tabular-nums text-gray-800 w-14 text-right shrink-0">
                {agg.totalDays > 0 ? `${agg.totalDays.toFixed(1)}d` : '—'}
              </span>
              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                {agg.totalDays > 0 && (
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 3. Rework section */}
      {reworkMovements.length > 0 && (
        <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-xs font-semibold text-rose-700">
              {totalReworkCount !== 1 ? t('timeline.reworkMovementsPlural', { count: totalReworkCount }) : t('timeline.reworkMovements', { count: totalReworkCount })}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            {reworkMovements.map((m) => (
              <span key={`${m.from}→${m.to}`} className="text-xs text-rose-700">
                <span className="font-medium">{m.from}</span>
                <span className="text-rose-400 mx-1">→</span>
                <span className="font-medium">{m.to}</span>
                {m.count > 1 && <span className="text-rose-500 ml-1">(×{m.count})</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Footer */}
      <div className="flex gap-3 text-[10px]">
        <span className="text-gray-400">{t('common.created')}: {new Date(createdAt).toLocaleDateString()}</span>
        {completedAt && (
          <span className="text-gray-400">{t('common.resolved')}: {new Date(completedAt).toLocaleDateString()}</span>
        )}
        {externalLink && (
          <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
            {t('timeline.openInJira')}
          </a>
        )}
      </div>

    </div>
  )
}
