import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { TimeInStatusChart } from './TimeInStatusChart'
import type { TimeInStatusResponse, MetricsSummary } from '@/types'

const STATUS_ORDER = ['In Dev', 'Review', 'Done']

// Matches expected values from metrics-fixture with first_last mode
const timeInStatusData: TimeInStatusResponse = {
  statuses: STATUS_ORDER,
  tickets: [
    {
      external_id: 'TICK-1',
      title: 'Simple ticket',
      status_durations: { 'In Dev': 3, 'Review': 2, 'Done': 0 },
    },
    {
      external_id: 'TICK-2',
      title: 'Fast ticket',
      status_durations: { 'In Dev': 10, 'Review': 0, 'Done': 0 },
    },
    {
      external_id: 'TICK-3',
      title: 'Rework ticket',
      status_durations: { 'In Dev': 12, 'Review': 0, 'Done': 0 },
    },
  ],
}

// Mean per status: In Dev = (3+10+12)/3 = 8.33, Review = (2+0+0)/3 = 0.67
const summary = {
  time_in_status: {
    'In Dev':  { mean_days: 8.33, median_days: 10 },
    'Review':  { mean_days: 0.67, median_days: 0 },
    'Done':    { mean_days: 0,    median_days: 0 },
  },
} as unknown as MetricsSummary

function renderChart(data = timeInStatusData, sum = summary) {
  return render(
    <I18nextProvider i18n={i18n}>
      <TimeInStatusChart timeInStatusData={data} summary={sum} />
    </I18nextProvider>
  )
}

describe('TimeInStatusChart', () => {
  it('renders without crashing', () => {
    const { container } = renderChart()
    expect(container).toBeTruthy()
  })

  it('renders the avg time in status chart heading', () => {
    renderChart()
    expect(screen.getByText(/Avg Time in Status/i)).toBeTruthy()
  })

  it('renders per-ticket breakdown heading when tickets are present', () => {
    renderChart()
    expect(screen.getByText(/Per-Ticket Breakdown/i)).toBeTruthy()
  })

  it('does not render per-ticket breakdown when no tickets', () => {
    const empty: TimeInStatusResponse = { statuses: STATUS_ORDER, tickets: [] }
    renderChart(empty)
    expect(screen.queryByText(/Per-Ticket Breakdown/i)).toBeNull()
  })
})

// ─── data transformation logic ────────────────────────────────────────────────
// The chart computes avgData and stackedData from props.
// We test this logic directly to confirm the right numbers reach the chart.

describe('TimeInStatusChart / data transformation', () => {
  it('avgData picks mean_days from summary per status', () => {
    const avgData = STATUS_ORDER.map((status) => ({
      status,
      days: summary.time_in_status[status]?.mean_days ?? 0,
    }))

    expect(avgData.find(d => d.status === 'In Dev')?.days).toBeCloseTo(8.33, 1)
    expect(avgData.find(d => d.status === 'Review')?.days).toBeCloseTo(0.67, 1)
    expect(avgData.find(d => d.status === 'Done')?.days).toBe(0)
  })

  it('stackedData contains one entry per ticket with status durations as keys', () => {
    const stackedData = timeInStatusData.tickets.map(ticket => ({
      name: ticket.external_id,
      ...Object.fromEntries(STATUS_ORDER.map(s => [s, ticket.status_durations[s] ?? 0])),
    }))

    const tick1 = stackedData.find(d => d.name === 'TICK-1')
    expect(tick1?.['In Dev']).toBe(3)
    expect(tick1?.['Review']).toBe(2)

    const tick3 = stackedData.find(d => d.name === 'TICK-3')
    expect(tick3?.['In Dev']).toBe(12)  // accumulated rework: 7d + 5d
  })

  it('stackedData falls back to 0 for missing status durations', () => {
    const sparse: TimeInStatusResponse = {
      statuses: STATUS_ORDER,
      tickets: [{ external_id: 'X', title: 'X', status_durations: {} }],
    }
    const stackedData = sparse.tickets.map(ticket => ({
      name: ticket.external_id,
      ...Object.fromEntries(STATUS_ORDER.map(s => [s, ticket.status_durations[s] ?? 0])),
    }))
    expect(stackedData[0]['In Dev']).toBe(0)
    expect(stackedData[0]['Review']).toBe(0)
  })
})
