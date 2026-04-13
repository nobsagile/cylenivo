import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useCycleTimes, useLeadTimes, useThroughput, useCfd } from './useChartData'
import { api } from '@/services/api'
import { DATA_REPLACED } from '@/hooks/useImports'

vi.mock('@/services/api', () => ({
  api: {
    metrics: {
      cycleTimes: vi.fn(),
      leadTimes: vi.fn(),
      throughput: vi.fn(),
      cfd: vi.fn(),
    },
  },
}))

const mockCycleTimes = { tickets: [{ id: '1', external_id: 'T-1', title: 'A', cycle_time_days: 5, completed_at: '2026-01-10' }] }
const mockLeadTimes = { values: [9, 12], tickets: [] }
const mockThroughput = { weeks: [{ week: '2026-01-06', count: 3 }] }
const mockCfd = { statuses: ['Todo', 'Done'], data: [{ date: '2026-01-01', Todo: 1, Done: 0 }] }

afterEach(() => vi.clearAllMocks())

// ── useCycleTimes ─────────────────────────────────────────────────────────────

describe('useCycleTimes', () => {
  it('fetches data for importId', async () => {
    vi.mocked(api.metrics.cycleTimes).mockResolvedValue(mockCycleTimes as any)
    const { result } = renderHook(() => useCycleTimes('imp-1'))

    await waitFor(() => expect(result.current.data).not.toBeNull())
    expect(api.metrics.cycleTimes).toHaveBeenCalledWith('imp-1', { from: undefined, to: undefined })
    expect(result.current.data?.tickets).toHaveLength(1)
  })

  it('does not fetch when importId is undefined', () => {
    renderHook(() => useCycleTimes(undefined))
    expect(api.metrics.cycleTimes).not.toHaveBeenCalled()
  })

  it('sets error on failure', async () => {
    vi.mocked(api.metrics.cycleTimes).mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useCycleTimes('imp-1'))

    await waitFor(() => expect(result.current.error).toBe('fail'))
    expect(result.current.data).toBeNull()
  })

  it('re-fetches when date filter changes', async () => {
    vi.mocked(api.metrics.cycleTimes).mockResolvedValue(mockCycleTimes as any)
    const { result, rerender } = renderHook(
      ({ from }) => useCycleTimes('imp-1', from),
      { initialProps: { from: null as string | null } },
    )

    await waitFor(() => expect(result.current.data).not.toBeNull())
    expect(api.metrics.cycleTimes).toHaveBeenCalledTimes(1)

    rerender({ from: '2026-01-01' })
    await waitFor(() => expect(api.metrics.cycleTimes).toHaveBeenCalledTimes(2))
    expect(api.metrics.cycleTimes).toHaveBeenLastCalledWith('imp-1', { from: '2026-01-01', to: undefined })
  })

  it('re-fetches on DATA_REPLACED event', async () => {
    vi.mocked(api.metrics.cycleTimes).mockResolvedValue(mockCycleTimes as any)
    const { result } = renderHook(() => useCycleTimes('imp-1'))

    await waitFor(() => expect(result.current.data).not.toBeNull())
    expect(api.metrics.cycleTimes).toHaveBeenCalledTimes(1)

    act(() => {
      window.dispatchEvent(new CustomEvent(DATA_REPLACED, { detail: { importId: 'imp-1' } }))
    })

    await waitFor(() => expect(api.metrics.cycleTimes).toHaveBeenCalledTimes(2))
  })

  it('ignores DATA_REPLACED for different importId', async () => {
    vi.mocked(api.metrics.cycleTimes).mockResolvedValue(mockCycleTimes as any)
    const { result } = renderHook(() => useCycleTimes('imp-1'))

    await waitFor(() => expect(result.current.data).not.toBeNull())

    act(() => {
      window.dispatchEvent(new CustomEvent(DATA_REPLACED, { detail: { importId: 'other-id' } }))
    })

    // Should still be 1 call, not 2
    expect(api.metrics.cycleTimes).toHaveBeenCalledTimes(1)
  })
})

// ── useLeadTimes ──────────────────────────────────────────────────────────────

describe('useLeadTimes', () => {
  it('fetches and returns data', async () => {
    vi.mocked(api.metrics.leadTimes).mockResolvedValue(mockLeadTimes as any)
    const { result } = renderHook(() => useLeadTimes('imp-1'))

    await waitFor(() => expect(result.current.data).not.toBeNull())
    expect(result.current.error).toBeNull()
  })

  it('does not fetch when importId is undefined', () => {
    renderHook(() => useLeadTimes(undefined))
    expect(api.metrics.leadTimes).not.toHaveBeenCalled()
  })
})

// ── useThroughput ─────────────────────────────────────────────────────────────

describe('useThroughput', () => {
  it('fetches and returns data', async () => {
    vi.mocked(api.metrics.throughput).mockResolvedValue(mockThroughput as any)
    const { result } = renderHook(() => useThroughput('imp-1'))

    await waitFor(() => expect(result.current.data).not.toBeNull())
    expect(result.current.error).toBeNull()
  })

  it('does not fetch when importId is undefined', () => {
    renderHook(() => useThroughput(undefined))
    expect(api.metrics.throughput).not.toHaveBeenCalled()
  })
})

// ── useCfd ────────────────────────────────────────────────────────────────────

describe('useCfd', () => {
  it('fetches and returns data', async () => {
    vi.mocked(api.metrics.cfd).mockResolvedValue(mockCfd as any)
    const { result } = renderHook(() => useCfd('imp-1'))

    await waitFor(() => expect(result.current.data).not.toBeNull())
    expect(result.current.data?.statuses).toEqual(['Todo', 'Done'])
    expect(result.current.error).toBeNull()
  })

  it('does not fetch when importId is undefined', () => {
    renderHook(() => useCfd(undefined))
    expect(api.metrics.cfd).not.toHaveBeenCalled()
  })
})
