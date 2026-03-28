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

import { ChartTooltip } from './ChartTooltip'

interface Props {
  values: number[]
  bucketSize?: number
}

function LeadTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; fill?: string; dataKey?: string; payload?: Record<string, unknown> }>; label?: string }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as { range: string; count: number }
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1">{d.range} days</p>
      <p className="text-violet-700 font-medium">{d.count} tickets</p>
    </ChartTooltip>
  )
}

export function LeadTimeChart({ values, bucketSize = 5 }: Props) {
  const { t } = useTranslation()

  if (values.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data</div>
  }

  const max = Math.max(...values)
  const buckets: { range: string; count: number }[] = []
  for (let i = 0; i <= max; i += bucketSize) {
    const key = `${i}–${i + bucketSize}`
    buckets.push({ range: key, count: 0 })
  }
  for (const v of values) {
    const idx = Math.floor(v / bucketSize)
    if (buckets[idx]) buckets[idx].count++
  }
  // trim trailing empty buckets
  let last = buckets.length - 1
  while (last > 0 && buckets[last].count === 0) last--
  const data = buckets.slice(0, last + 1)

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{t('metrics.leadTime')}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
          <Tooltip content={<LeadTooltip />} wrapperStyle={{ zIndex: 100 }} />
          <Bar dataKey="count" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
