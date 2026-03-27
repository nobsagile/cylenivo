import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { PercentileCard } from './PercentileCard'
import type { PercentileStats } from '@/types'

const happyData: PercentileStats = {
  mean_days: 8.0,
  median_days: 7.0,
  p50: 7.0,
  p70: 9.0,
  p85: 12.0,
  p95: 18.0,
  sample_size: 20,
  warning: null,
}

const warningData: PercentileStats = {
  mean_days: null,
  median_days: null,
  p50: null,
  p70: null,
  p85: null,
  p95: null,
  sample_size: 5,
  warning: 'Insufficient data (n=5). At least 10 completed tickets recommended.',
}

function renderWith(data: PercentileStats) {
  return render(
    <I18nextProvider i18n={i18n}>
      <PercentileCard data={data} />
    </I18nextProvider>
  )
}

describe('PercentileCard', () => {
  it('renders P50/P70/P85/P95 values', () => {
    renderWith(happyData)
    expect(screen.getByText(/7 days/)).toBeTruthy()
    expect(screen.getByText(/9 days/)).toBeTruthy()
    expect(screen.getByText(/12 days/)).toBeTruthy()
    expect(screen.getByText(/18 days/)).toBeTruthy()
  })

  it('shows warning message when warning prop is set', () => {
    renderWith(warningData)
    expect(screen.getByText(/Insufficient data/)).toBeTruthy()
  })

  it('renders without crash when all values are null', () => {
    renderWith(warningData)
    // Should not throw — no "null days" text
    expect(screen.queryByText(/null/)).toBeNull()
  })

  it('does not show warning when warning is null', () => {
    renderWith(happyData)
    expect(screen.queryByText(/Insufficient data/)).toBeNull()
  })
})
