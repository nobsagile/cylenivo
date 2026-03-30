import { format, parseISO } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { WeeklyThroughputPoint } from '@/types'

interface ThroughputChartProps {
  data: WeeklyThroughputPoint[]
  average: number | null
}

export function ThroughputChart({ data, average }: ThroughputChartProps) {
  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-sm text-gray-400">No data</div>
  }

  const roundedAvg = average !== null ? Math.round(average * 10) / 10 : null

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barCategoryGap="20%">
        <XAxis
          dataKey="week"
          tickFormatter={(w: string) => format(parseISO(w), 'MMM d')}
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis hide />
        <Tooltip
          formatter={(v: number) => [v, 'tickets']}
          labelFormatter={(w: string) => format(parseISO(w), 'MMM d, yyyy')}
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
        />
        {roundedAvg !== null && (
          <ReferenceLine
            y={roundedAvg}
            stroke="#10b981"
            strokeDasharray="3 3"
            label={{ value: `avg ${roundedAvg}`, fill: '#10b981', fontSize: 10, position: 'insideTopRight' }}
          />
        )}
        <Bar dataKey="count" fill="#10b981" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
