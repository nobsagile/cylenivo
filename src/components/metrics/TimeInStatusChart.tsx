import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { TimeInStatusResponse, MetricsSummary } from '@/types'

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

interface Props {
  timeInStatusData: TimeInStatusResponse
  summary: MetricsSummary
}

export function TimeInStatusChart({ timeInStatusData, summary }: Props) {
  const { t } = useTranslation()
  const { statuses } = timeInStatusData

  const avgData = statuses.map((status) => ({
    status,
    days: summary.time_in_status[status]?.mean_days ?? 0,
  }))

  const last30 = timeInStatusData.tickets.slice(-30)
  const stackedData = last30.map((ticket) => ({
    name: ticket.external_id,
    ...Object.fromEntries(statuses.map((s) => [s, ticket.status_durations[s] ?? 0])),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">{t('metrics.cycleTime')} – Avg Time in Status</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={avgData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 11 }} unit=" d" />
            <YAxis dataKey="status" type="category" tick={{ fontSize: 11 }} width={150} />
            <Tooltip formatter={(v) => [`${v} days`]} wrapperStyle={{ zIndex: 100 }} />
            <Bar dataKey="days" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {last30.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Per-Ticket Breakdown (last 30)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stackedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} unit=" d" />
              <Tooltip wrapperStyle={{ zIndex: 100 }} />
              <Legend wrapperStyle={{ zIndex: 10 }} />
              {statuses.map((status, i) => (
                <Bar key={status} dataKey={status} stackId="a" fill={COLORS[i % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
