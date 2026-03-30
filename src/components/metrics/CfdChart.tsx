import { format, parseISO } from 'date-fns'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { CfdResponse } from '@/types'

const COLORS = [
  '#e0e7ff', '#a5b4fc', '#818cf8', '#6366f1',
  '#7c3aed', '#5b21b6', '#0d9488', '#059669',
  '#f59e0b', '#ef4444',
]

interface CfdChartProps {
  data: CfdResponse
}

export function CfdChart({ data }: CfdChartProps) {
  if (data.statuses.length === 0 || data.data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-sm text-gray-400">No data</div>
  }

  // Subsample to max 300 points for render performance
  let chartData = data.data
  if (chartData.length > 300) {
    const step = Math.ceil(chartData.length / 300)
    chartData = chartData.filter((_, i) => i % step === 0 || i === chartData.length - 1)
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={chartData}>
        <XAxis
          dataKey="date"
          tickFormatter={(d: string) => format(parseISO(d), 'MMM d')}
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis hide />
        <Tooltip
          formatter={(v: number, name: string) => [v, name]}
          labelFormatter={(d: string) => format(parseISO(d), 'MMM d, yyyy')}
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
        />
        {data.statuses.map((status, i) => (
          <Area
            key={status}
            type="monotone"
            dataKey={status}
            stackId="1"
            stroke={COLORS[i % COLORS.length]}
            fill={COLORS[i % COLORS.length]}
            fillOpacity={0.85}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
