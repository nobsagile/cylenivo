/**
 * Restart display (#143). Transitions follow a real-world case: started in
 * Preparation, back to Backlog, re-entered the cycle at Development.
 */

import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderUI, setupUser } from '@/test/ui'
import { TicketTimeline } from './TicketTimeline'
import type { ConfigContext, TicketTransition } from '@/types'

const CONFIG: ConfigContext = {
  config_id: 'c1',
  status_order: ['Up Next', 'Preparation', 'Development', 'Customer Feedback', 'Done'],
  cycle_time_start_status: 'Preparation',
  cycle_time_end_status: 'Customer Feedback',
  cycle_time_mode: 'first_last',
  lead_time_start_status: 'Up Next',
  lead_time_end_status: 'Done',
  active_statuses: null,
  restart_statuses: ['Backlog'],
}

let n = 0
const tr = (from: string | null, to: string, day: string): TicketTransition =>
  ({ id: String(n++), from_status: from, to_status: to, transitioned_at: `2024-${day}T12:00:00Z` })

const TRANSITIONS = [
  tr(null, 'Up Next', '01-01'),
  tr('Up Next', 'Preparation', '01-10'),
  tr('Preparation', 'Backlog', '01-15'),
  tr('Backlog', 'Up Next', '01-20'),
  tr('Up Next', 'Development', '02-01'),
  tr('Development', 'Customer Feedback', '02-11'),
]

describe('TicketTimeline — restart', () => {
  it('without restart: no banner, Preparation counted normally', () => {
    renderUI(<TicketTimeline transitions={TRANSITIONS} config={CONFIG} createdAt="2024-01-01T12:00:00Z" />)
    expect(screen.queryByText(/Restarted on/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Aborted attempt, not counted')).not.toBeInTheDocument()
  })

  it('restarted: banner with discarded days, aborted statuses marked', () => {
    renderUI(
      <TicketTimeline
        transitions={TRANSITIONS}
        config={CONFIG}
        createdAt="2024-01-01T12:00:00Z"
        restart={{ count: 1, restarted_at: '2024-02-01T12:00:00Z', discarded_days: 22, abandoned: false }}
        completedAt="2024-02-11T12:00:00Z"
      />,
    )
    expect(screen.getByText(/Restarted on .* 22\.0d before that are not counted/)).toBeInTheDocument()
    // Preparation (5d), Backlog (5d), Up Next (12d) between start and re-entry
    expect(screen.getAllByLabelText('Aborted attempt, not counted')).toHaveLength(3)
  })

  it('abandoned: banner, no completed date even though the end status was reached', () => {
    const transitions = [
      tr(null, 'Preparation', '01-01'),
      tr('Preparation', 'Customer Feedback', '01-05'),
      tr('Customer Feedback', 'Backlog', '01-08'),
    ]
    renderUI(
      <TicketTimeline
        transitions={transitions}
        config={CONFIG}
        createdAt="2024-01-01T12:00:00Z"
        restart={{ count: 1, restarted_at: null, discarded_days: 7, abandoned: true }}
        completedAt={null}
      />,
    )
    expect(screen.getByText(/never came back/)).toBeInTheDocument()
    expect(screen.queryByText(/Resolved|Completed/)).not.toBeInTheDocument()
  })
})

describe('TicketTimeline — restart status is not rework (#142)', () => {
  // Backlog in status_order made Preparation → Backlog a rework movement
  const withBacklog: ConfigContext = { ...CONFIG, status_order: ['Backlog', ...CONFIG.status_order] }

  it('no rework box when the only backward move goes into a restart status', () => {
    renderUI(<TicketTimeline transitions={TRANSITIONS} config={withBacklog} createdAt="2024-01-01T12:00:00Z" />)
    expect(screen.queryByText(/rework movement/)).not.toBeInTheDocument()
  })

  it('without restart statuses the move still shows as rework', () => {
    renderUI(<TicketTimeline transitions={TRANSITIONS} config={{ ...withBacklog, restart_statuses: null }} createdAt="2024-01-01T12:00:00Z" />)
    expect(screen.getByText(/1 rework movement/)).toBeInTheDocument()
  })
})

describe('TicketTimeline — cycle time calculation table (#145)', () => {
  const renderRestarted = () => renderUI(
    <TicketTimeline
      transitions={TRANSITIONS}
      config={CONFIG}
      createdAt="2024-01-01T12:00:00Z"
      restart={{ count: 1, restarted_at: '2024-02-01T12:00:00Z', discarded_days: 22, abandoned: false }}
      completedAt="2024-02-11T12:00:00Z"
      cycleStartedAt="2024-02-01T12:00:00Z"
    />,
  )

  it('is collapsed by default', () => {
    renderRestarted()
    expect(screen.getByRole('button', { name: 'How cycle time was calculated' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('splits rows along the server window and totals to the cycle time', async () => {
    renderRestarted()
    await setupUser().click(screen.getByRole('button', { name: 'How cycle time was calculated' }))

    const rows = screen.getAllByRole('row').slice(1, -1) // without header and footer
    const counted = rows.map(r => r.querySelectorAll('td')[3].textContent)
    expect(counted).toEqual(['before start', 'aborted attempt', 'aborted attempt', 'aborted attempt', 'start', 'end'])
    expect(screen.getByText(/^Start: Development on /)).toBeInTheDocument()
    expect(screen.getByText('Cycle time').closest('tr')).toHaveTextContent('10.00d')
  })

  it('hidden when the ticket never started (abandoned)', () => {
    renderUI(<TicketTimeline transitions={TRANSITIONS} config={CONFIG} createdAt="2024-01-01T12:00:00Z" cycleStartedAt={null} />)
    expect(screen.queryByRole('button', { name: 'How cycle time was calculated' })).not.toBeInTheDocument()
  })
})
