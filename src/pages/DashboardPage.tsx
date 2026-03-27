import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, Timer, TrendingUp, Layers, Upload } from 'lucide-react'
import { useMetrics } from '@/hooks/useMetrics'
import { api } from '@/services/api'
import type { CycleTimesResponse } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PercentileCard } from '@/components/metrics/PercentileCard'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'

interface MetricCardProps {
  title: string
  value: string | number | null
  unit?: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
}

function MetricCard({ title, value, unit, icon: Icon, iconBg, iconColor }: MetricCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-medium truncate">{title}</p>
            <p className="mt-1.5 text-3xl font-bold text-gray-900 tracking-tight tabular-nums">
              {value ?? '—'}
              {unit && (
                <span className="text-sm font-normal text-gray-400 ml-1.5">{unit}</span>
              )}
            </p>
          </div>
          <div className={`p-2.5 rounded-xl shrink-0 ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
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
      <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-blue-50">
          <Upload className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <p className="text-gray-900 font-medium">No dataset selected</p>
          <p className="text-gray-400 text-sm mt-1">Upload a Jira export to start analyzing</p>
        </div>
        <Button onClick={() => navigate('/import')}>Upload export</Button>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardContent className="p-5">
                <div className="h-16 bg-gray-50 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{data.project_key}</h2>
        <p className="text-sm text-gray-400 mt-0.5">{data.ticket_count} tickets analyzed</p>
      </div>

<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          title={t('metrics.cycleTime')}
          value={data.cycle_time.median_days}
          unit={t('metrics.days')}
          icon={Clock}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <MetricCard
          title={t('metrics.leadTime')}
          value={data.lead_time.median_days}
          unit={t('metrics.days')}
          icon={Timer}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
        />
        <MetricCard
          title={t('metrics.throughput')}
          value={data.throughput_per_week}
          unit={t('metrics.perWeek')}
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <MetricCard
          title={t('metrics.ticketsAnalyzed')}
          value={data.ticket_count}
          icon={Layers}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PercentileCard data={data.cycle_time} />
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-700">Cycle Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
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
