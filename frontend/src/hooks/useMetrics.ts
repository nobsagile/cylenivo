import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import type { MetricsSummary } from '@/types'

export function useMetrics(importId: string | undefined) {
  const [data, setData] = useState<MetricsSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!importId) return
    setLoading(true)
    setError(null)
    api.metrics
      .summary(importId)
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [importId])

  return { data, loading, error }
}
