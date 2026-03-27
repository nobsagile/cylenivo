import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import type { LLMStatus } from '@/types'

export function useOllamaStatus() {
  const [data, setData] = useState<LLMStatus | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.llm
      .status()
      .then(setData)
      .catch(() => setData({ available: false, models: [], recommended_model: 'qwen3:14b' }))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}
