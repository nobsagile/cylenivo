/**
 * Sidebar → dataset menu → "Refresh data".
 *
 * Pins the bug from v1.5.14: once a refresh had finished, the sidebar (and the
 * rest of the app) ignored every click until the app was restarted.
 *
 * Radix's DropdownMenu and Dialog each put `pointer-events: none` on <body>
 * while open and restore the previous value on close. The refresh flow opens
 * the dialog from a menu item, so for a moment both are open, and the dialog is
 * unmounted while still open when the fetch completes. With two copies of the
 * DismissableLayer module in the bundle (see radix-single-instance.test.ts)
 * the dialog restored the menu's "none" as the original value.
 *
 * That test guards the cause. This one guards the symptom, whatever the cause:
 * after a refresh, <body> must be clickable again.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { renderUIWithRouter, setupUser } from '@/test/ui'
import { Sidebar } from './Sidebar'
import { api } from '@/services/api'
import type { ImportSession, SourceConnection } from '@/types'

vi.mock('@/services/api', () => ({
  api: {
    imports: { list: vi.fn(), replace: vi.fn(), update: vi.fn() },
    connections: { list: vi.fn(), fetchStream: vi.fn(), issueTypes: vi.fn() },
    plugins: { list: vi.fn(), registry: vi.fn() },
  },
}))

const connection: SourceConnection = {
  id: 'conn-1',
  name: 'Jira',
  source_type: 'jira',
  base_url: 'https://example.atlassian.net',
  email: 'me@example.com',
  created_at: '2026-01-01T00:00:00Z',
  project_key: 'TN',
}

const dataset: ImportSession = {
  id: 'imp-1',
  config_id: 'cfg-1',
  name: 'TN',
  source_type: 'jira',
  project_key: 'TN',
  file_name: 'TN.json',
  ticket_count: 1,
  imported_at: '2026-01-01T00:00:00Z',
  connection_id: connection.id,
  // A fixed end date hides the refresh entry; the menu item needs this null.
  resolved_to: null,
}

/** Resolve from the test to control when the "fetch" finishes. */
let finishFetch: (result: unknown) => void

beforeEach(() => {
  document.body.style.pointerEvents = ''
  vi.mocked(api.imports.list).mockResolvedValue([dataset])
  vi.mocked(api.imports.replace).mockResolvedValue(dataset)
  vi.mocked(api.connections.list).mockResolvedValue([connection])
  vi.mocked(api.connections.issueTypes).mockResolvedValue(['Bug'])
  vi.mocked(api.connections.fetchStream).mockImplementation(
    () => new Promise((resolve) => { finishFetch = resolve }),
  )
  vi.mocked(api.plugins.list).mockResolvedValue([])
  vi.mocked(api.plugins.registry).mockResolvedValue([])
})

function renderSidebar() {
  return renderUIWithRouter(
    <Routes>
      <Route path="/projects/:importId/*" element={<Sidebar />} />
    </Routes>,
    `/projects/${dataset.id}`,
  )
}

describe('Sidebar — refresh a dataset from its menu', () => {
  it('leaves the body clickable once the refresh has finished', async () => {
    const user = setupUser()
    renderSidebar()
    await screen.findByRole('button', { name: dataset.name! })

    // The "…" trigger is icon-only, so address it by its menu semantics.
    const trigger = await waitFor(() => {
      const el = document.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]')
      expect(el).not.toBeNull()
      return el!
    })
    await user.click(trigger)
    await user.click(await screen.findByRole('menuitem', { name: 'Refresh data' }))

    // The refresh dialog is up and the fetch is in flight.
    await screen.findByRole('dialog')
    await waitFor(() => expect(api.connections.fetchStream).toHaveBeenCalledTimes(1))

    finishFetch({ tickets: [] })

    await waitFor(() => expect(api.imports.replace).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())

    expect(document.body.style.pointerEvents).toBe('')

    // user-event's default pointer-events check is the user's experience:
    // it refuses to click an element that inherits `pointer-events: none`.
    const strictUser = userEvent.setup()
    await strictUser.click(screen.getByRole('link', { name: 'Flow' }))
  })
})
