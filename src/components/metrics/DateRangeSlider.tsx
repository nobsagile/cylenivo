import { useMemo, useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { X, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDateFilter } from '@/contexts/DateFilterContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

interface Props {
  dataFrom: string | null
  dataTo: string | null
}

function toDateOnly(iso: string): string {
  return iso.slice(0, 10)
}

function dateOnlyToMs(s: string): number {
  const [y, m, d] = s.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

function msToDateOnly(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}

function formatDate(dateOnly: string): string {
  const [y, m, d] = dateOnly.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export function DateRangeSlider({ dataFrom, dataTo }: Props) {
  const { t } = useTranslation()
  const { fromDate, toDate, setFromDate, setToDate, clearDates, originalRange, setOriginalRange } = useDateFilter()

  // Capture original range once — only when no filter is active and real data is available.
  // Stored in context so it survives component unmounts (e.g. loading skeleton).
  useEffect(() => {
    if (!fromDate && !toDate && dataFrom && dataTo) {
      setOriginalRange({ from: toDateOnly(dataFrom), to: toDateOnly(dataTo) })
    }
  }, [dataFrom, dataTo, fromDate, toDate])

  // Stable slider bounds always come from the original (unfiltered) range
  const baseFrom = originalRange?.from ?? (dataFrom ? toDateOnly(dataFrom) : null)
  const baseTo = originalRange?.to ?? (dataTo ? toDateOnly(dataTo) : null)

  const totalDays = useMemo(() => {
    if (!baseFrom || !baseTo) return 0
    return Math.round((dateOnlyToMs(baseTo) - dateOnlyToMs(baseFrom)) / 86400000)
  }, [baseFrom, baseTo])

  const contextStart = useMemo(() => {
    if (!fromDate || !baseFrom || totalDays === 0) return 0
    return Math.max(0, Math.min(totalDays, Math.round((dateOnlyToMs(fromDate) - dateOnlyToMs(baseFrom)) / 86400000)))
  }, [fromDate, baseFrom, totalDays])

  const contextEnd = useMemo(() => {
    if (!toDate || !baseFrom || totalDays === 0) return totalDays
    return Math.max(0, Math.min(totalDays, Math.round((dateOnlyToMs(toDate) - dateOnlyToMs(baseFrom)) / 86400000)))
  }, [toDate, baseFrom, totalDays])

  // Local state drives the slider for smooth dragging.
  // Synced from context only when context changes externally (clear, project switch).
  const [localValue, setLocalValue] = useState<[number, number]>([0, 0])

  useEffect(() => {
    setLocalValue([contextStart, contextEnd])
  }, [contextStart, contextEnd])

  const ticks = useMemo(() => {
    if (!baseFrom || !baseTo || totalDays === 0) return []
    const result: { day: number; label: string }[] = []
    const [y0, m0] = baseFrom.split('-').map(Number)
    const endMs = dateOnlyToMs(baseTo)
    let y = y0, m = m0
    for (let i = 0; i < 200; i++) {
      const ms = Date.UTC(y, m - 1, 1)
      if (ms > endMs) break
      const day = Math.round((ms - dateOnlyToMs(baseFrom)) / 86400000)
      if (day >= 0 && day <= totalDays) {
        result.push({ day, label: new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) })
      }
      m++; if (m > 12) { m = 1; y++ }
    }
    return result
  }, [baseFrom, baseTo, totalDays])

  if (!baseFrom || !baseTo || totalDays === 0) return null

  function dayToDate(day: number): string {
    return msToDateOnly(dateOnlyToMs(baseFrom!) + day * 86400000)
  }

  function handleCommit([start, end]: number[]) {
    setFromDate(start === 0 ? '' : dayToDate(start))
    setToDate(end === totalDays ? '' : dayToDate(end))
  }

  const isFiltered = !!(fromDate || toDate)
  const displayFrom = localValue[0] === 0 ? baseFrom : dayToDate(localValue[0])
  const displayTo = localValue[1] === totalDays ? baseTo : dayToDate(localValue[1])

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
            {t('dashboard.timeRange')}
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="text-xs text-gray-600 space-y-1.5">
                  <p className="font-semibold text-gray-800 mb-1">{t('dashboard.timeRange')}</p>
                  <p>{t('help.timeRange')}</p>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{formatDate(displayFrom)}</span>
            <span className="text-gray-300">→</span>
            <span className="text-sm font-medium text-gray-700">{formatDate(displayTo)}</span>
            {isFiltered ? (
              <button
                onClick={clearDates}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-1"
              >
                <X className="w-3.5 h-3.5" />
                {t('common.clearFilter')}
              </button>
            ) : (
              <span className="text-xs text-gray-400 ml-1">{t('common.allData')}</span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="relative px-1">
          <Slider
            min={0}
            max={totalDays}
            step={1}
            value={localValue}
            onValueChange={(v) => setLocalValue(v as [number, number])}
            onValueCommit={handleCommit}
            className="w-full"
          />
          <div className="relative mt-2 h-5">
            {ticks.map(({ day, label }) => (
              <span
                key={day}
                className="absolute text-[10px] text-gray-400 -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${(day / totalDays) * 100}%` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
