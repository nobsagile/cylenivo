import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { useMetrics } from '@/hooks/useMetrics'
import { api } from '@/services/api'
import type { CycleTimesResponse } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PercentileCard } from '@/components/metrics/PercentileCard'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'

function MetricCard({ title, value, unit }: { title: string; value: string | number | null; unit?: string }) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-sm text-gray-500 font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gray-900">
          {value ?? '—'}{unit ? <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span> : null}
        </p>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data, loading } = useMetrics(importId)
  const navigate = useNavigate()
  const [cycleTimesData, setCycleTimesData] = useState<CycleTimesResponse | null>(null)

  useEffect(() => {
    if (importId) {
      api.metrics.cycleTimes(importId).then(setCycleTimesData).catch(console.error)
    }
  }, [importId])

  if (!importId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500">No import selected</p>
        <Button onClick={() => navigate('/import')}>Upload your first export</Button>
      </div>
    )
  }

  if (loading || !data) return <div className="text-gray-400 text-sm">Loading…</div>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{data.project_key}</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          title={t('metrics.cycleTime')}
          value={data.cycle_time.median_days}
          unit={t('metrics.days')}
        />
        <MetricCard
          title={t('metrics.leadTime')}
          value={data.lead_time.median_days}
          unit={t('metrics.days')}
        />
        <MetricCard
          title={t('metrics.throughput')}
          value={data.throughput_per_week}
          unit={t('metrics.perWeek')}
        />
        <MetricCard
          title={t('metrics.ticketsAnalyzed')}
          value={data.ticket_count}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PercentileCard data={data.cycle_time} />
        <Card>
          <CardContent className="pt-4">
            <CycleTimeChart
              tickets={cycleTimesData?.tickets ?? []}
              p85={data.cycle_time.p85}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
