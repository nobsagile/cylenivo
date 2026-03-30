import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface DateFilterContextValue {
  fromDate: string
  toDate: string
  setFromDate: (v: string) => void
  setToDate: (v: string) => void
  clearDates: () => void
}

const DateFilterContext = createContext<DateFilterContextValue | null>(null)

export function DateFilterProvider({ importId, children }: { importId: string | undefined; children: ReactNode }) {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Reset when switching imports
  useEffect(() => {
    setFromDate('')
    setToDate('')
  }, [importId])

  return (
    <DateFilterContext.Provider value={{
      fromDate, toDate, setFromDate, setToDate,
      clearDates: () => { setFromDate(''); setToDate('') },
    }}>
      {children}
    </DateFilterContext.Provider>
  )
}

export function useDateFilter() {
  const ctx = useContext(DateFilterContext)
  if (!ctx) throw new Error('useDateFilter must be used inside DateFilterProvider')
  return ctx
}
