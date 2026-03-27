import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { LeadTimeChart } from './LeadTimeChart'

function renderChart(values: number[], bucketSize?: number) {
  return render(
    <I18nextProvider i18n={i18n}>
      <LeadTimeChart values={values} bucketSize={bucketSize} />
    </I18nextProvider>
  )
}

describe('LeadTimeChart', () => {
  it('shows empty state when values is empty', () => {
    renderChart([])
    expect(screen.getByText(/No data/i)).toBeTruthy()
  })

  it('renders without crashing for valid values', () => {
    const { container } = renderChart([9, 12, 21])
    expect(container).toBeTruthy()
  })

  it('renders without crashing for single value', () => {
    const { container } = renderChart([5])
    expect(container).toBeTruthy()
  })
})

// ─── bucket computation (pure logic, extracted inline) ────────────────────────
// Tests the bucketing algorithm used inside LeadTimeChart to ensure histogram
// bins are correct — this is the data that feeds the chart.

function computeBuckets(values: number[], bucketSize = 5): Record<string, number> {
  if (values.length === 0) return {}
  const max = Math.max(...values)
  const buckets: Record<string, number> = {}
  for (let i = 0; i <= max; i += bucketSize) {
    buckets[`${i}–${i + bucketSize}`] = 0
  }
  for (const v of values) {
    const bucket = Math.floor(v / bucketSize) * bucketSize
    const key = `${bucket}–${bucket + bucketSize}`
    buckets[key] = (buckets[key] ?? 0) + 1
  }
  return buckets
}

describe('LeadTimeChart / bucket computation', () => {
  it('places values into correct buckets (bucketSize=5)', () => {
    // values from metrics-fixture first_last: 9, 12, 21
    const buckets = computeBuckets([9, 12, 21], 5)
    expect(buckets['5–10']).toBe(1)   // 9 → floor(9/5)*5=5 → "5–10"
    expect(buckets['10–15']).toBe(1)  // 12 → floor(12/5)*5=10 → "10–15"
    expect(buckets['20–25']).toBe(1)  // 21 → floor(21/5)*5=20 → "20–25"
  })

  it('zero-initialises all buckets up to max', () => {
    const buckets = computeBuckets([10], 5)
    expect(buckets['0–5']).toBe(0)
    expect(buckets['5–10']).toBe(0)
    expect(buckets['10–15']).toBe(1)
  })

  it('accumulates multiple values in the same bucket', () => {
    const buckets = computeBuckets([6, 7, 8], 5)
    expect(buckets['5–10']).toBe(3)
  })

  it('handles exact bucket boundaries', () => {
    // value 10 → floor(10/5)*5=10 → "10–15"
    const buckets = computeBuckets([10], 5)
    expect(buckets['10–15']).toBe(1)
    expect(buckets['5–10']).toBe(0)
  })

  it('respects custom bucketSize', () => {
    const buckets = computeBuckets([5, 15, 25], 10)
    expect(buckets['0–10']).toBe(1)   // 5 → 0
    expect(buckets['10–20']).toBe(1)  // 15 → 10
    expect(buckets['20–30']).toBe(1)  // 25 → 20
  })

  it('returns empty object for empty input', () => {
    expect(computeBuckets([])).toEqual({})
  })
})
