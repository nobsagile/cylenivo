import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useKeyedFetch, fetchKey } from './useKeyedFetch'
import { useMetrics } from './useMetrics'
import { useCycleTimes } from './useChartData'
import { api } from '@/services/api'

vi.mock('@/services/api', () => ({
  api: {
    metrics: {
      summary: vi.fn(),
      cycleTimes: vi.fn(),
      leadTimes: vi.fn(),
      throughput: vi.fn(),
      cfd: vi.fn(),
      timeInStatus: vi.fn(),
      rework: vi.fn(),
      cycleTimeByType: vi.fn(),
    },
  },
}))

afterEach(() => vi.clearAllMocks())

/** A promise you resolve by hand, so response order can be inverted on purpose. */
function deferred<T>() {
  let resolve!: (v: T) => void
  let reject!: (e: unknown) => void
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej })
  return { promise, resolve, reject }
}

describe('fetchKey', () => {
  it('returns null when the first part is missing — nothing to fetch', () => {
    expect(fetchKey(undefined)).toBeNull()
    expect(fetchKey(null)).toBeNull()
    expect(fetchKey('')).toBeNull()
  })

  it('distinguishes keys that differ in any part', () => {
    expect(fetchKey('imp-1', 'a')).not.toBe(fetchKey('imp-2', 'a'))
    expect(fetchKey('imp-1', 'a')).not.toBe(fetchKey('imp-1', 'b'))
    expect(fetchKey('imp-1', undefined, '2026-01-01')).not.toBe(fetchKey('imp-1', undefined, '2026-02-01'))
  })

  it('is stable for identical input', () => {
    expect(fetchKey('imp-1', 'x', 0)).toBe(fetchKey('imp-1', 'x', 0))
  })
})

describe('useKeyedFetch — the stale-response race', () => {
  it('ignores a slow response from the previous key when it lands last', async () => {
    const slowA = deferred<string>()
    const fastB = deferred<string>()

    const { result, rerender } = renderHook(
      ({ k }) => useKeyedFetch(k, () => (k === 'A' ? slowA.promise : fastB.promise)),
      { initialProps: { k: 'A' } },
    )

    // Switch to B while A is still in flight
    rerender({ k: 'B' })

    // B answers first…
    fastB.resolve('data-B')
    await waitFor(() => expect(result.current.data).toBe('data-B'))

    // …then the stale A response arrives. It must not overwrite B.
    slowA.resolve('data-A')
    await new Promise(r => setTimeout(r, 10))

    expect(result.current.data).toBe('data-B')
  })

  it('clears data immediately when the key changes — no stale numbers on screen', async () => {
    const a = deferred<string>()
    const { result, rerender } = renderHook(
      ({ k }) => useKeyedFetch(k, () => (k === 'A' ? a.promise : deferred<string>().promise)),
      { initialProps: { k: 'A' } },
    )

    a.resolve('data-A')
    await waitFor(() => expect(result.current.data).toBe('data-A'))
    expect(result.current.loading).toBe(false)

    // Key changes: the old value must be gone in the very next render, and the
    // hook must report loading — not keep showing dataset A under name B.
    rerender({ k: 'B' })
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(true)
  })

  it('does not surface an error from a superseded key', async () => {
    const failA = deferred<string>()
    const okB = deferred<string>()

    const { result, rerender } = renderHook(
      ({ k }) => useKeyedFetch(k, () => (k === 'A' ? failA.promise : okB.promise)),
      { initialProps: { k: 'A' } },
    )

    rerender({ k: 'B' })
    okB.resolve('data-B')
    await waitFor(() => expect(result.current.data).toBe('data-B'))

    failA.reject(new Error('A blew up'))
    await new Promise(r => setTimeout(r, 10))

    expect(result.current.error).toBeNull()
    expect(result.current.data).toBe('data-B')
  })

  it('does not fetch at all when the key is null', () => {
    const fetcher = vi.fn(() => Promise.resolve('x'))
    const { result } = renderHook(() => useKeyedFetch(null, fetcher))

    expect(fetcher).not.toHaveBeenCalled()
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('reports loading until the first response', async () => {
    const d = deferred<string>()
    const { result } = renderHook(() => useKeyedFetch('A', () => d.promise))

    expect(result.current.loading).toBe(true)
    d.resolve('done')
    await waitFor(() => expect(result.current.loading).toBe(false))
  })

  it('recovers after an error when the key changes', async () => {
    const bad = deferred<string>()
    const good = deferred<string>()
    const { result, rerender } = renderHook(
      ({ k }) => useKeyedFetch(k, () => (k === 'A' ? bad.promise : good.promise)),
      { initialProps: { k: 'A' } },
    )

    bad.reject(new Error('nope'))
    await waitFor(() => expect(result.current.error).toBe('nope'))

    rerender({ k: 'B' })
    expect(result.current.error).toBeNull()

    good.resolve('data-B')
    await waitFor(() => expect(result.current.data).toBe('data-B'))
  })
})

type SummaryStub = { project_key: string; ticket_count?: number }
type ScatterStub = { tickets: { id: string }[] }

describe('useMetrics — race protection through the real hook', () => {
  it('does not show dataset A summary after switching to dataset B', async () => {
    const slowA = deferred<SummaryStub>()
    const fastB = deferred<SummaryStub>()
    vi.mocked(api.metrics.summary).mockImplementation((importId: string) =>
      (importId === 'imp-A' ? slowA.promise : fastB.promise) as ReturnType<typeof api.metrics.summary>
    )

    const { result, rerender } = renderHook(
      ({ id }) => useMetrics(id),
      { initialProps: { id: 'imp-A' } },
    )

    rerender({ id: 'imp-B' })

    fastB.resolve({ project_key: 'B', ticket_count: 5 })
    await waitFor(() => expect(result.current.data?.project_key).toBe('B'))

    slowA.resolve({ project_key: 'A', ticket_count: 500 })
    await new Promise(r => setTimeout(r, 10))

    // The exact bug: 'A' numbers under the 'B' dataset
    expect(result.current.data?.project_key).toBe('B')
    expect(result.current.data?.ticket_count).toBe(5)
  })

  it('clears the previous summary while the new dataset loads', async () => {
    const a = deferred<SummaryStub>()
    vi.mocked(api.metrics.summary).mockImplementation((importId: string) =>
      (importId === 'imp-A' ? a.promise : deferred<SummaryStub>().promise) as ReturnType<typeof api.metrics.summary>
    )

    const { result, rerender } = renderHook(
      ({ id }) => useMetrics(id),
      { initialProps: { id: 'imp-A' } },
    )
    a.resolve({ project_key: 'A' })
    await waitFor(() => expect(result.current.data?.project_key).toBe('A'))

    rerender({ id: 'imp-B' })
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(true)
  })
})

describe('useCycleTimes — race protection through a chart hook', () => {
  it('ignores the previous dataset scatter data', async () => {
    const slowA = deferred<ScatterStub>()
    const fastB = deferred<ScatterStub>()
    vi.mocked(api.metrics.cycleTimes).mockImplementation((importId: string) =>
      (importId === 'imp-A' ? slowA.promise : fastB.promise) as ReturnType<typeof api.metrics.cycleTimes>
    )

    const { result, rerender } = renderHook(
      ({ id }) => useCycleTimes(id),
      { initialProps: { id: 'imp-A' } },
    )

    rerender({ id: 'imp-B' })
    fastB.resolve({ tickets: [{ id: 'b1' }] })
    await waitFor(() => expect(result.current.data?.tickets).toHaveLength(1))

    slowA.resolve({ tickets: [{ id: 'a1' }, { id: 'a2' }, { id: 'a3' }] })
    await new Promise(r => setTimeout(r, 10))

    expect(result.current.data?.tickets).toHaveLength(1)
    expect(result.current.data?.tickets[0].id).toBe('b1')
  })

  it('clears the scatter when the date filter changes', async () => {
    const first = deferred<ScatterStub>()
    vi.mocked(api.metrics.cycleTimes).mockImplementation((_id: string, dates?: { from?: string }) =>
      (dates?.from === undefined ? first.promise : deferred<ScatterStub>().promise) as ReturnType<typeof api.metrics.cycleTimes>
    )

    const { result, rerender } = renderHook(
      ({ from }) => useCycleTimes('imp-1', from),
      { initialProps: { from: null as string | null } },
    )
    first.resolve({ tickets: [{ id: 'x' }] })
    await waitFor(() => expect(result.current.data).not.toBeNull())

    rerender({ from: '2026-01-01' })
    expect(result.current.data).toBeNull()
  })
})
