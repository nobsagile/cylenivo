import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useOutletContext } from 'react-router-dom'
import { Info } from 'lucide-react'
import { useMetrics } from '@/hooks/useMetrics'
import { useDateFilter } from '@/contexts/DateFilterContext'
import { useCfd } from '@/hooks/useChartData'
import { api } from '@/services/api'
import type { ReworkResponse, CycleTimeByTypeResponse } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangeSlider } from '@/components/metrics/DateRangeSlider'
import type { ProjectLayoutContext } from '@/components/layout/ProjectLayout'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ReworkCard } from '@/components/metrics/ReworkCard'
import { CycleTimeByTypeChart } from '@/components/metrics/CycleTimeByTypeChart'
import { FlowEfficiencyCard } from '@/components/metrics/FlowEfficiencyCard'
import { CfdChart } from '@/components/metrics/CfdChart'
import { PageHeader } from '@/components/layout/PageHeader'
import { ConfigContextBar } from '@/components/metrics/ConfigContextBar'
import { downloadCsv } from '@/lib/csvExport'
import { ExportButton } from '@/components/ui/ExportButton'

export default function HealthPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { fromDate, toDate } = useDateFilter()
  const dates = { from: fromDate || undefined, to: toDate || undefined }
  const { data: metrics } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const { dateRange } = useOutletContext<ProjectLayoutContext>()
  const { data: cfdData } = useCfd(importId, fromDate, toDate)
  const [reworkData, setReworkData] = useState<ReworkResponse | null>(null)
  const [typeData, setTypeData] = useState<CycleTimeByTypeResponse | null>(null)

  useEffect(() => {
    if (!importId) return
    api.metrics.rework(importId, dates).then(setReworkData).catch(console.error)
    api.metrics.cycleTimeByType(importId, dates).then(setTypeData).catch(console.error)
  }, [importId, fromDate, toDate])

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
        view={t('nav.health')}
        name={metrics.project_key}
        subtitle={t('health.subtitle')}
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

      {cfdData && cfdData.statuses.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              {t('dashboard.cfd')}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
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
    </div>
  )
}
