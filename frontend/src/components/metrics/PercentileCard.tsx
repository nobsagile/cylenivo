import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PercentileStats } from '@/types'
import { AlertTriangle } from 'lucide-react'

interface Props {
  data: PercentileStats
}

const PERCENTILES = [
  { key: 'p50' as const, label: 'P50', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50' },
  { key: 'p70' as const, label: 'P70', color: 'bg-yellow-400', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' },
  { key: 'p85' as const, label: 'P85', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50' },
  { key: 'p95' as const, label: 'P95', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' },
]

export function PercentileCard({ data }: Props) {
  const { t } = useTranslation()
  const maxVal = data.p95 ?? data.p85 ?? data.p70 ?? data.p50 ?? 1

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">
          {t('metrics.percentile.title')}
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
                    {val != null ? `${val} ${t('metrics.days')}` : '—'}
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
            Based on {data.sample_size} completed tickets
          </p>
        )}
      </CardContent>
    </Card>
  )
}
