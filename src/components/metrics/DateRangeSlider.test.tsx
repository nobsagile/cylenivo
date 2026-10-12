/**
 * "Last N completed tickets" (#144) — the alternative to the date range.
 * Date range and last N exclude each other; these tests pin that both ways.
 */

import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderUI, setupUser } from '@/test/ui'
import { DateFilterProvider, useDateFilter } from '@/contexts/DateFilterContext'
import { DateRangeSlider } from './DateRangeSlider'

/** Shows the filter every metric hook would get, and lets a test set a date range. */
function Probe() {
  const { filter, setFromDate } = useDateFilter()
  return (
    <>
      <output data-testid="filter">{JSON.stringify(filter)}</output>
      <button onClick={() => setFromDate('2026-02-01')}>set-from</button>
    </>
  )
}

function setup(props: Partial<Parameters<typeof DateRangeSlider>[0]> = {}) {
  renderUI(
    <DateFilterProvider importId="imp-1">
      <DateRangeSlider
        dataFrom="2026-01-01T00:00:00Z"
        dataTo="2026-06-30T00:00:00Z"
        completedCount={80}
        selectedRange={{ from: '2026-04-01T00:00:00Z', to: '2026-06-30T00:00:00Z' }}
        {...props}
      />
      <Probe />
    </DateFilterProvider>,
  )
  return setupUser()
}

const filter = () => JSON.parse(screen.getByTestId('filter').textContent!)
const chip = (n: number) => screen.getByRole('button', { name: `Last ${n} tickets` })

describe('DateRangeSlider — last N tickets', () => {
  it('a chip sets last N and shows it in the header', async () => {
    const user = setup()
    await user.click(chip(30))

    expect(filter()).toEqual({ last: 30 })
    expect(chip(30)).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/Last 30 tickets ·/)).toBeInTheDocument()
  })

  it('clicking the active chip again turns it off', async () => {
    const user = setup()
    await user.click(chip(20))
    await user.click(chip(20))
    expect(filter()).toEqual({})
  })

  it('a chip replaces an active date range', async () => {
    const user = setup()
    await user.click(screen.getByText('set-from'))
    expect(filter()).toEqual({ from: '2026-02-01' })

    await user.click(chip(50))
    expect(filter()).toEqual({ last: 50 })
  })

  it('setting a date range replaces last N', async () => {
    const user = setup()
    await user.click(chip(50))
    await user.click(screen.getByText('set-from'))
    expect(filter()).toEqual({ from: '2026-02-01' })
    expect(chip(50)).toHaveAttribute('aria-pressed', 'false')
  })

  it('moving the slider switches back to a date range', async () => {
    const user = setup()
    await user.click(chip(30))
    const [startThumb] = screen.getAllByRole('slider')
    startThumb.focus()
    fireEvent.keyDown(startThumb, { key: 'ArrowRight' })

    expect(filter().last).toBeUndefined()
    expect(filter().from).toBeDefined()
  })

  it('disables chips above the number of completed tickets', () => {
    setup({ completedCount: 40 })
    expect(chip(30)).toBeEnabled()
    expect(chip(50)).toBeDisabled()
    expect(chip(100)).toBeDisabled()
  })

  it('accepts a custom number and warns when there are fewer tickets', async () => {
    const user = setup({ completedCount: 40 })
    await user.type(screen.getByRole('spinbutton', { name: 'Custom number of tickets' }), '75{Enter}')

    expect(filter()).toEqual({ last: 75 })
    expect(screen.getByText(/Only 40 completed tickets available/)).toBeInTheDocument()
  })

  it('ignores a custom value below 1', async () => {
    const user = setup()
    await user.type(screen.getByRole('spinbutton', { name: 'Custom number of tickets' }), '0{Enter}')
    expect(filter()).toEqual({})
  })

  it('"Clear filter" resets last N', async () => {
    const user = setup()
    await user.click(chip(30))
    await user.click(screen.getByRole('button', { name: /Clear filter/ }))
    expect(filter()).toEqual({})
  })

  it('the info icon explains the feature', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Last N Tickets' }))
    expect(await screen.findByText(/most recently completed tickets/)).toBeInTheDocument()
  })
})
