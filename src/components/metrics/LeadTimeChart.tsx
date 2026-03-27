import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  values: number[]
  bucketSize?: number
}

export function LeadTimeChart({ values, bucketSize = 5 }: Props) {
  const { t } = useTranslation()

  if (values.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data</div>
  }

  const max = Math.max(...values)
  const buckets: Record<string, number> = {}
  for (let i = 0; i <= max; i += bucketSize) {
    buckets[`${i}–${i + bucketSize}`] = 0
  }
  for (const v of values) {
    const bucket = Math.floor(v / bucketSize) * bucketSize
    const key = `${bucket}–${bucket + bucketSize}`
    buckets[key] = (buckets[key] ?? 0) + 1
  }
  const data = Object.entries(buckets).map(([range, count]) => ({ range, count }))

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{t('metrics.leadTime')}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
