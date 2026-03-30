import { format, parseISO } from 'date-fns'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { CfdResponse } from '@/types'
import { ChartTooltip } from './ChartTooltip'

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
    chartData = chartData.filter((_: unknown, i: number) => i % step === 0 || i === chartData.length - 1)
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
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            return (
              <ChartTooltip>
                <p className="text-gray-500 mb-1.5">{label ? format(parseISO(String(label)), 'MMM d, yyyy') : ''}</p>
                {payload.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-gray-600">{entry.name}</span>
                    </span>
                    <span className="font-semibold text-gray-900">{entry.value}</span>
                  </div>
                ))}
              </ChartTooltip>
            )
          }}
        />
        {data.statuses.map((status: string, i: number) => (
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
