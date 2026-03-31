import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import type { CycleTimesResponse, LeadTimesResponse, ThroughputResponse, CfdResponse } from '@/types'

export function useCycleTimes(importId: string | undefined, from?: string | null, to?: string | null) {
  const [data, setData] = useState<CycleTimesResponse | null>(null)
  useEffect(() => {
    if (!importId) return
    api.metrics.cycleTimes(importId, { from: from || undefined, to: to || undefined }).then(setData).catch(() => {})
  }, [importId, from, to])
  return data
}

export function useLeadTimes(importId: string | undefined, from?: string | null, to?: string | null) {
  const [data, setData] = useState<LeadTimesResponse | null>(null)
  useEffect(() => {
    if (!importId) return
    api.metrics.leadTimes(importId, { from: from || undefined, to: to || undefined }).then(setData).catch(() => {})
  }, [importId, from, to])
  return data
}

export function useThroughput(importId: string | undefined, from?: string | null, to?: string | null) {
  const [data, setData] = useState<ThroughputResponse | null>(null)
  useEffect(() => {
    if (!importId) return
    api.metrics.throughput(importId, { from: from || undefined, to: to || undefined }).then(setData).catch(() => {})
  }, [importId, from, to])
  return data
}

export function useCfd(importId: string | undefined) {
  const [data, setCfdData] = useState<CfdResponse | null>(null)
  useEffect(() => {
    if (!importId) return
    api.metrics.cfd(importId).then(setCfdData).catch(() => {})
  }, [importId])
  return data
}
