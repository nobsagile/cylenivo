import { useTranslation } from 'react-i18next'
import { Zap, Settings, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { FlowEfficiencyStats } from '@/types'

interface FlowEfficiencyCardProps {
  data: FlowEfficiencyStats | null
  activeStatuses: string[] | null
  configId: string
}

export function FlowEfficiencyCard({ data, activeStatuses, configId }: FlowEfficiencyCardProps) {
  const { t } = useTranslation()

  if (!data || !activeStatuses?.length) {
    return (
      <Card className="shadow-sm border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 py-2">
            <div className="p-2 rounded-lg bg-gray-100 shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">{t('metrics.flowEfficiency')}</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">{t('help.flowEfficiencyNotConfigured')}</p>
              <Link
                to={`/settings/configs/${configId}`}
                className="inline-flex items-center gap-1 mt-2 text-xs text-violet-600 hover:text-violet-800 font-medium"
              >
                <Settings className="w-3 h-3" />
                {t('help.configureActiveStatuses')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxCount = Math.max(...data.histogram.map((b: { bucket: number; count: number }) => b.count), 1)

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          {t('metrics.flowEfficiency')}
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <Info className="w-3.5 h-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="text-xs text-gray-600 space-y-1.5">
                <p className="font-semibold text-gray-800 mb-1">{t('metrics.flowEfficiency')}</p>
                <p>{t('help.flowEfficiency')}</p>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Metrics */}
          <div className="flex gap-6 lg:flex-col lg:gap-4">
            <div>
              <p className="text-3xl font-bold text-teal-600 tabular-nums">{data.mean.toFixed(1)}%</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('common.mean', 'Mean')}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-teal-500 tabular-nums">{data.median.toFixed(1)}%</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('common.median', 'Median')}</p>
            </div>
          </div>

          {/* Histogram */}
          <div>
            <div className="flex items-end gap-1 h-20">
              {data.histogram.map((b: { bucket: number; count: number }) => (
                <div key={b.bucket} className="relative flex-1 flex flex-col items-center gap-0.5 group">
                  <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 pointer-events-none">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-2.5 py-1.5 text-xs whitespace-nowrap">
                      <span className="font-medium text-gray-700">{b.bucket}–{b.bucket + 10}%</span>
                      <span className="text-gray-400 ml-1.5">{b.count} tickets</span>
                    </div>
                  </div>
                  <div
                    className="w-full rounded-t bg-teal-400 group-hover:bg-teal-500 transition-colors min-h-[2px]"
                    style={{ height: `${(b.count / maxCount) * 72}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1 px-0.5">
              <span className="text-[10px] text-gray-400">0%</span>
              <span className="text-[10px] text-gray-400">50%</span>
              <span className="text-[10px] text-gray-400">100%</span>
            </div>
          </div>
        </div>

        {/* Active statuses legend */}
        <div className="mt-4 flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-gray-400">{t('config.activeStatuses')}:</span>
          {activeStatuses.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs">
              <Zap className="w-2.5 h-2.5" fill="currentColor" />
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
