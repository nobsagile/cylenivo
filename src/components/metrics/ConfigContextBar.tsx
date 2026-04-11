import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { ConfigContext } from '@/types'
import { getConfigIndices, isInCycle, isInLead, pickShade, CYCLE_CLASS_SHADES, LEAD_CLASS_SHADES } from '@/lib/statusColors'

interface Props {
  config: ConfigContext
}

export function ConfigContextBar({ config }: Props) {
  const { t } = useTranslation()
  const {
    status_order,
    cycle_time_start_status,
    cycle_time_end_status,
    lead_time_start_status,
    lead_time_end_status,
    cycle_time_mode,
  } = config

  const indices = getConfigIndices(config)
  const leadEndStatus = lead_time_end_status ?? cycle_time_end_status

  const cycleAll = status_order.filter((_, i) => isInCycle(i, indices))
  const leadOnly = status_order.filter((_, i) => isInLead(i, indices) && !isInCycle(i, indices))

  function getStatusColor(status: string, i: number) {
    if (isInCycle(i, indices)) return pickShade(CYCLE_CLASS_SHADES, cycleAll, status)
    if (isInLead(i, indices)) return pickShade(LEAD_CLASS_SHADES, leadOnly, status)
    return 'bg-gray-50 border-gray-200 text-gray-500'
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* Title */}
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{t('configBar.title')}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-gray-800 mb-1">{t('configBar.title')}</p>
              <p>{t('help.configContext')}</p>
              <p className="font-medium text-gray-700 mt-2">{t('configBar.measurementMode', { mode: t(`configBar.mode${cycle_time_mode === 'first_last' ? 'FirstLast' : cycle_time_mode === 'first_first' ? 'FirstFirst' : 'LastLast'}`) })}</p>
              <p>{cycle_time_mode === 'first_last' ? t('help.modeFirstLast') : cycle_time_mode === 'first_first' ? t('help.modeFirstFirst') : t('help.modeLastLast')}</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* Status pills */}
      <div className="flex gap-1.5 items-center overflow-x-auto">
        {!lead_time_start_status && (
          <>
            <div className="shrink-0 rounded-md border px-2.5 py-1.5 text-xs font-medium bg-violet-50 border-violet-200 text-violet-600">
              {t('common.created')}
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
          <div className="w-3 h-1.5 rounded-full bg-teal-500 shrink-0" />
          <span className="text-[10px] text-gray-500">
            {t('configBar.cycleTimeLabel', { start: cycle_time_start_status, end: cycle_time_end_status })}
          </span>
          <span className="text-[10px] text-gray-400">({t(`configBar.mode${cycle_time_mode === 'first_last' ? 'FirstLast' : cycle_time_mode === 'first_first' ? 'FirstFirst' : 'LastLast'}`)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-violet-400 shrink-0" />
          <span className="text-[10px] text-gray-500">
            {t('configBar.leadTimeLabel', { start: lead_time_start_status ?? t('common.created'), end: leadEndStatus })}
          </span>
        </div>
      </div>
    </div>
  )
}
