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
import type { TooltipProps } from 'recharts'
import type { CycleTimeTicket } from '@/types'

interface Props {
  tickets: CycleTimeTicket[]
  p85?: number | null
}

function CycleTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as { x: number; y: number; name: string }
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-semibold text-gray-800 mb-1">{d.name}</p>
      <p className="text-gray-500">{new Date(d.x).toLocaleDateString()}</p>
      <p className="text-blue-700 font-medium">{d.y.toFixed(1)} days</p>
    </div>
  )
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
          <Tooltip content={<CycleTooltip />} wrapperStyle={{ zIndex: 100 }} />
          <Scatter data={data} fill="#3b82f6" />
          {p85 != null && (
            <ReferenceLine y={p85} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'P85', fontSize: 11 }} />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
