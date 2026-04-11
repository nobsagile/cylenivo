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
import { ChartTooltip } from './ChartTooltip'

interface Props {
  tickets: CycleTimeTicket[]
  p85?: number | null
  onTicketClick?: (id: string) => void
}

function CycleTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; fill?: string; dataKey?: string; payload?: Record<string, unknown> }>; label?: string }) {
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

export function CycleTimeChart({ tickets, p85, onTicketClick }: Props) {
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
    id: ticket.id,
  }))

  return (
    <div>
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
          <Scatter
            data={data}
            fill="#0d9488"
            onClick={(d: unknown) => onTicketClick?.((d as { id?: string }).id as string)}
            style={{ cursor: onTicketClick ? 'pointer' : 'default' }}
          />
          {p85 != null && (
            <ReferenceLine y={p85} stroke="#e11d48" strokeDasharray="4 4" label={{ value: 'P85', fontSize: 11 }} />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
