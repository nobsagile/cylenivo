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
import { ChartTooltip } from './ChartTooltip'

interface Props {
  tickets: CycleTimeTicket[]
  p85?: number | null
}

function CycleTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as { x: number; y: number; name: string }
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1">{d.name}</p>
      <p className="text-gray-500">{new Date(d.x).toLocaleDateString()}</p>
      <p className="text-teal-700 font-medium">{d.y.toFixed(1)} days</p>
    </ChartTooltip>
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

  const data = tickets.map((ticket) => ({
    x: new Date(ticket.completed_at).getTime(),
    y: ticket.cycle_time_days,
    name: ticket.external_id,
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
          <Scatter data={data} fill="#0d9488" />
          {p85 != null && (
            <ReferenceLine y={p85} stroke="#e11d48" strokeDasharray="4 4" label={{ value: 'P85', fontSize: 11 }} />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
