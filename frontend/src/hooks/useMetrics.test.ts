import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMetrics } from './useMetrics'
import { api } from '@/services/api'
import type { MetricsSummary } from '@/types'

vi.mock('@/services/api', () => ({
  api: {
    metrics: {
      summary: vi.fn(),
    },
  },
}))

const mockSummary: MetricsSummary = {
  import_id: 'test-id',
  project_key: 'ROAD',
  ticket_count: 15,
  completed_ticket_count: 13,
  date_range: { from: '2026-01-01T00:00:00Z', to: '2026-03-01T00:00:00Z' },
  cycle_time: {
    mean_days: 8.0,
    median_days: 7.0,
    p50: 7.0,
    p70: 9.0,
    p85: 12.0,
    p95: 18.0,
    sample_size: 13,
    warning: null,
  },
  lead_time: {
    mean_days: 15.0,
    median_days: 12.0,
    p50: 12.0,
    p70: 16.0,
    p85: 21.0,
    p95: 30.0,
    sample_size: 13,
    warning: null,
  },
  time_in_status: {},
  throughput_per_week: 2.5,
}

afterEach(() => vi.clearAllMocks())

describe('useMetrics', () => {
  it('returns data and loading state transitions', async () => {
    vi.mocked(api.metrics.summary).mockResolvedValue(mockSummary)
    const { result } = renderHook(() => useMetrics('test-id'))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data?.project_key).toBe('ROAD')
  })

  it('sets error state when fetch throws', async () => {
    vi.mocked(api.metrics.summary).mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useMetrics('test-id'))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Network error')
    expect(result.current.data).toBeNull()
  })

  it('does not fetch when importId is undefined', () => {
    renderHook(() => useMetrics(undefined))
    expect(vi.mocked(api.metrics.summary)).not.toHaveBeenCalled()
  })
})
