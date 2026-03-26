import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import type { ImportSession } from '@/types'

export function useImports() {
  const [data, setData] = useState<ImportSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    api.imports
      .list()
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  return { data, loading, error, reload: load }
}
