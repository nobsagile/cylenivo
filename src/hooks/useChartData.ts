import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'
import type {
  CycleTimesResponse,
  LeadTimesResponse,
  ThroughputResponse,
  CfdResponse,
  TimeInStatusResponse,
  ReworkResponse,
  CycleTimeByTypeResponse,
} from '@/types'
import { DATA_REPLACED } from '@/hooks/useImports'
import { useKeyedFetch, fetchKey } from '@/hooks/useKeyedFetch'

function useDataReplacedRev(importId: string | undefined): number {
  const [rev, setRev] = useState(0)
  const bump = useCallback(() => setRev(r => r + 1), [])
  useEffect(() => {
    if (!importId) return
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail?.importId === importId) bump()
    }
    window.addEventListener(DATA_REPLACED, handler)
    return () => window.removeEventListener(DATA_REPLACED, handler)
  }, [importId, bump])
  return rev
}

type Dates = { from?: string | null; to?: string | null }

/** Shared shape for all chart hooks: same key, same guards, one place to change. */
function useChartEndpoint<T>(
  name: string,
  importId: string | undefined,
  { from, to }: Dates,
  rev: number | undefined,
  call: (importId: string, dates: { from?: string; to?: string }) => Promise<T>,
) {
  const dataRev = useDataReplacedRev(importId)
  const { data, loading, error } = useKeyedFetch<T>(
    fetchKey(importId, name, from, to, rev, dataRev),
    () => call(importId!, { from: from || undefined, to: to || undefined }),
  )
  return { data, loading, error }
}

export function useCycleTimes(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<CycleTimesResponse>('cycle-times', importId, { from, to }, rev, api.metrics.cycleTimes)
}

export function useLeadTimes(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<LeadTimesResponse>('lead-times', importId, { from, to }, rev, api.metrics.leadTimes)
}

export function useThroughput(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<ThroughputResponse>('throughput', importId, { from, to }, rev, api.metrics.throughput)
}

export function useCfd(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<CfdResponse>('cfd', importId, { from, to }, rev, api.metrics.cfd)
}

export function useTimeInStatus(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<TimeInStatusResponse>('time-in-status', importId, { from, to }, rev, api.metrics.timeInStatus)
}

export function useRework(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<ReworkResponse>('rework', importId, { from, to }, rev, api.metrics.rework)
}

export function useCycleTimeByType(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  return useChartEndpoint<CycleTimeByTypeResponse>('cycle-time-by-type', importId, { from, to }, rev, api.metrics.cycleTimeByType)
}
