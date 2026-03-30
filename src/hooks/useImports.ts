import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '@/services/api'
import type { ImportSession } from '@/types'

const IMPORTS_CHANGED = 'cylenivo:imports-changed'

/** Dispatch from anywhere to force useImports to reload. */
export function notifyImportsChanged() {
  window.dispatchEvent(new Event(IMPORTS_CHANGED))
}

export function useImports() {
  const [data, setData] = useState<ImportSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    api.imports
      .list()
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [location.pathname, load])

  useEffect(() => {
    window.addEventListener(IMPORTS_CHANGED, load)
    return () => window.removeEventListener(IMPORTS_CHANGED, load)
  }, [load])

  return { data, loading, error, reload: load }
}
