import { useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  dataFrom: string | null
  dataTo: string | null
  fromDate: string
  toDate: string
  onFromChange: (v: string) => void
  onToChange: (v: string) => void
  onClear: () => void
}

// Parse any ISO string to a UTC midnight date string (YYYY-MM-DD)
function toDateOnly(iso: string): string {
  return iso.slice(0, 10)
}

// Convert YYYY-MM-DD to milliseconds since epoch (UTC midnight)
function dateOnlyToMs(s: string): number {
  const [y, m, d] = s.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

function msToDateOnly(ms: number): string {
  const d = new Date(ms)
  return d.toISOString().slice(0, 10)
}

function formatLabel(dateOnly: string): string {
  const [y, m] = dateOnly.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

export function DateRangeSlider({ dataFrom, dataTo, fromDate, toDate, onFromChange, onToChange, onClear }: Props) {
  const { t } = useTranslation()

  const baseFrom = dataFrom ? toDateOnly(dataFrom) : null
  const baseTo = dataTo ? toDateOnly(dataTo) : null

  const totalDays = useMemo(() => {
    if (!baseFrom || !baseTo) return 0
    return Math.round((dateOnlyToMs(baseTo) - dateOnlyToMs(baseFrom)) / 86400000)
  }, [baseFrom, baseTo])

  const selectedStart = useMemo(() => {
    if (!fromDate || !baseFrom) return 0
    return Math.max(0, Math.min(totalDays, Math.round((dateOnlyToMs(fromDate) - dateOnlyToMs(baseFrom)) / 86400000)))
  }, [fromDate, baseFrom, totalDays])

  const selectedEnd = useMemo(() => {
    if (!toDate || !baseFrom) return totalDays
    return Math.max(0, Math.min(totalDays, Math.round((dateOnlyToMs(toDate) - dateOnlyToMs(baseFrom)) / 86400000)))
  }, [toDate, baseFrom, totalDays])

  const ticks = useMemo(() => {
    if (!baseFrom || !baseTo || totalDays === 0) return []
    const result: { day: number; label: string }[] = []
    const [y0, m0] = baseFrom.split('-').map(Number)
    const endMs = dateOnlyToMs(baseTo)
    let y = y0, m = m0
    while (true) {
      const ms = Date.UTC(y, m - 1, 1)
      if (ms > endMs) break
      const day = Math.round((ms - dateOnlyToMs(baseFrom)) / 86400000)
      if (day >= 0 && day <= totalDays) {
        result.push({ day, label: new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) })
      }
      m++
      if (m > 12) { m = 1; y++ }
    }
    return result
  }, [baseFrom, baseTo, totalDays])

  if (!baseFrom || !baseTo || totalDays === 0) return null

  function dayToDateOnly(day: number): string {
    return msToDateOnly(dateOnlyToMs(baseFrom!) + day * 86400000)
  }

  function handleChange([start, end]: number[]) {
    const newFrom = dayToDateOnly(start)
    const newTo = dayToDateOnly(end)
    onFromChange(start === 0 ? '' : newFrom)
    onToChange(end === totalDays ? '' : newTo)
  }

  const isFiltered = !!(fromDate || toDate)
  const displayFrom = fromDate || baseFrom
  const displayTo = toDate || baseTo

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{formatLabel(displayFrom)}</span>
          <span className="text-gray-300">→</span>
          <span className="text-sm font-medium text-gray-700">{formatLabel(displayTo)}</span>
          {isFiltered && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-1"
            >
              <X className="w-3.5 h-3.5" />
              {t('common.clearFilter')}
            </button>
          )}
        </div>
        {!isFiltered && (
          <span className="text-xs text-gray-400">{t('common.allData')}</span>
        )}
      </div>

      <div className="relative px-1">
        <Slider
          min={0}
          max={totalDays}
          step={1}
          value={[selectedStart, selectedEnd]}
          onValueChange={handleChange}
          className="w-full"
        />
        <div className="relative mt-2 h-5">
          {ticks.map(({ day, label }) => {
            const pct = (day / totalDays) * 100
            return (
              <span
                key={day}
                className="absolute text-[10px] text-gray-400 -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${pct}%` }}
              >
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
