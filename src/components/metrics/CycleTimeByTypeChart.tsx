import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CycleTimeByTypeResponse } from '@/types'
import { ChartTooltip } from './ChartTooltip'

interface Props {
  data: CycleTimeByTypeResponse
}

function TypeTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex justify-between gap-4 text-xs">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-medium text-gray-700">{Number(p.value).toFixed(1)}d</span>
        </div>
      ))}
    </ChartTooltip>
  )
}

export function CycleTimeByTypeChart({ data }: Props) {
  if (data.types.length === 0) return null

  const chartData = data.types.map((t) => ({
    type: t.type,
    Median: t.median,
    P85: t.p85,
    count: t.count,
  }))

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Cycle Time by Ticket Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} unit="d" />
            <Tooltip content={<TypeTooltip />} wrapperStyle={{ zIndex: 100 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Median" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="P85" fill="#f97316" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2">
          {data.types.map((t) => (
            <span key={t.type} className="text-[10px] text-gray-400">
              {t.type}: {t.count} tickets
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
