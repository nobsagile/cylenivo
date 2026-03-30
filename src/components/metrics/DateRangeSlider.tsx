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

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function formatLabel(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

export function DateRangeSlider({ dataFrom, dataTo, fromDate, toDate, onFromChange, onToChange, onClear }: Props) {
  const { t } = useTranslation()

  const { minDay, maxDay, totalDays } = useMemo(() => {
    if (!dataFrom || !dataTo) return { minDay: 0, maxDay: 0, totalDays: 0 }
    const min = new Date(dataFrom).getTime()
    const max = new Date(dataTo).getTime()
    const totalDays = Math.round((max - min) / 86400000)
    return { minDay: 0, maxDay: totalDays, totalDays }
  }, [dataFrom, dataTo])

  const selectedStart = useMemo(() => {
    if (!fromDate || !dataFrom) return minDay
    const base = new Date(dataFrom).getTime()
    const sel = new Date(fromDate).getTime()
    return Math.max(minDay, Math.min(maxDay, Math.round((sel - base) / 86400000)))
  }, [fromDate, dataFrom, minDay, maxDay])

  const selectedEnd = useMemo(() => {
    if (!toDate || !dataFrom) return maxDay
    const base = new Date(dataFrom).getTime()
    const sel = new Date(toDate).getTime()
    return Math.max(minDay, Math.min(maxDay, Math.round((sel - base) / 86400000)))
  }, [toDate, dataFrom, minDay, maxDay])

  if (!dataFrom || !dataTo || totalDays === 0) return null

  function dayToIso(day: number): string {
    const base = new Date(dataFrom!).getTime()
    return toIso(new Date(base + day * 86400000))
  }

  // Tick marks: one per month
  const ticks = useMemo(() => {
    const result: { day: number; label: string }[] = []
    const base = new Date(dataFrom!)
    let cur = new Date(base.getFullYear(), base.getMonth(), 1)
    const end = new Date(dataTo!)
    while (cur <= end) {
      const day = Math.round((cur.getTime() - base.getTime()) / 86400000)
      if (day >= 0 && day <= totalDays) {
        result.push({ day, label: cur.toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) })
      }
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)
    }
    return result
  }, [dataFrom, dataTo, totalDays])

  const isFiltered = !!(fromDate || toDate)
  const displayFrom = fromDate || dataFrom!
  const displayTo = toDate || dataTo!

  function handleChange([start, end]: number[]) {
    const newFrom = dayToIso(start)
    const newTo = dayToIso(end)
    onFromChange(newFrom === dataFrom ? '' : newFrom)
    onToChange(newTo === dataTo ? '' : newTo)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {formatLabel(displayFrom)}
          </span>
          <span className="text-gray-300">→</span>
          <span className="text-sm font-medium text-gray-700">
            {formatLabel(displayTo)}
          </span>
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
          min={minDay}
          max={maxDay}
          step={1}
          value={[selectedStart, selectedEnd]}
          onValueChange={handleChange}
          className="w-full"
        />

        {/* Tick marks */}
        <div className="relative mt-2 h-5">
          {ticks.map(({ day, label }) => {
            const pct = totalDays === 0 ? 0 : (day / totalDays) * 100
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
