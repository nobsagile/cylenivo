import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'
import type { MetricsSummary } from '@/types'

export function useMetrics(importId: string | undefined, from?: string, to?: string) {
  const [data, setData] = useState<MetricsSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rev, setRev] = useState(0)

  useEffect(() => {
    if (!importId) return
    setLoading(true)
    setError(null)
    api.metrics
      .summary(importId, { from: from || undefined, to: to || undefined })
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [importId, from, to, rev])

  const refetch = useCallback(() => setRev(r => r + 1), [])

  return { data, loading, error, refetch }
}
