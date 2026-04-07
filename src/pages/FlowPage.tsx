import { useState, useEffect } from 'react'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import { useDateFilter } from '@/contexts/DateFilterContext'
import type { TimeInStatusResponse, ReworkResponse, CycleTimeByTypeResponse } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { DateRangeSlider } from '@/components/metrics/DateRangeSlider'
import { AvgTimeInStatusChart, PerTicketBreakdownChart } from '@/components/metrics/TimeInStatusChart'
import { ConfigContextBar } from '@/components/metrics/ConfigContextBar'
import { BoardVisualization } from '@/components/metrics/BoardVisualization'
import { ReworkCard } from '@/components/metrics/ReworkCard'
import { CycleTimeByTypeChart } from '@/components/metrics/CycleTimeByTypeChart'
import { FlowEfficiencyCard } from '@/components/metrics/FlowEfficiencyCard'
import { PageHeader } from '@/components/layout/PageHeader'

export default function FlowPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { fromDate, toDate } = useDateFilter()
  const dates = { from: fromDate || undefined, to: toDate || undefined }
  const { data: metrics, refetch: refetchMetrics } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const [statusData, setStatusData] = useState<TimeInStatusResponse | null>(null)
  const [reworkData, setReworkData] = useState<ReworkResponse | null>(null)
  const [typeData, setTypeData] = useState<CycleTimeByTypeResponse | null>(null)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [rev, setRev] = useState(0)

  useEffect(() => {
    if (!importId) return
    api.metrics.timeInStatus(importId, dates).then(setStatusData).catch(console.error)
    api.metrics.rework(importId, dates).then(setReworkData).catch(console.error)
    api.metrics.cycleTimeByType(importId, dates).then(setTypeData).catch(console.error)
  }, [importId, fromDate, toDate, rev])

  function handleExclusionToggle() {
    refetchMetrics()
    setRev(r => r + 1)
  }

  if (!metrics) return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-gray-100 rounded animate-pulse" />
      <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
      <div className="h-60 bg-gray-50 rounded-xl animate-pulse" />
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        view={t('nav.flow')}
        name={metrics.project_key}
        subtitle={t('flow.subtitle')}
        completed={metrics.completed_ticket_count}
        total={metrics.ticket_count}
        excluded={metrics.excluded_ticket_count}
      />

      {metrics.config_context && (
        <ConfigContextBar config={metrics.config_context} />
      )}

      {metrics.date_range && (
        <DateRangeSlider
          dataFrom={metrics.date_range.from}
          dataTo={metrics.date_range.to}
        />
      )}

      {metrics.config_context && metrics.time_in_status && (
        <BoardVisualization
          config={metrics.config_context}
          timeInStatus={metrics.time_in_status}
          ticketData={statusData}
        />
      )}

      {statusData && metrics ? (
        <>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <AvgTimeInStatusChart timeInStatusData={statusData} summary={metrics} />
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <PerTicketBreakdownChart timeInStatusData={statusData} config={metrics.config_context} onTicketClick={setSelectedTicketId} />
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-gray-400 text-sm">{t('common.loading')}</div>
      )}

      {metrics.config_context && (
        <FlowEfficiencyCard
          data={metrics.flow_efficiency ?? null}
          activeStatuses={metrics.config_context.active_statuses}
          configId={metrics.config_context.config_id}
        />
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {typeData && <CycleTimeByTypeChart data={typeData} />}
        {reworkData && <ReworkCard data={reworkData} />}
      </div>

      <TicketDetailDrawer
        ticketId={selectedTicketId}
        config={metrics.config_context ?? null}
        onClose={() => setSelectedTicketId(null)}
        onExclusionToggle={handleExclusionToggle}
      />
    </div>
  )
}
