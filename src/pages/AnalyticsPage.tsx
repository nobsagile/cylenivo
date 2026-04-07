import { useState, useEffect } from 'react'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { CycleTimesResponse, TimeInStatusResponse } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'
import { LeadTimeChart } from '@/components/metrics/LeadTimeChart'
import { AvgTimeInStatusChart, PerTicketBreakdownChart } from '@/components/metrics/TimeInStatusChart'
import { PageHeader } from '@/components/layout/PageHeader'

export default function AnalyticsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data: metrics, refetch: refetchMetrics } = useMetrics(importId)
  const [cycleData, setCycleData] = useState<CycleTimesResponse | null>(null)
  const [leadTimeValues, setLeadTimeValues] = useState<number[]>([])
  const [statusData, setStatusData] = useState<TimeInStatusResponse | null>(null)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [rev, setRev] = useState(0)

  useEffect(() => {
    if (!importId) return
    api.metrics.cycleTimes(importId).then(setCycleData).catch(console.error)
    api.metrics.leadTimes(importId).then((r) => setLeadTimeValues(r.values)).catch(console.error)
    api.metrics.timeInStatus(importId).then(setStatusData).catch(console.error)
  }, [importId, rev])

  function handleExclusionToggle() {
    refetchMetrics()
    setRev(r => r + 1)
  }

  if (!metrics) return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-gray-100 rounded animate-pulse" />
      <div className="h-10 w-80 bg-gray-100 rounded animate-pulse" />
      <div className="h-60 bg-gray-50 rounded-xl animate-pulse" />
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        view={t('nav.analytics')}
        name={metrics.project_key}
        subtitle={t('analytics.subtitle')}
        completed={metrics.completed_ticket_count}
        total={metrics.ticket_count}
        excluded={metrics.excluded_ticket_count}
      />

      <Tabs defaultValue="cycle">
        <TabsList className="bg-gray-100 p-1 h-auto">
          <TabsTrigger value="cycle" className="text-sm px-4 py-1.5 rounded-md">
            {t('metrics.cycleTime')}
          </TabsTrigger>
          <TabsTrigger value="lead" className="text-sm px-4 py-1.5 rounded-md">
            {t('metrics.leadTime')}
          </TabsTrigger>
          <TabsTrigger value="status" className="text-sm px-4 py-1.5 rounded-md">
            {t('metrics.timeInStatus')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cycle" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <CycleTimeChart
                tickets={cycleData?.tickets ?? []}
                p85={metrics.cycle_time.p85}
                onTicketClick={setSelectedTicketId}
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

        <TabsContent value="status" className="mt-4 space-y-4">
          {statusData && metrics ? (
            <>
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <AvgTimeInStatusChart timeInStatusData={statusData} summary={metrics} />
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <PerTicketBreakdownChart timeInStatusData={statusData} onTicketClick={setSelectedTicketId} />
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-gray-400 text-sm">Loading…</div>
          )}
        </TabsContent>
      </Tabs>
      <TicketDetailDrawer
        ticketId={selectedTicketId}
        config={metrics.config_context ?? null}
        onClose={() => setSelectedTicketId(null)}
        onExclusionToggle={handleExclusionToggle}
      />
    </div>
  )
}
