import { useState, useEffect } from 'react'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { TimeInStatusResponse, ReworkResponse, CycleTimeByTypeResponse } from '@/types'
import { DatePicker } from '@/components/ui/date-picker'
import { Card, CardContent } from '@/components/ui/card'
import { AvgTimeInStatusChart, PerTicketBreakdownChart } from '@/components/metrics/TimeInStatusChart'
import { ConfigContextBar } from '@/components/metrics/ConfigContextBar'
import { BoardVisualization } from '@/components/metrics/BoardVisualization'
import { ReworkCard } from '@/components/metrics/ReworkCard'
import { CycleTimeByTypeChart } from '@/components/metrics/CycleTimeByTypeChart'

export default function FlowPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const dates = { from: fromDate || undefined, to: toDate || undefined }
  const { data: metrics } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const [statusData, setStatusData] = useState<TimeInStatusResponse | null>(null)
  const [reworkData, setReworkData] = useState<ReworkResponse | null>(null)
  const [typeData, setTypeData] = useState<CycleTimeByTypeResponse | null>(null)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  useEffect(() => {
    if (!importId) return
    api.metrics.timeInStatus(importId, dates).then(setStatusData).catch(console.error)
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
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('nav.flow')}</h2>
        <p className="text-sm text-gray-400 mt-0.5">{t('flow.subtitle')}</p>
      </div>

      {metrics.config_context && (
        <ConfigContextBar config={metrics.config_context} />
      )}

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{t('common.from')}</span>
        <DatePicker value={fromDate} onChange={setFromDate} placeholder={t('common.from')} />
        <span className="text-sm text-gray-500">{t('common.to')}</span>
        <DatePicker value={toDate} onChange={setToDate} placeholder={t('common.to')} />
        {(fromDate || toDate) && (
          <button
            onClick={() => { setFromDate(''); setToDate('') }}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            {t('common.clearFilter')}
          </button>
        )}
      </div>

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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {typeData && <CycleTimeByTypeChart data={typeData} />}
        {reworkData && <ReworkCard data={reworkData} />}
      </div>

      <TicketDetailDrawer
        ticketId={selectedTicketId}
        config={metrics.config_context ?? null}
        onClose={() => setSelectedTicketId(null)}
      />
    </div>
  )
}
