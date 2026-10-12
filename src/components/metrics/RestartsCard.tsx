import { useTranslation } from 'react-i18next'
import { Info, RotateCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { RestartSummary } from '@/types'

/** Aborted attempts (#143): tickets moved back to a restart status after they had started. */
export function RestartsCard({ data, onShowTickets }: { data: RestartSummary; onShowTickets: () => void }) {
  const { t } = useTranslation()
  const total = data.restarted + data.abandoned
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm text-gray-500 font-medium truncate">{t('dashboard.restarts')}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors shrink-0" aria-label={t('help.titles.restarts')}>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="text-xs text-gray-600 space-y-1.5">
                    <p className="font-semibold text-gray-800 mb-1">{t('dashboard.restarts')}</p>
                    <p>{t('help.restarts')}</p>
                    <div className="pt-1 space-y-1">
                      <div className="flex justify-between">
                        <span>{t('dashboard.restartsRestarted')}</span>
                        <span className="font-semibold text-gray-900">{data.restarted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('dashboard.restartsAbandoned')}</span>
                        <span className="font-semibold text-gray-900">{data.abandoned}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('dashboard.restartsDiscarded')}</span>
                        <span className="font-semibold text-gray-900">{data.discarded_days.toFixed(1)} {t('metrics.days')}</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="mt-1.5 text-3xl font-bold text-gray-900 tracking-tight tabular-nums">{total}</p>
            {total > 0 && (
              <button onClick={onShowTickets} className="mt-1 block whitespace-nowrap text-xs text-violet-600 hover:underline">
                {t('dashboard.restartsShowTickets')}
              </button>
            )}
          </div>
          <div className="p-2.5 rounded-xl shrink-0 bg-orange-50">
            <RotateCcw className="w-5 h-5 text-orange-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
