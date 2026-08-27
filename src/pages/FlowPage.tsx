import { useState } from 'react'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'
import { useTranslation } from 'react-i18next'
import { useParams, useOutletContext } from 'react-router-dom'
import { useMetrics } from '@/hooks/useMetrics'
import { useTimeInStatus } from '@/hooks/useChartData'
import { useDateFilter } from '@/contexts/DateFilterContext'
import { Card, CardContent } from '@/components/ui/card'
import { AvgTimeInStatusChart, PerTicketBreakdownChart } from '@/components/metrics/TimeInStatusChart'
import { ConfigContextBar } from '@/components/metrics/ConfigContextBar'
import { BoardVisualization } from '@/components/metrics/BoardVisualization'
import { PageHeader } from '@/components/layout/PageHeader'
import { DateRangeSlider } from '@/components/metrics/DateRangeSlider'
// import { downloadCsv } from '@/lib/csvExport' // #90
// import { ExportButton } from '@/components/ui/ExportButton' // #90
import type { ProjectLayoutContext } from '@/components/layout/ProjectLayout'

export default function FlowPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { fromDate, toDate } = useDateFilter()
  const { data: metrics, refetch: refetchMetrics } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const { dateRange } = useOutletContext<ProjectLayoutContext>()
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [rev, setRev] = useState(0)
  const { data: statusData } = useTimeInStatus(importId, fromDate, toDate, rev)

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
        /* actions — hidden until #90 */
      />

      {dateRange?.from && dateRange?.to && (
        <DateRangeSlider dataFrom={dateRange.from} dataTo={dateRange.to} />
      )}

      {metrics.config_context && (
        <ConfigContextBar config={metrics.config_context} />
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

      <TicketDetailDrawer
        ticketId={selectedTicketId}
        config={metrics.config_context ?? null}
        onClose={() => setSelectedTicketId(null)}
        onExclusionToggle={handleExclusionToggle}
      />
    </div>
  )
}
