import { useTranslation } from 'react-i18next'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { CycleTimeTicket } from '@/types'

interface Props {
  tickets: CycleTimeTicket[]
  p85?: number | null
}

export function CycleTimeChart({ tickets, p85 }: Props) {
  const { t } = useTranslation()

  if (tickets.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No completed tickets
      </div>
    )
  }

  const data = tickets.map((t) => ({
    x: new Date(t.completed_at).getTime(),
    y: t.cycle_time_days,
    name: t.external_id,
  }))

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{t('metrics.cycleTime')}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(v) => new Date(v).toLocaleDateString()}
            tick={{ fontSize: 11 }}
          />
          <YAxis dataKey="y" tick={{ fontSize: 11 }} unit=" d" />
          <Tooltip
            formatter={(value) => [`${value} days`, 'Cycle Time']}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Scatter data={data} fill="#3b82f6" />
          {p85 != null && (
            <ReferenceLine y={p85} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'P85', fontSize: 11 }} />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
