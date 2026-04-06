import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { TicketTable } from './TicketTable'
import type { Ticket } from '@/types'

const tickets: Ticket[] = [
  {
    id: '1',
    external_id: 'ROAD-1',
    title: 'Login feature',
    ticket_type: 'story',
    created_at: '2026-01-05T09:00:00Z',
    external_link: 'https://test.atlassian.net/browse/ROAD-1',
    cycle_time_days: 6.0,
    lead_time_days: 13.0,
    current_status: 'Customer Feedback',
    completed: true,
    excluded: false,
    exclusion_reason: null,
  },
  {
    id: '2',
    external_id: 'ROAD-2',
    title: 'Fix bug',
    ticket_type: 'bug',
    created_at: '2026-01-06T09:00:00Z',
    external_link: null,
    cycle_time_days: 7.0,
    lead_time_days: null,
    current_status: 'Development',
    completed: false,
    excluded: false,
    exclusion_reason: null,
  },
]

function renderWith(ts: Ticket[]) {
  return render(
    <I18nextProvider i18n={i18n}>
      <TicketTable tickets={ts} p50={6} p85={12} />
    </I18nextProvider>
  )
}

describe('TicketTable', () => {
  it('renders correct number of rows', () => {
    renderWith(tickets)
    expect(screen.getByText('Login feature')).toBeTruthy()
    expect(screen.getByText('Fix bug')).toBeTruthy()
  })

  it('renders external_id as anchor tag', () => {
    renderWith(tickets)
    const link = screen.getByRole('link', { name: 'ROAD-1' })
    expect(link).toBeTruthy()
    expect(link.getAttribute('href')).toBe('https://test.atlassian.net/browse/ROAD-1')
  })

  it('renders null cycle_time as dash', () => {
    const nullCt: Ticket[] = [{
      id: '3', external_id: 'ROAD-3', title: 'No cycle time', ticket_type: 'task',
      created_at: '2026-01-07T09:00:00Z', external_link: null,
      cycle_time_days: null, lead_time_days: null, current_status: 'Development', completed: false,
      excluded: false, exclusion_reason: null,
    }]
    renderWith(nullCt)
    // Both cycle and lead time columns show "—"
    const dashes = screen.getAllByText('—')
    expect(dashes.length).toBeGreaterThanOrEqual(2)
  })

  it('renders empty state when no tickets', () => {
    renderWith([])
    expect(screen.getByText('No tickets found')).toBeTruthy()
  })
})
