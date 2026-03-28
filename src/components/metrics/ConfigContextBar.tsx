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

  function getStatusColor(idx: number) {
    const inCycle = idx >= cycleStartIdx && idx <= cycleEndIdx && cycleStartIdx !== -1
    const inLead = (lead_time_start_status ? idx >= leadStartIdx : true) && idx <= leadEndIdx && leadEndIdx !== -1

    if (inCycle && inLead) return 'bg-indigo-100 border-indigo-300 text-indigo-800'
    if (inCycle) return 'bg-blue-100 border-blue-300 text-blue-800'
    if (inLead) return 'bg-violet-100 border-violet-300 text-violet-800'
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
            <div className={`rounded-md border px-2.5 py-1.5 text-xs font-medium ${getStatusColor(idx)}`}>
              {status}
            </div>
          </div>
        ))}
      </div>

      {/* Span indicators */}
      <div className="mt-2.5 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-blue-400" />
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
