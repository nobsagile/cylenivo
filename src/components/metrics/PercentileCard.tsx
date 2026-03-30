import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PercentileStats } from '@/types'
import { AlertTriangle, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

interface Props {
  data: PercentileStats
  variant?: 'cycle' | 'lead'
}

const PERCENTILES = [
  { key: 'p50' as const, label: 'P50', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50' },
  { key: 'p70' as const, label: 'P70', color: 'bg-yellow-400', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' },
  { key: 'p85' as const, label: 'P85', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50' },
  { key: 'p95' as const, label: 'P95', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' },
]

export function PercentileCard({ data, variant = 'cycle' }: Props) {
  const { t } = useTranslation()
  const maxVal = (data.p95 ?? data.p85 ?? data.p70 ?? data.p50 ?? 1) || 1
  const isLead = variant === 'lead'
  const title = isLead ? `${t('metrics.leadTime')} Forecast` : t('metrics.percentile.title')
  const metricName = isLead ? t('metrics.leadTime').toLowerCase() : t('metrics.cycleTime').toLowerCase()

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
          {title}
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <Info className="w-3.5 h-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="text-xs text-gray-600 space-y-1.5">
                <p className="font-semibold text-gray-800 mb-1">{title}</p>
                <p>{t('metrics.percentile.basedOn', { metricName })}</p>
                <p>{t('metrics.percentile.p85Explain')}</p>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.warning && (
          <div className="flex items-start gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 text-sm mb-4">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{data.warning}</span>
          </div>
        )}
        <div className="space-y-3">
          {PERCENTILES.map(({ key, label, color, textColor, bgLight }) => {
            const val = data[key] as number | null
            const pct = val != null ? Math.round((val / maxVal) * 100) : 0
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${bgLight} ${textColor}`}>
                      {label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {t(`metrics.percentile.${key}`)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 tabular-nums">
                    {val != null ? `${val.toFixed(1)} ${t('metrics.days')}` : '—'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${color}`}
                    style={{ width: val != null ? `${pct}%` : '0%' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        {data.sample_size != null && (
          <p className="text-xs text-gray-400 mt-4">
            {t('metrics.percentile.sampleSize', { count: data.sample_size })}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
