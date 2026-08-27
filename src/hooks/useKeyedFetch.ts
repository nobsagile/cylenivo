import { useState, useEffect } from 'react'

/**
 * Fetches data that belongs to a key (dataset + filters) and never returns data
 * from a different key.
 *
 * The bug this replaces: every data hook did `fetch().then(setData)` with no
 * cancellation and no reset. Switching from a large, slow dataset to a small,
 * fast one meant the slow response landed last — the dashboard showed dataset
 * A's numbers under dataset B's name. And because `data` was never cleared on
 * key change, the old dataset's values stayed on screen instead of a skeleton.
 *
 * Two guards, deliberately both:
 *  - `cancelled` stops a superseded request from calling setState at all
 *  - the stored key is compared at render time, so even a response that slips
 *    through can never be displayed under the wrong key
 *
 * The key must encode everything the fetcher reads. Then a key change means
 * "different data", which is exactly when the old result must disappear.
 */
export function useKeyedFetch<T>(
  key: string | null,
  fetcher: () => Promise<T>,
): { data: T | null; loading: boolean; error: string | null } {
  const [result, setResult] = useState<{ key: string; data: T | null; error: string | null } | null>(null)

  useEffect(() => {
    if (key === null) return
    let cancelled = false

    fetcher()
      .then(data => { if (!cancelled) setResult({ key, data, error: null }) })
      .catch((e: unknown) => {
        if (!cancelled) {
          setResult({ key, data: null, error: e instanceof Error ? e.message : 'Error' })
        }
      })

    return () => { cancelled = true }
    // `fetcher` is intentionally not a dependency: the key encodes every input
    // the fetcher reads, so the closure captured when the key changed is the
    // correct one. Including it would refetch on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Derived, not stored: a result for a stale key is invisible immediately on
  // render — no effect needed to clear it, so there is no frame showing the
  // previous dataset's numbers.
  const current = result !== null && result.key === key ? result : null

  return {
    data: current?.data ?? null,
    error: current?.error ?? null,
    loading: key !== null && current === null,
  }
}

/** Builds a stable key from parts. `null` parts mean "nothing to fetch". */
export function fetchKey(...parts: (string | number | null | undefined)[]): string | null {
  if (parts[0] === null || parts[0] === undefined || parts[0] === '') return null
  return parts.map(p => p ?? '').join('|')
}
