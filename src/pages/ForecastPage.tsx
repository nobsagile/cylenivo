import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AlertTriangle, TrendingUp } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell,
} from 'recharts'
import { api } from '@/services/api'
import type { ForecastResponse } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
      const res = await api.metrics.forecast(importId, mode, value)
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
      if (bucket <= p50) return '#0d9488'
      if (bucket <= p85) return '#7c3aed'
      if (bucket <= p95) return '#f43f5e'
      return '#e5e7eb'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header + controls */}
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <h1 className="text-lg font-semibold text-gray-900">{t('forecast.title')}</h1>
          </div>
          <p className="text-xs text-gray-400">{t('forecast.subtitle')}</p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden shrink-0">
          <button
            onClick={() => { setMode('how_many'); setResult(null) }}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${mode === 'how_many' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t('forecast.howMany')}
          </button>
          <button
            onClick={() => { setMode('when'); setResult(null) }}
            className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-gray-200 ${mode === 'when' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t('forecast.when')}
          </button>
        </div>

        {/* Input + run */}
        <div className="flex items-center gap-2 shrink-0">
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
          <Button onClick={simulate} disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white">
            {loading ? t('forecast.simulating') : t('forecast.simulate')}
          </Button>
        </div>
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
            // when: higher percentile = more weeks (pessimistic scenario)
            <div className="flex gap-3">
              <PercentileResult label={t('forecast.pct50')} value={result.p50} unit={t('forecast.weeksForN', { n: value })} color="border-teal-200 bg-teal-50 text-teal-900" />
              <PercentileResult label={t('forecast.pct85')} value={result.p85} unit={t('forecast.weeksForN', { n: value })} color="border-violet-200 bg-violet-50 text-violet-900" />
              <PercentileResult label={t('forecast.pct95')} value={result.p95} unit={t('forecast.weeksForN', { n: value })} color="border-rose-200 bg-rose-50 text-rose-900" />
            </div>
          )}

          {/* Histogram */}
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              {t('forecast.distribution')}
            </p>
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
                  formatter={(v: number) => [v, t('forecast.simulations')]}
                  labelFormatter={(l: number) => `${l} ${unitLabel}`}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                {mode === 'how_many' ? <>
                  <ReferenceLine x={result.p95} stroke="#0d9488" strokeDasharray="3 3" label={{ value: '95%', fill: '#0d9488', fontSize: 10 }} />
                  <ReferenceLine x={result.p85} stroke="#7c3aed" strokeDasharray="3 3" label={{ value: '85%', fill: '#7c3aed', fontSize: 10 }} />
                  <ReferenceLine x={result.p50} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: '50%', fill: '#f43f5e', fontSize: 10 }} />
                </> : <>
                  <ReferenceLine x={result.p50} stroke="#0d9488" strokeDasharray="3 3" label={{ value: '50%', fill: '#0d9488', fontSize: 10 }} />
                  <ReferenceLine x={result.p85} stroke="#7c3aed" strokeDasharray="3 3" label={{ value: '85%', fill: '#7c3aed', fontSize: 10 }} />
                  <ReferenceLine x={result.p95} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: '95%', fill: '#f43f5e', fontSize: 10 }} />
                </>}
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {result.histogram.map(({ bucket }) => (
                    <Cell key={bucket} fill={barColor(bucket)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

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
