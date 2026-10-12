import { useState, useEffect, useCallback } from 'react'
import { api, type MetricFilter } from '@/services/api'
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

/** Shared shape for all chart hooks: same key, same guards, one place to change. */
function useChartEndpoint<T>(
  name: string,
  importId: string | undefined,
  { from, to, last }: MetricFilter,
  rev: number | undefined,
  call: (importId: string, filter: MetricFilter) => Promise<T>,
) {
  const dataRev = useDataReplacedRev(importId)
  const { data, loading, error } = useKeyedFetch<T>(
    fetchKey(importId, name, from, to, last, rev, dataRev),
    () => call(importId!, { from: from || undefined, to: to || undefined, last: last || undefined }),
  )
  return { data, loading, error }
}

export function useCycleTimes(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<CycleTimesResponse>('cycle-times', importId, filter, rev, api.metrics.cycleTimes)
}

export function useLeadTimes(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<LeadTimesResponse>('lead-times', importId, filter, rev, api.metrics.leadTimes)
}

export function useThroughput(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<ThroughputResponse>('throughput', importId, filter, rev, api.metrics.throughput)
}

export function useCfd(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<CfdResponse>('cfd', importId, filter, rev, api.metrics.cfd)
}

export function useTimeInStatus(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<TimeInStatusResponse>('time-in-status', importId, filter, rev, api.metrics.timeInStatus)
}

export function useRework(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<ReworkResponse>('rework', importId, filter, rev, api.metrics.rework)
}

export function useCycleTimeByType(importId: string | undefined, filter: MetricFilter = {}, rev?: number) {
  return useChartEndpoint<CycleTimeByTypeResponse>('cycle-time-by-type', importId, filter, rev, api.metrics.cycleTimeByType)
}
