import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useOutletContext } from 'react-router-dom'
import { Info } from 'lucide-react'
import { useMetrics } from '@/hooks/useMetrics'
import { useDateFilter } from '@/contexts/DateFilterContext'
import { useCycleTimes, useLeadTimes, useThroughput } from '@/hooks/useChartData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'
import { LeadTimeScatterChart } from '@/components/metrics/LeadTimeScatterChart'
import { LeadTimeChart } from '@/components/metrics/LeadTimeChart'
import { ThroughputChart } from '@/components/metrics/ThroughputChart'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'
import { PageHeader } from '@/components/layout/PageHeader'
import { ConfigContextBar } from '@/components/metrics/ConfigContextBar'
import { DateRangeSlider } from '@/components/metrics/DateRangeSlider'
import { downloadCsv } from '@/lib/csvExport'
import { ExportButton } from '@/components/ui/ExportButton'
import type { ProjectLayoutContext } from '@/components/layout/ProjectLayout'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

export default function TrendsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { fromDate, toDate } = useDateFilter()
  const { data } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const { dateRange } = useOutletContext<ProjectLayoutContext>()
  const { data: cycleTimesData, error: cycleError } = useCycleTimes(importId, fromDate, toDate)
  const { data: leadTimesData, error: leadError } = useLeadTimes(importId, fromDate, toDate)
  const { data: throughputData, error: throughputError } = useThroughput(importId, fromDate, toDate)
  const chartError = cycleError ?? leadError ?? throughputError
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  if (!data) return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-gray-100 rounded animate-pulse" />
      <div className="h-60 bg-gray-50 rounded-xl animate-pulse" />
      <div className="h-60 bg-gray-50 rounded-xl animate-pulse" />
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        view={t('nav.trends')}
        name={data.project_key}
        subtitle={t('trends.subtitle')}
        completed={data.completed_ticket_count}
        total={data.ticket_count}
        excluded={data.excluded_ticket_count}
        /* actions — hidden until #90 */
        }
      />

      {dateRange?.from && dateRange?.to && (
        <DateRangeSlider dataFrom={dateRange.from} dataTo={dateRange.to} />
      )}

      <ErrorBanner message={chartError} />

      {data.config_context && (
        <ConfigContextBar config={data.config_context} />
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.cycleTimeTrend')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="text-xs text-gray-600 space-y-1.5">
                    <p className="font-semibold text-gray-800 mb-1">{t('dashboard.cycleTimeTrend')}</p>
                    <p>{t('help.cycleTimeTrend')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CycleTimeChart
              tickets={cycleTimesData?.tickets ?? []}
              p85={data.cycle_time.p85}
              onTicketClick={setSelectedTicketId}
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.leadTimeTrend')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="text-xs text-gray-600 space-y-1.5">
                    <p className="font-semibold text-gray-800 mb-1">{t('dashboard.leadTimeTrend')}</p>
                    <p>{t('help.leadTimeTrend')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LeadTimeScatterChart
              tickets={leadTimesData?.tickets ?? []}
              p85={data.lead_time.p85}
              onTicketClick={setSelectedTicketId}
            />
          </CardContent>
        </Card>
      </div>

      {(cycleTimesData || leadTimesData) && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {cycleTimesData && cycleTimesData.tickets.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  {t('dashboard.cycleTimeDistribution')}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="text-xs text-gray-600 space-y-1.5">
                        <p className="font-semibold text-gray-800 mb-1">{t('dashboard.cycleTimeDistribution')}</p>
                        <p>{t('help.cycleTimeDistribution')}</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeadTimeChart
                  values={cycleTimesData.tickets.map(ticket => ticket.cycle_time_days)}
                  color="#0d9488"
                />
              </CardContent>
            </Card>
          )}
          {leadTimesData && leadTimesData.tickets.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  {t('dashboard.leadTimeDistribution')}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="text-xs text-gray-600 space-y-1.5">
                        <p className="font-semibold text-gray-800 mb-1">{t('dashboard.leadTimeDistribution')}</p>
                        <p>{t('help.leadTimeDistribution')}</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeadTimeChart values={leadTimesData.tickets.map(ticket => ticket.lead_time_days)} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {throughputData && throughputData.weeks.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.weeklyThroughput')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="text-xs text-gray-600 space-y-1.5">
                    <p className="font-semibold text-gray-800 mb-1">{t('dashboard.weeklyThroughput')}</p>
                    <p>{t('help.weeklyThroughput')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThroughputChart data={throughputData.weeks} average={data.throughput_per_week} />
          </CardContent>
        </Card>
      )}

      <TicketDetailDrawer
        ticketId={selectedTicketId}
        config={data.config_context ?? null}
        onClose={() => setSelectedTicketId(null)}
        onExclusionToggle={() => {}}
      />
    </div>
  )
}
