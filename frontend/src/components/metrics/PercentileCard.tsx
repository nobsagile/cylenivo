import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PercentileStats } from '@/types'

interface Props {
  data: PercentileStats
}

export function PercentileCard({ data }: Props) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('metrics.percentile.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.warning && (
          <p className="text-yellow-700 bg-yellow-50 rounded px-3 py-2 text-sm mb-3">
            ⚠ {data.warning}
          </p>
        )}
        <table className="w-full text-sm">
          <tbody>
            {([
              ['p50', t('metrics.percentile.p50')],
              ['p70', t('metrics.percentile.p70')],
              ['p85', t('metrics.percentile.p85')],
              ['p95', t('metrics.percentile.p95')],
            ] as [keyof PercentileStats, string][]).map(([key, label]) => (
              <tr key={key} className="border-b last:border-0">
                <td className="py-2 text-gray-600">{label}</td>
                <td className="py-2 text-right font-medium">
                  {data[key] != null ? `${data[key]} ${t('metrics.days')}` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
