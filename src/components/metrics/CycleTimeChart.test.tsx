import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { CycleTimeChart } from './CycleTimeChart'
import type { CycleTimeTicket } from '@/types'

const tickets: CycleTimeTicket[] = [
  {
    id: 'ticket-1',
    external_id: 'ROAD-1',
    title: 'Ticket 1',
    cycle_time_days: 6.0,
    completed_at: '2026-01-18T09:00:00Z',
    external_link: null,
  },
]

function renderWith(ts: CycleTimeTicket[]) {
  return render(
    <I18nextProvider i18n={i18n}>
      <CycleTimeChart tickets={ts} p85={12} />
    </I18nextProvider>
  )
}

describe('CycleTimeChart', () => {
  it('renders without crashing with valid data', () => {
    const { container } = renderWith(tickets)
    expect(container).toBeTruthy()
  })

  it('shows empty state when tickets is empty', () => {
    renderWith([])
    expect(screen.getByText(/No completed tickets/i)).toBeTruthy()
  })
})
