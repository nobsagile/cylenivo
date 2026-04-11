import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useOutletContext } from 'react-router-dom'
import { AlertTriangle, TrendingUp, Info } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell,
} from 'recharts'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import { useDateFilter } from '@/contexts/DateFilterContext'
import type { ForecastResponse } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { PageHeader } from '@/components/layout/PageHeader'
import { DateRangeSlider } from '@/components/metrics/DateRangeSlider'
import type { ProjectLayoutContext } from '@/components/layout/ProjectLayout'

type Mode = 'how_many' | 'when'

function PercentileResult({ label, value, unit, color }: {
  label: string; value: number; unit: string; color: string
}) {
  return (
    <div className={`flex-1 rounded-xl border p-4 ${color}`}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-70">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs mt-0.5 opacity-60">{unit}</p>
    </div>
  )
}

export default function ForecastPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { fromDate, toDate } = useDateFilter()
  const { data: metrics } = useMetrics(importId, fromDate || undefined, toDate || undefined)
  const { dateRange } = useOutletContext<ProjectLayoutContext>()

  const [mode, setMode] = useState<Mode>('how_many')
  const [value, setValue] = useState(4)
  const [result, setResult] = useState<ForecastResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function simulate() {
    if (!importId || !value) return
    setLoading(true)
    setError(null)
    try {
      const res = await api.metrics.forecast(importId, mode, value, { from: fromDate || undefined, to: toDate || undefined })
      setResult(res)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Simulation failed')
    } finally {
      setLoading(false)
    }
  }

  const lowData = result && result.total_completed < 8
  const inputLabel = mode === 'how_many' ? t('forecast.weeks') : t('forecast.tickets')
  const unitLabel = mode === 'how_many' ? t('forecast.tickets') : t('forecast.weeks')

  const p50 = result?.p50 ?? 0
  const p85 = result?.p85 ?? 0
  const p95 = result?.p95 ?? 0

  // how_many: p95 < p85 < p50 (inverted — lower = safer commitment)
  // when:     p50 < p85 < p95 (normal — lower = faster)
  function barColor(bucket: number) {
    if (mode === 'how_many') {
      if (bucket <= p95) return '#0d9488'   // teal  — 95% confident zone
      if (bucket <= p85) return '#7c3aed'   // violet — 85% confident zone
      if (bucket <= p50) return '#f43f5e'   // rose  — 50% confident zone
      return '#e5e7eb'
    } else {
      // when: fewer weeks = faster = risky, more weeks = slower = safe
      if (bucket <= p50) return '#f43f5e'   // rose  — only 50% confident zone
      if (bucket <= p85) return '#7c3aed'   // violet — 85% confident zone
      if (bucket <= p95) return '#0d9488'   // teal  — 95% confident zone
      return '#e5e7eb'
    }
  }

  return (
    <div className="space-y-6">
      {metrics ? (
        <PageHeader
          view={t('forecast.title')}
          name={metrics.project_key}
          subtitle={t('forecast.subtitle')}
          completed={metrics.completed_ticket_count}
          total={metrics.ticket_count}
          excluded={metrics.excluded_ticket_count}
        />
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('forecast.title')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{t('forecast.subtitle')}</p>
        </div>
      )}

      {dateRange?.from && dateRange?.to && (
        <DateRangeSlider dataFrom={dateRange.from} dataTo={dateRange.to} />
      )}

      {/* Simulation controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {(['how_many', 'when'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(null) }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m === 'how_many' ? t('forecast.howMany') : t('forecast.when')}
            </button>
          ))}
        </div>

        <Input
          type="number"
          min={1}
          max={mode === 'how_many' ? 52 : 500}
          value={value}
          onChange={e => setValue(Math.max(1, parseInt(e.target.value) || 1))}
          onKeyDown={e => e.key === 'Enter' && simulate()}
          className="w-20 text-center"
        />
        <span className="text-sm text-gray-500">{inputLabel}</span>
        <Button onClick={simulate} disabled={loading}>
          {loading ? t('forecast.simulating') : t('forecast.simulate')}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {result && (
        <>
          {lowData && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {t('forecast.lowDataWarning', { count: result.total_completed })}
            </div>
          )}

          {/* Percentile cards */}
          {mode === 'how_many' ? (
            // how_many: higher confidence = fewer tickets (safer commitment)
            // card order: 95% conf (teal/safe) → 85% conf → 50% conf (risky)
            <div className="flex gap-3">
              <PercentileResult label={t('forecast.confidence95')} value={result.p95} unit={t('forecast.atLeastTicketsInN', { n: value })} color="border-teal-200 bg-teal-50 text-teal-900" />
              <PercentileResult label={t('forecast.confidence85')} value={result.p85} unit={t('forecast.atLeastTicketsInN', { n: value })} color="border-violet-200 bg-violet-50 text-violet-900" />
              <PercentileResult label={t('forecast.confidence50')} value={result.p50} unit={t('forecast.atLeastTicketsInN', { n: value })} color="border-rose-200 bg-rose-50 text-rose-900" />
            </div>
          ) : (
            // when: more weeks = safer commitment (teal), fewer weeks = optimistic/risky (rose)
            <div className="flex gap-3">
              <PercentileResult label={t('forecast.confidence95')} value={result.p95} unit={t('forecast.weeksForN', { n: value })} color="border-teal-200 bg-teal-50 text-teal-900" />
              <PercentileResult label={t('forecast.confidence85')} value={result.p85} unit={t('forecast.weeksForN', { n: value })} color="border-violet-200 bg-violet-50 text-violet-900" />
              <PercentileResult label={t('forecast.confidence50')} value={result.p50} unit={t('forecast.weeksForN', { n: value })} color="border-rose-200 bg-rose-50 text-rose-900" />
            </div>
          )}

          {/* Histogram */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                {t('forecast.distribution')}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="text-xs text-gray-600 space-y-1.5">
                      <p className="font-semibold text-gray-800 mb-1">{t('forecast.distribution')}</p>
                      <p>{t('help.forecastDistribution')}</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={result.histogram} barCategoryGap="10%">
                <XAxis
                  dataKey="bucket"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(v) => [v as number, t('forecast.simulations')]}
                  labelFormatter={(l) => `${l} ${unitLabel}`}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  cursor={false}
                  wrapperStyle={{ zIndex: 100 }}
                />
                {mode === 'how_many' ? <>
                  <ReferenceLine x={result.p95} stroke="#0d9488" strokeDasharray="3 3" label={{ value: '95%', fill: '#0d9488', fontSize: 10 }} />
                  <ReferenceLine x={result.p85} stroke="#7c3aed" strokeDasharray="3 3" label={{ value: '85%', fill: '#7c3aed', fontSize: 10 }} />
                  <ReferenceLine x={result.p50} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: '50%', fill: '#f43f5e', fontSize: 10 }} />
                </> : <>
                  <ReferenceLine x={result.p50} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: '50%', fill: '#f43f5e', fontSize: 10 }} />
                  <ReferenceLine x={result.p85} stroke="#7c3aed" strokeDasharray="3 3" label={{ value: '85%', fill: '#7c3aed', fontSize: 10 }} />
                  <ReferenceLine x={result.p95} stroke="#0d9488" strokeDasharray="3 3" label={{ value: '95%', fill: '#0d9488', fontSize: 10 }} />
                </>}
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {result.histogram.map(({ bucket }: { bucket: number; count: number }) => (
                    <Cell key={bucket} fill={barColor(bucket)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Data basis */}
          <p className="text-[11px] text-gray-400 text-center">
            {t('forecast.basis', {
              weeks: result.weeks_of_data,
              weeksWithData: result.weeks_with_completions,
              completed: result.total_completed,
            })}
          </p>
        </>
      )}

      {!result && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <TrendingUp className="w-8 h-8 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-500">{t('forecast.empty')}</p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">{t('forecast.emptyHint')}</p>
        </div>
      )}
    </div>
  )
}
