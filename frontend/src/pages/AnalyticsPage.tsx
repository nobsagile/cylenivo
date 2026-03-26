import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { CycleTimesResponse, TimeInStatusResponse } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'
import { LeadTimeChart } from '@/components/metrics/LeadTimeChart'
import { TimeInStatusChart } from '@/components/metrics/TimeInStatusChart'

export default function AnalyticsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data: metrics } = useMetrics(importId)
  const [cycleData, setCycleData] = useState<CycleTimesResponse | null>(null)
  const [leadTimeValues, setLeadTimeValues] = useState<number[]>([])
  const [statusData, setStatusData] = useState<TimeInStatusResponse | null>(null)

  useEffect(() => {
    if (!importId) return
    api.metrics.cycleTimes(importId).then(setCycleData).catch(console.error)
    api.metrics.leadTimes(importId).then((r) => setLeadTimeValues(r.values)).catch(console.error)
    api.metrics.timeInStatus(importId).then(setStatusData).catch(console.error)
  }, [importId])

  if (!metrics) return <div className="text-gray-400 text-sm">Loading…</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('nav.analytics')}</h2>
        <p className="text-sm text-gray-400 mt-0.5">Detailed flow metrics</p>
      </div>

      <Tabs defaultValue="cycle">
        <TabsList className="bg-gray-100 p-1 h-auto">
          <TabsTrigger value="cycle" className="text-sm px-4 py-1.5 rounded-md">
            {t('metrics.cycleTime')}
          </TabsTrigger>
          <TabsTrigger value="lead" className="text-sm px-4 py-1.5 rounded-md">
            {t('metrics.leadTime')}
          </TabsTrigger>
          <TabsTrigger value="status" className="text-sm px-4 py-1.5 rounded-md">
            Time in Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cycle" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <CycleTimeChart
                tickets={cycleData?.tickets ?? []}
                p85={metrics.cycle_time.p85}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lead" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <LeadTimeChart values={leadTimeValues} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              {statusData && metrics ? (
                <TimeInStatusChart timeInStatusData={statusData} summary={metrics} />
              ) : (
                <div className="text-gray-400 text-sm">Loading…</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
