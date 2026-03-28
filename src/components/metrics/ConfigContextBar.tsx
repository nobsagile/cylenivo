import type { ConfigContext } from '@/types'

interface Props {
  config: ConfigContext
}

export function ConfigContextBar({ config }: Props) {
  const {
    status_order,
    cycle_time_start_status,
    cycle_time_end_status,
    lead_time_start_status,
    lead_time_end_status,
    cycle_time_mode,
  } = config

  const cycleStartIdx = status_order.indexOf(cycle_time_start_status)
  const cycleEndIdx = status_order.indexOf(cycle_time_end_status)
  const leadEndStatus = lead_time_end_status ?? cycle_time_end_status
  const leadStartIdx = lead_time_start_status ? status_order.indexOf(lead_time_start_status) : -1
  const leadEndIdx = status_order.indexOf(leadEndStatus)

  const modeLabels: Record<string, string> = {
    first_last: 'first / last',
    first_first: 'first / first',
    last_last: 'last / last',
  }

  const inCycleFn = (i: number) => i >= cycleStartIdx && i <= cycleEndIdx && cycleStartIdx !== -1
  const inLeadFn = (i: number) => (lead_time_start_status ? i >= leadStartIdx : true) && i <= leadEndIdx && leadEndIdx !== -1

  const leadOnly = status_order.filter((_, i) => inLeadFn(i) && !inCycleFn(i))
  const cycleOnly = status_order.filter((_, i) => inCycleFn(i) && !inLeadFn(i))
  const overlap = status_order.filter((_, i) => inCycleFn(i) && inLeadFn(i))

  const LEAD_SHADES = [
    'bg-violet-100 border-violet-200 text-violet-800',
    'bg-violet-200 border-violet-300 text-violet-800',
    'bg-violet-300 border-violet-400 text-violet-900',
    'bg-violet-400 border-violet-500 text-violet-950',
  ]
  const CYCLE_SHADES = [
    'bg-teal-200 border-teal-300 text-teal-800',
    'bg-teal-300 border-teal-400 text-teal-800',
    'bg-teal-400 border-teal-500 text-teal-900',
    'bg-teal-500 border-teal-600 text-teal-950',
  ]
  const OVERLAP_SHADES = [
    'bg-indigo-300 border-indigo-400 text-indigo-900',
    'bg-indigo-400 border-indigo-500 text-indigo-950',
    'bg-indigo-500 border-indigo-600 text-white',
    'bg-indigo-600 border-indigo-700 text-white',
  ]

  function pickShade(arr: string[], group: string[], status: string) {
    const pos = group.indexOf(status)
    if (pos === -1) return arr[0]
    const idx = group.length <= 1 ? 0 : Math.round((pos / (group.length - 1)) * (arr.length - 1))
    return arr[Math.max(0, Math.min(idx, arr.length - 1))]
  }

  function getStatusColor(status: string, i: number) {
    const ic = inCycleFn(i)
    const il = inLeadFn(i)
    if (ic && il) return pickShade(OVERLAP_SHADES, overlap, status)
    if (ic) return pickShade(CYCLE_SHADES, cycleOnly, status)
    if (il) return pickShade(LEAD_SHADES, leadOnly, status)
    return 'bg-gray-50 border-gray-200 text-gray-500'
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* Status pills */}
      <div className="flex gap-1.5 items-center overflow-x-auto">
        {!lead_time_start_status && (
          <>
            <div className="shrink-0 rounded-md border px-2.5 py-1.5 text-xs font-medium bg-violet-50 border-violet-200 text-violet-600">
              Created
            </div>
            <span className="text-gray-300 text-xs shrink-0">›</span>
          </>
        )}
        {status_order.map((status, idx) => (
          <div key={status} className="flex items-center gap-1.5 shrink-0">
            {idx > 0 && <span className="text-gray-300 text-xs">›</span>}
            <div className={`rounded-md border px-2.5 py-1.5 text-xs font-medium ${getStatusColor(status, idx)}`}>
              {status}
            </div>
          </div>
        ))}
      </div>

      {/* Span indicators */}
      <div className="mt-2.5 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-teal-500" />
          <span className="text-[10px] text-gray-500">
            Cycle Time: {cycle_time_start_status} → {cycle_time_end_status}
          </span>
          <span className="text-[10px] text-gray-400">({modeLabels[cycle_time_mode] ?? cycle_time_mode})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-violet-400" />
          <span className="text-[10px] text-gray-500">
            Lead Time: {lead_time_start_status ?? 'Created'} → {leadEndStatus}
          </span>
        </div>
      </div>
    </div>
  )
}
