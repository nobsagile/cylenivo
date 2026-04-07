import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import type { CycleTimesResponse, LeadTimesResponse, ThroughputResponse, CfdResponse } from '@/types'

export function useCycleTimes(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  const [data, setData] = useState<CycleTimesResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!importId) return
    setError(null)
    api.metrics.cycleTimes(importId, { from: from || undefined, to: to || undefined }).then(setData).catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
  }, [importId, from, to, rev])
  return { data, error }
}

export function useLeadTimes(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  const [data, setData] = useState<LeadTimesResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!importId) return
    setError(null)
    api.metrics.leadTimes(importId, { from: from || undefined, to: to || undefined }).then(setData).catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
  }, [importId, from, to, rev])
  return { data, error }
}

export function useThroughput(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  const [data, setData] = useState<ThroughputResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!importId) return
    setError(null)
    api.metrics.throughput(importId, { from: from || undefined, to: to || undefined }).then(setData).catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
  }, [importId, from, to, rev])
  return { data, error }
}

export function useCfd(importId: string | undefined, from?: string | null, to?: string | null, rev?: number) {
  const [data, setCfdData] = useState<CfdResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!importId) return
    setError(null)
    api.metrics.cfd(importId, { from: from || undefined, to: to || undefined }).then(setCfdData).catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
  }, [importId, from, to, rev])
  return { data, error }
}
