import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'
import type { MetricsSummary } from '@/types'
import { DATA_REPLACED } from '@/hooks/useImports'
import { useKeyedFetch, fetchKey } from '@/hooks/useKeyedFetch'

export function useMetrics(importId: string | undefined, from?: string, to?: string) {
  const [rev, setRev] = useState(0)
  const refetch = useCallback(() => setRev(r => r + 1), [])

  const { data, loading, error } = useKeyedFetch<MetricsSummary>(
    fetchKey(importId, from, to, rev),
    () => api.metrics.summary(importId!, { from: from || undefined, to: to || undefined }),
  )

  useEffect(() => {
    if (!importId) return
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail?.importId === importId) refetch()
    }
    window.addEventListener(DATA_REPLACED, handler)
    return () => window.removeEventListener(DATA_REPLACED, handler)
  }, [importId, refetch])

  return { data, loading, error, refetch }
}
