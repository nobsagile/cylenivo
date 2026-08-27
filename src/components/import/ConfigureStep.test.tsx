/**
 * Interaction tests for the status-order editor.
 *
 * This screen decides what every metric in the app measures: the order of the
 * statuses, and which of them mark the start and end of the cycle. It is also
 * the only place using dnd-kit, and dnd-kit had zero test coverage — a broken
 * drag would have shipped silently.
 *
 * Sorting is driven by keyboard here, not by mouse. That is not a workaround:
 * `sortableKeyboardCoordinates` is wired in the component, so keyboard sorting
 * is a real user path. It is also the only one jsdom can reach — mouse dragging
 * needs a browser.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, within, waitFor } from '@testing-library/react'
import { renderUI, setupUser, stubVerticalLayout } from '@/test/ui'
import ConfigureStep from './ConfigureStep'
import { api } from '@/services/api'

vi.mock('@/services/api', () => ({
  api: {
    configs: { list: vi.fn(), create: vi.fn() },
  },
}))

beforeEach(() => {
  vi.mocked(api.configs.list).mockResolvedValue([])
})

const STATUSES = ['Backlog', 'In Dev', 'Review', 'Done']

function renderStep(statuses = STATUSES) {
  const onComplete = vi.fn().mockResolvedValue(undefined)
  const result = renderUI(
    <ConfigureStep
      projectKey="TN"
      ticketCount={42}
      statuses={statuses}
      onComplete={onComplete}
    />
  )
  return { ...result, onComplete }
}

// Selectors live here, in one place, because they lean on DOM structure:
// dnd-kit marks its handles with aria-roledescription="sortable", and neither
// the handle nor the remove button has an accessible name to query by (both
// contain only an aria-hidden icon). If those get aria-labels, only this block
// needs to change.

/** Drag handles, in DOM order. */
function dragHandles(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[aria-roledescription="sortable"]'))
}

/** The sortable rows, in DOM order. */
function statusRows(): HTMLElement[] {
  return dragHandles().map(handle => handle.parentElement as HTMLElement)
}

function statusOrder(): string[] {
  // row = [drag handle][label][remove button]
  return statusRows().map(row => (row.children[1] as HTMLElement).textContent ?? '')
}

describe('status list rendering', () => {
  it('shows the statuses it was given, in order', async () => {
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))
  })

  it('each status has a drag handle and a remove button', async () => {
    renderStep()
    await waitFor(() => expect(statusRows()).toHaveLength(4))

    for (const row of statusRows()) {
      expect(within(row).getAllByRole('button').length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('reordering by keyboard (dnd-kit)', () => {
  it('moves a status down', async () => {
    const user = setupUser()
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))

    const restore = stubVerticalLayout(statusRows())
    try {
      dragHandles()[0].focus()
      await user.keyboard('{ }')          // pick up "Backlog"
      await user.keyboard('{ArrowDown}')  // move past "In Dev"
      await user.keyboard('{ }')          // drop

      await waitFor(() => expect(statusOrder()).toEqual(['In Dev', 'Backlog', 'Review', 'Done']))
    } finally {
      restore()
    }
  })

  it('moves a status up', async () => {
    const user = setupUser()
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))

    const restore = stubVerticalLayout(statusRows())
    try {
      dragHandles()[3].focus()            // "Done"
      await user.keyboard('{ }')
      await user.keyboard('{ArrowUp}')
      await user.keyboard('{ }')

      await waitFor(() => expect(statusOrder()).toEqual(['Backlog', 'In Dev', 'Done', 'Review']))
    } finally {
      restore()
    }
  })

  it('Escape during a drag leaves the order untouched', async () => {
    const user = setupUser()
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))

    const restore = stubVerticalLayout(statusRows())
    try {
      dragHandles()[0].focus()
      await user.keyboard('{ }')
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{Escape}')     // cancel instead of dropping

      await waitFor(() => expect(statusOrder()).toEqual(STATUSES))
    } finally {
      restore()
    }
  })

  it('does not lose or duplicate statuses while sorting', async () => {
    const user = setupUser()
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))

    const restore = stubVerticalLayout(statusRows())
    try {
      dragHandles()[1].focus()
      await user.keyboard('{ }')
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ }')

      await waitFor(() => {
        const order = statusOrder()
        expect(order).toHaveLength(STATUSES.length)
        expect([...order].sort()).toEqual([...STATUSES].sort())
      })
    } finally {
      restore()
    }
  })
})

describe('adding and removing statuses', () => {
  it('adds a typed status to the end of the list', async () => {
    const user = setupUser()
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))

    const input = screen.getByPlaceholderText(/add status/i)
    await user.type(input, 'Blocked{Enter}')

    await waitFor(() => expect(statusOrder()).toEqual([...STATUSES, 'Blocked']))
  })

  it('removing a status takes it out of the list', async () => {
    const user = setupUser()
    renderStep()
    await waitFor(() => expect(statusOrder()).toEqual(STATUSES))

    const reviewRow = statusRows()[2]
    const buttons = within(reviewRow).getAllByRole('button')
    await user.click(buttons[buttons.length - 1])   // the X

    await waitFor(() => expect(statusOrder()).toEqual(['Backlog', 'In Dev', 'Done']))
  })
})
