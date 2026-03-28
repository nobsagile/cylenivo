import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
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
    return <p className="text-xs text-gray-400">No transitions recorded</p>
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
    const t = sorted[i]
    const startTime = new Date(t.transitioned_at).getTime()
    const endTime = i + 1 < sorted.length
      ? new Date(sorted[i + 1].transitioned_at).getTime()
      : startTime
    const durationDays = (endTime - startTime) / (1000 * 86400)

    let isBackward = false
    if (i > 0 && t.from_status) {
      const fromIdx = status_order.indexOf(t.from_status)
      const toIdx = status_order.indexOf(t.to_status)
      if (fromIdx !== -1 && toIdx !== -1 && toIdx < fromIdx) isBackward = true
    }

    if (durationDays > 0) {
      segments.push({ status: t.to_status, startTime, endTime, durationDays, isBackward })
    }
  }

  const totalDuration = segments.reduce((sum, s) => sum + s.durationDays, 0) || 1

  // --- Color logic ---
  const inCycleFn = (i: number) => i >= cycleStartIdx && i <= cycleEndIdx && cycleStartIdx !== -1
  const inLeadFn = (i: number) => (lead_time_start_status ? i >= leadStartIdx : true) && i <= leadEndIdx && leadEndIdx !== -1

  const leadOnly = status_order.filter((_, i) => inLeadFn(i) && !inCycleFn(i))
  const cycleOnly = status_order.filter((_, i) => inCycleFn(i) && !inLeadFn(i))
  const overlap = status_order.filter((_, i) => inCycleFn(i) && inLeadFn(i))

  const LEAD_SHADES = [
    { bg: 'bg-violet-100', border: 'border-violet-200', text: 'text-violet-900' },
    { bg: 'bg-violet-200', border: 'border-violet-300', text: 'text-violet-900' },
    { bg: 'bg-violet-300', border: 'border-violet-400', text: 'text-violet-900' },
    { bg: 'bg-violet-400', border: 'border-violet-500', text: 'text-white' },
  ]
  const CYCLE_SHADES = [
    { bg: 'bg-teal-200', border: 'border-teal-300', text: 'text-teal-900' },
    { bg: 'bg-teal-300', border: 'border-teal-400', text: 'text-teal-900' },
    { bg: 'bg-teal-400', border: 'border-teal-500', text: 'text-teal-950' },
    { bg: 'bg-teal-500', border: 'border-teal-600', text: 'text-white' },
  ]
  const OVERLAP_SHADES = [
    { bg: 'bg-indigo-300', border: 'border-indigo-400', text: 'text-indigo-950' },
    { bg: 'bg-indigo-400', border: 'border-indigo-500', text: 'text-white' },
    { bg: 'bg-indigo-500', border: 'border-indigo-600', text: 'text-white' },
    { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-white' },
  ]

  function pickShade<T>(arr: T[], group: string[], status: string): T {
    const pos = group.indexOf(status)
    if (pos === -1) return arr[0]
    const idx = group.length <= 1 ? 0 : Math.round((pos / (group.length - 1)) * (arr.length - 1))
    return arr[Math.max(0, Math.min(idx, arr.length - 1))]
  }

  function getSegmentStyle(status: string, isBackward: boolean) {
    if (isBackward) return { bg: 'bg-rose-400', border: 'border-rose-500', text: 'text-white' }
    const idx = status_order.indexOf(status)
    const ic = inCycleFn(idx)
    const il = inLeadFn(idx)
    if (ic && il) return pickShade(OVERLAP_SHADES, overlap, status)
    if (ic) return pickShade(CYCLE_SHADES, cycleOnly, status)
    if (il) return pickShade(LEAD_SHADES, leadOnly, status)
    return { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-700' }
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

  // Sort: forward statuses in status_order position, then rework buckets after their forward counterpart
  const aggregates = [...aggregateMap.values()].sort((a, b) => {
    const ai = status_order.indexOf(a.status)
    const bi = status_order.indexOf(b.status)
    if (ai !== bi) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    // Same status: forward first, then rework
    return Number(a.isBackward) - Number(b.isBackward)
  })

  const aggregateTotalDuration = aggregates.reduce((sum, a) => sum + a.totalDays, 0) || 1

  // --- Rework movements from raw transitions ---
  const movementMap = new Map<string, ReworkMovement>()
  for (const t of sorted) {
    if (!t.from_status) continue
    const fromIdx = status_order.indexOf(t.from_status)
    const toIdx = status_order.indexOf(t.to_status)
    if (fromIdx !== -1 && toIdx !== -1 && toIdx < fromIdx) {
      const key = `${t.from_status}→${t.to_status}`
      const existing = movementMap.get(key)
      if (existing) existing.count++
      else movementMap.set(key, { from: t.from_status, to: t.to_status, count: 1 })
    }
  }
  const reworkMovements = [...movementMap.values()].sort((a, b) => b.count - a.count)
  const totalReworkCount = reworkMovements.reduce((sum, m) => sum + m.count, 0)

  // --- Hover state ---
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="space-y-3">

      {/* 1. Timeline bar */}
      <div className="flex h-10 rounded-md overflow-hidden border border-gray-200">
        {segments.map((seg, i) => {
          const baseFlex = Math.max(seg.durationDays, totalDuration * 0.02)
          const flexValue = hoveredBar === i
            ? Math.max(baseFlex * 4, totalDuration * 0.12)
            : baseFlex
          const style = getSegmentStyle(seg.status, seg.isBackward)
          return (
            <div
              key={`${seg.status}-${seg.startTime}`}
              className={`${style.bg} relative`}
              style={{ flex: flexValue, minWidth: 0, transition: 'flex 0.15s ease' }}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {hoveredBar === i && (
                <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold whitespace-nowrap px-1 overflow-hidden ${style.text}`}>
                  {seg.status}: {seg.durationDays.toFixed(1)}d
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* 2. Status summary cards */}
      <div className="flex gap-1">
        {aggregates.map((agg) => {
          const key = agg.isBackward ? `__rework__${agg.status}` : agg.status
          const isHovered = hoveredCard === key
          const baseFlex = Math.max(agg.totalDays, aggregateTotalDuration * 0.03)
          const flexValue = isHovered
            ? Math.max(baseFlex * 3, aggregateTotalDuration * 0.15)
            : baseFlex
          const style = agg.isBackward
            ? { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900' }
            : getSegmentStyle(agg.status, false)

          return (
            <div
              key={key}
              className={`rounded-lg border p-2 ${style.bg} ${style.border} ${style.text} overflow-hidden cursor-default`}
              style={{ flex: flexValue, minWidth: 0, transition: 'flex 0.2s ease' }}
              onMouseEnter={() => setHoveredCard(key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <p className={`text-[9px] font-semibold uppercase tracking-wide opacity-70 ${isHovered ? '' : 'truncate'}`}>
                {agg.isBackward ? '↺ ' : ''}{agg.status}
              </p>
              <p className="text-base font-bold tabular-nums leading-tight">{agg.totalDays.toFixed(1)}d</p>
              {agg.visitCount > 1 && (
                <p className="text-[9px] opacity-60">×{agg.visitCount}</p>
              )}
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
              {totalReworkCount} rework movement{totalReworkCount !== 1 ? 's' : ''}
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
        <span className="text-gray-400">Created: {new Date(createdAt).toLocaleDateString()}</span>
        {externalLink && (
          <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
            Open in Jira ↗
          </a>
        )}
      </div>

    </div>
  )
}
