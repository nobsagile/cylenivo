import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { CycleTimesResponse, TimeInStatusResponse } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'
import { LeadTimeChart } from '@/components/metrics/LeadTimeChart'
import { TimeInStatusChart } from '@/components/metrics/TimeInStatusChart'

export default function AnalyticsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data: metrics } = useMetrics(importId)
  const [cycleData, setCycleData] = useState<CycleTimesResponse | null>(null)
  const [statusData, setStatusData] = useState<TimeInStatusResponse | null>(null)

  useEffect(() => {
    if (!importId) return
    api.metrics.cycleTimes(importId).then(setCycleData).catch(console.error)
    api.metrics.timeInStatus(importId).then(setStatusData).catch(console.error)
  }, [importId])

  if (!metrics) return <div className="text-gray-400 text-sm">Loading…</div>

  const leadTimes = (cycleData?.tickets ?? [])
    .map(() => 0)
    .filter((v) => v > 0)

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('nav.analytics')}</h2>

      <Tabs defaultValue="cycle">
        <TabsList className="mb-4">
          <TabsTrigger value="cycle">{t('metrics.cycleTime')}</TabsTrigger>
          <TabsTrigger value="lead">{t('metrics.leadTime')}</TabsTrigger>
          <TabsTrigger value="status">Time in Status</TabsTrigger>
        </TabsList>

        <TabsContent value="cycle">
          <CycleTimeChart
            tickets={cycleData?.tickets ?? []}
            p85={metrics.cycle_time.p85}
          />
        </TabsContent>

        <TabsContent value="lead">
          <LeadTimeChart values={leadTimes} />
        </TabsContent>

        <TabsContent value="status">
          {statusData && metrics ? (
            <TimeInStatusChart timeInStatusData={statusData} summary={metrics} />
          ) : (
            <div className="text-gray-400 text-sm">Loading…</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
