import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, Timer, TrendingUp, Layers, Upload, Info } from 'lucide-react'
import { useMetrics } from '@/hooks/useMetrics'
import { useImports } from '@/hooks/useImports'
import { useDateFilter } from '@/contexts/DateFilterContext'
import { useCycleTimes, useLeadTimes, useThroughput, useCfd } from '@/hooks/useChartData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { DateRangeSlider } from '@/components/metrics/DateRangeSlider'
import { PercentileCard } from '@/components/metrics/PercentileCard'
import { CycleTimeChart } from '@/components/metrics/CycleTimeChart'
import { ConfigContextBar } from '@/components/metrics/ConfigContextBar'
import { LeadTimeScatterChart } from '@/components/metrics/LeadTimeScatterChart'
import { ThroughputChart } from '@/components/metrics/ThroughputChart'
import { CfdChart } from '@/components/metrics/CfdChart'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'

interface MetricCardProps {
  title: string
  value: string | number | null
  unit?: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  info?: React.ReactNode
}

function MetricCard({ title, value, unit, icon: Icon, iconBg, iconColor, info }: MetricCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm text-gray-500 font-medium truncate">{title}</p>
              {info && (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    {info}
                  </PopoverContent>
                </Popover>
              )}
            </div>
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

interface TicketsAnalyzedCardProps {
  completed: number
  total: number
  withoutCycleStart: number
  incomplete: number
}

function TicketsAnalyzedCard({ completed, total, withoutCycleStart, incomplete }: TicketsAnalyzedCardProps) {
  const { t } = useTranslation()
  const other = Math.max(0, total - completed - withoutCycleStart - incomplete)
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm text-gray-500 font-medium">{t('dashboard.analyzed')}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <p className="font-semibold text-gray-800 mb-2">{t('dashboard.totalImported', { total })}</p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">✓ {t('dashboard.validCycleTimes')}</span>
                      <span className="font-semibold text-gray-900">{completed}</span>
                    </div>
                    {withoutCycleStart > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('dashboard.noCycleStart')}</span>
                        <span className="text-gray-500">{withoutCycleStart}</span>
                      </div>
                    )}
                    {incomplete > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('dashboard.startedNeverCompleted')}</span>
                        <span className="text-gray-500">{incomplete}</span>
                      </div>
                    )}
                    {other > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('dashboard.otherExcluded')}</span>
                        <span className="text-gray-500">{other}</span>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="mt-1.5 text-3xl font-bold text-gray-900 tracking-tight tabular-nums">
              {completed}
            </p>
          </div>
          <div className="p-2.5 rounded-xl shrink-0 bg-amber-50">
            <Layers className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { fromDate, toDate } = useDateFilter()
  const { data } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const { data: imports } = useImports()
  const navigate = useNavigate()
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  const currentImport = imports.find(imp => imp.id === importId)

  const cycleTimesData = useCycleTimes(importId, fromDate, toDate)
  const leadTimesData = useLeadTimes(importId, fromDate, toDate)
  const throughputData = useThroughput(importId, fromDate, toDate)
  const cfdData = useCfd(importId)

  if (!importId) {
    return (
      <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-violet-50">
          <Upload className="w-8 h-8 text-violet-500" />
        </div>
        <div>
          <p className="text-gray-900 font-medium">{t('dashboard.noDataset')}</p>
          <p className="text-gray-400 text-sm mt-1">{t('dashboard.noDatasetHint')}</p>
        </div>
        <Button onClick={() => navigate('/import')}>{t('dashboard.uploadExport')}</Button>
      </div>
    )
  }

  if (!data) {
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
        <p className="text-sm text-gray-400 mt-0.5">{t('dashboard.ticketsAnalyzed', { completed: data.completed_ticket_count, total: data.ticket_count })}</p>
      </div>

      {data.config_context && (
        <ConfigContextBar config={data.config_context} />
      )}

      <DateRangeSlider
        dataFrom={data.date_range.from}
        dataTo={data.date_range.to}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          title={t('metrics.cycleTime')}
          value={data.cycle_time.median_days != null ? +data.cycle_time.median_days.toFixed(1) : null}
          unit={t('metrics.days')}
          icon={Clock}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
          info={
            <div className="text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-gray-800 mb-1">{t('metrics.cycleTime')}</p>
              <p>{t('help.cycleTime')}</p>
            </div>
          }
        />
        <MetricCard
          title={t('metrics.leadTime')}
          value={data.lead_time.median_days != null ? +data.lead_time.median_days.toFixed(1) : null}
          unit={t('metrics.days')}
          icon={Timer}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
          info={
            <div className="text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-gray-800 mb-1">{t('metrics.leadTime')}</p>
              <p>{t('help.leadTime')}</p>
            </div>
          }
        />
        <MetricCard
          title={t('metrics.throughput')}
          value={data.throughput_per_week != null ? +data.throughput_per_week.toFixed(1) : null}
          unit={t('metrics.perWeek')}
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          info={
            <div className="text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-gray-800 mb-1">{t('metrics.throughput')}</p>
              <p>{t('help.throughput')}</p>
              <p className="text-gray-400">{t('help.throughputNote')}</p>
            </div>
          }
        />
        <TicketsAnalyzedCard
          completed={data.completed_ticket_count}
          total={data.ticket_count}
          withoutCycleStart={currentImport?.health_report?.tickets_without_cycle_start ?? 0}
          incomplete={currentImport?.health_report?.tickets_incomplete ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PercentileCard data={data.cycle_time} variant="cycle" />
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.cycleTimeTrend')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
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
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PercentileCard data={data.lead_time} variant="lead" />
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.leadTimeTrend')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
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
      {throughputData && throughputData.weeks.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.weeklyThroughput')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
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

      {cfdData && cfdData.statuses.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.cfd')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="text-xs text-gray-600 space-y-1.5">
                    <p className="font-semibold text-gray-800 mb-1">{t('dashboard.cfd')}</p>
                    <p>{t('help.cfd')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CfdChart data={cfdData} />
          </CardContent>
        </Card>
      )}

      <TicketDetailDrawer
        ticketId={selectedTicketId}
        config={data.config_context ?? null}
        onClose={() => setSelectedTicketId(null)}
      />
    </div>
  )
}
