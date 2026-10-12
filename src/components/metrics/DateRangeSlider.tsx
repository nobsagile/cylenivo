import { useMemo, useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { X, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDateFilter } from '@/contexts/DateFilterContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

interface Props {
  dataFrom: string | null
  dataTo: string | null
  /** completed tickets in the unfiltered dataset — disables chips above it */
  completedCount?: number
  /** date range of the current selection (filtered summary) — shown while "last N" is active */
  selectedRange?: { from: string | null; to: string | null }
}

const LAST_N_PRESETS = [20, 30, 50, 100]

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

export function DateRangeSlider({ dataFrom, dataTo, completedCount, selectedRange }: Props) {
  const { t } = useTranslation()
  const { fromDate, toDate, lastN, setFromDate, setToDate, setLastN, clearDates, originalRange, setOriginalRange } = useDateFilter()

  // While "last N" is active the slider shows the period those N tickets cover.
  // Dragging it switches back to a date range, starting from that period.
  const shownFrom = lastN ? (selectedRange?.from ? toDateOnly(selectedRange.from) : '') : fromDate
  const shownTo = lastN ? (selectedRange?.to ? toDateOnly(selectedRange.to) : '') : toDate

  // Capture original range once — only when no filter is active and real data is available.
  // Stored in context so it survives component unmounts (e.g. loading skeleton).
  useEffect(() => {
    if (!fromDate && !toDate && !lastN && dataFrom && dataTo) {
      setOriginalRange({ from: toDateOnly(dataFrom), to: toDateOnly(dataTo) })
    }
  }, [dataFrom, dataTo, fromDate, toDate, lastN])

  // Stable slider bounds always come from the original (unfiltered) range
  const baseFrom = originalRange?.from ?? (dataFrom ? toDateOnly(dataFrom) : null)
  const baseTo = originalRange?.to ?? (dataTo ? toDateOnly(dataTo) : null)

  const totalDays = useMemo(() => {
    if (!baseFrom || !baseTo) return 0
    return Math.round((dateOnlyToMs(baseTo) - dateOnlyToMs(baseFrom)) / 86400000)
  }, [baseFrom, baseTo])

  const contextStart = useMemo(() => {
    if (!shownFrom || !baseFrom || totalDays === 0) return 0
    return Math.max(0, Math.min(totalDays, Math.round((dateOnlyToMs(shownFrom) - dateOnlyToMs(baseFrom)) / 86400000)))
  }, [shownFrom, baseFrom, totalDays])

  const contextEnd = useMemo(() => {
    if (!shownTo || !baseFrom || totalDays === 0) return totalDays
    return Math.max(0, Math.min(totalDays, Math.round((dateOnlyToMs(shownTo) - dateOnlyToMs(baseFrom)) / 86400000)))
  }, [shownTo, baseFrom, totalDays])

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
    setLastN(null)
    setFromDate(start === 0 ? '' : dayToDate(start))
    setToDate(end === totalDays ? '' : dayToDate(end))
  }

  const isFiltered = !!(fromDate || toDate || lastN)
  const tooFew = lastN !== null && completedCount !== undefined && lastN > completedCount
  const displayFrom = localValue[0] === 0 ? baseFrom : dayToDate(localValue[0])
  const displayTo = localValue[1] === totalDays ? baseTo : dayToDate(localValue[1])

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            {t('dashboard.timeRange')}
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="text-xs text-gray-600 space-y-1.5">
                  <p className="font-semibold text-gray-800 mb-1">{t('dashboard.timeRange')}</p>
                  <p>{t('help.timeRange')}</p>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <div className="flex items-center gap-2">
            {lastN && (
              <span className="text-xs font-medium text-violet-700">
                {t('dashboard.lastNActive', { count: lastN })} ·
              </span>
            )}
            <span className="text-xs text-gray-500">{formatDate(displayFrom)}</span>
            <span className="text-gray-300 text-xs">→</span>
            <span className="text-xs text-gray-500">{formatDate(displayTo)}</span>
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
            className={lastN ? 'w-full opacity-60' : 'w-full'}
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
        {/* keyed: the custom field restarts from lastN whenever it changes from outside */}
        <LastNPicker key={lastN ?? ''} lastN={lastN} completedCount={completedCount} onSelect={setLastN} />
        {tooFew && (
          <p className="text-xs text-amber-600 mt-2">{t('dashboard.lastNTooFew', { count: completedCount })}</p>
        )}
      </CardContent>
    </Card>
  )
}

function LastNPicker({ lastN, completedCount, onSelect }: {
  lastN: number | null
  completedCount?: number
  onSelect: (n: number | null) => void
}) {
  const { t } = useTranslation()
  const isCustom = lastN !== null && !LAST_N_PRESETS.includes(lastN)
  const [draft, setDraft] = useState(isCustom ? String(lastN) : '')

  function commitDraft() {
    const n = parseInt(draft, 10)
    if (!draft.trim()) return
    if (Number.isInteger(n) && n >= 1) onSelect(n)
    else setDraft(isCustom ? String(lastN) : '')
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-3">
      <span className="text-xs text-gray-500">{t('dashboard.lastNPrefix')}</span>
      {LAST_N_PRESETS.map(n => {
        const active = lastN === n
        return (
          <button
            key={n}
            type="button"
            aria-pressed={active}
            aria-label={t('dashboard.lastNActive', { count: n })}
            disabled={completedCount !== undefined && n > completedCount}
            onClick={() => onSelect(active ? null : n)}
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              active
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-700'
            }`}
          >
            {n}
          </button>
        )
      })}
      <Input
        type="number"
        min={1}
        inputMode="numeric"
        value={draft}
        placeholder={t('dashboard.lastNCustomPlaceholder')}
        aria-label={t('dashboard.lastNCustomLabel')}
        onChange={e => setDraft(e.target.value)}
        onBlur={commitDraft}
        onKeyDown={e => { if (e.key === 'Enter') commitDraft() }}
        className={`h-6 w-16 px-2 py-0 text-xs md:text-xs rounded-full ${isCustom ? 'border-violet-600 ring-1 ring-violet-600' : ''}`}
      />
      <span className="text-xs text-gray-500">{t('dashboard.lastNSuffix')}</span>
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" aria-label={t('help.titles.lastNTickets')} className="text-gray-300 hover:text-gray-500 transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="text-xs text-gray-600 space-y-1.5">
            <p className="font-semibold text-gray-800 mb-1">{t('help.titles.lastNTickets')}</p>
            <p>{t('help.lastNTickets')}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
