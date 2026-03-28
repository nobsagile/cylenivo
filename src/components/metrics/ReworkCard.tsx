import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { ReworkResponse } from '@/types'
import { ArrowLeftRight, Info } from 'lucide-react'

interface Props {
  data: ReworkResponse
}

export function ReworkCard({ data }: Props) {
  const { t } = useTranslation()
  const { tickets_with_rework, total_completed, rework_paths, avg_cycle_with_rework, avg_cycle_without_rework } = data
  const pct = total_completed > 0 ? Math.round((tickets_with_rework / total_completed) * 100) : 0

  if (total_completed === 0) return null

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-rose-500" />
          {t('rework.title')}
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <Info className="w-3.5 h-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="text-xs text-gray-600 space-y-1.5">
                <p className="font-semibold text-gray-800 mb-1">{t('rework.title')}</p>
                <p>{t('help.rework')}</p>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{pct}%</p>
            <p className="text-xs text-gray-500">{t('rework.ofTicketsHaveRework')}</p>
            <p className="text-[10px] text-gray-400">{tickets_with_rework} of {total_completed}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-rose-600 tabular-nums">
              {avg_cycle_with_rework != null ? `${avg_cycle_with_rework}d` : '—'}
            </p>
            <p className="text-xs text-gray-500">{t('rework.avgCycleWithRework')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600 tabular-nums">
              {avg_cycle_without_rework != null ? `${avg_cycle_without_rework}d` : '—'}
            </p>
            <p className="text-xs text-gray-500">{t('rework.avgCycleWithout')}</p>
          </div>
        </div>

        {rework_paths.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">{t('rework.commonBackwardMovements')}</p>
            <div className="space-y-1.5">
              {rework_paths.slice(0, 5).map((path) => (
                <div key={`${path.from}-${path.to}`} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-700 font-medium">{path.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-rose-700 font-medium">{path.to}</span>
                  </div>
                  <span className="text-gray-500 tabular-nums">{path.count}×</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tickets_with_rework === 0 && (
          <p className="text-sm text-emerald-600">{t('rework.noRework')}</p>
        )}
      </CardContent>
    </Card>
  )
}
