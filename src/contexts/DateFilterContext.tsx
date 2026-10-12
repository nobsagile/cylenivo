import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import type { MetricFilter } from '@/services/api'

interface OriginalRange { from: string; to: string }

interface DateFilterContextValue {
  fromDate: string
  toDate: string
  /** last N completed tickets (#144) — alternative to the date range, never both */
  lastN: number | null
  setFromDate: (v: string) => void
  setToDate: (v: string) => void
  setLastN: (n: number | null) => void
  clearDates: () => void
  /** what every metric hook gets — date range or last N */
  filter: MetricFilter
  originalRange: OriginalRange | null
  setOriginalRange: (r: OriginalRange) => void
}

const DateFilterContext = createContext<DateFilterContextValue | null>(null)

export function DateFilterProvider({ importId, children }: { importId: string | undefined; children: ReactNode }) {
  const [fromDate, setFrom] = useState('')
  const [toDate, setTo] = useState('')
  const [lastN, setLast] = useState<number | null>(null)
  const [originalRange, setOriginalRange] = useState<OriginalRange | null>(null)

  // Reset everything when switching imports — during render, not in an effect,
  // so the new import never renders once with the old filter
  const [forImport, setForImport] = useState(importId)
  if (forImport !== importId) {
    setForImport(importId)
    setFrom('')
    setTo('')
    setLast(null)
    setOriginalRange(null)
  }

  const filter = useMemo<MetricFilter>(
    () => lastN ? { last: lastN } : { from: fromDate || undefined, to: toDate || undefined },
    [fromDate, toDate, lastN],
  )

  // The two filter kinds exclude each other: setting one clears the other.
  const value: DateFilterContextValue = {
    fromDate, toDate, lastN,
    setFromDate: (v) => { setFrom(v); if (v) setLast(null) },
    setToDate: (v) => { setTo(v); if (v) setLast(null) },
    setLastN: (n) => { setLast(n); if (n) { setFrom(''); setTo('') } },
    clearDates: () => { setFrom(''); setTo(''); setLast(null) },
    filter,
    originalRange, setOriginalRange,
  }

  return (
    <DateFilterContext.Provider value={value}>
      {children}
    </DateFilterContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- provider and hook belong together
export function useDateFilter() {
  const ctx = useContext(DateFilterContext)
  if (!ctx) throw new Error('useDateFilter must be used inside DateFilterProvider')
  return ctx
}
