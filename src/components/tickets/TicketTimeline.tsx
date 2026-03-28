import type { TicketTransition, ConfigContext } from '@/types'

interface Props {
  transitions: TicketTransition[]
  config: ConfigContext
  createdAt: string
  externalLink?: string | null
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
      : startTime // last segment has no duration
    const durationDays = (endTime - startTime) / (1000 * 86400)

    // Check backward: compare to_status index vs previous to_status index
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

  const inCycleFn = (i: number) => i >= cycleStartIdx && i <= cycleEndIdx && cycleStartIdx !== -1
  const inLeadFn = (i: number) => (lead_time_start_status ? i >= leadStartIdx : true) && i <= leadEndIdx && leadEndIdx !== -1

  // Build per-category groups from status_order to determine gradient position
  const leadOnly = status_order.filter((_, i) => inLeadFn(i) && !inCycleFn(i))
  const cycleOnly = status_order.filter((_, i) => inCycleFn(i) && !inLeadFn(i))
  const overlap = status_order.filter((_, i) => inCycleFn(i) && inLeadFn(i))

  const LEAD_SHADES = ['bg-violet-100', 'bg-violet-200', 'bg-violet-300', 'bg-violet-400']
  const CYCLE_SHADES = ['bg-teal-200', 'bg-teal-300', 'bg-teal-400', 'bg-teal-500']
  const OVERLAP_SHADES = ['bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600']

  function pickShade(arr: string[], group: string[], status: string) {
    const pos = group.indexOf(status)
    if (pos === -1) return arr[0]
    const idx = group.length <= 1 ? 0 : Math.round((pos / (group.length - 1)) * (arr.length - 1))
    return arr[Math.max(0, Math.min(idx, arr.length - 1))]
  }

  function getSegmentColor(status: string, isBackward: boolean) {
    if (isBackward) return 'bg-rose-400'
    const idx = status_order.indexOf(status)
    const ic = inCycleFn(idx)
    const il = inLeadFn(idx)
    if (ic && il) return pickShade(OVERLAP_SHADES, overlap, status)
    if (ic) return pickShade(CYCLE_SHADES, cycleOnly, status)
    if (il) return pickShade(LEAD_SHADES, leadOnly, status)
    return 'bg-gray-200'
  }

  return (
    <div className="space-y-2">
      {/* Timeline bar */}
      <div className="flex h-6 rounded-md overflow-hidden border border-gray-200">
        {segments.map((seg, i) => {
          const widthPct = Math.max((seg.durationDays / totalDuration) * 100, 2)
          return (
            <div
              key={i}
              className={`${getSegmentColor(seg.status, seg.isBackward)} relative group`}
              style={{ width: `${widthPct}%` }}
              title={`${seg.status}: ${seg.durationDays.toFixed(1)}d`}
            >
              {widthPct > 10 && (
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-gray-700 truncate px-1">
                  {seg.status}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {segments.map((seg, i) => (
          <span key={i} className="text-[10px] text-gray-500">
            <span className={`inline-block w-2 h-2 rounded-sm ${getSegmentColor(seg.status, seg.isBackward)} mr-1`} />
            {seg.status}: {seg.durationDays.toFixed(1)}d
            {seg.isBackward && <span className="text-rose-600 ml-0.5">(rework)</span>}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 text-[10px]">
        <span className="text-gray-400">Created: {new Date(createdAt).toLocaleDateString()}</span>
        {externalLink && (
          <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Open in Jira ↗
          </a>
        )}
      </div>
    </div>
  )
}
