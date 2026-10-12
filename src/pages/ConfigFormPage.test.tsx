/**
 * Restart statuses (#143) in the config form.
 *
 * Backlog is usually not part of the status order, so the candidates must come
 * from the statuses actually seen in this config's imports. Statuses inside the
 * cycle window are never offered: one there would abort every ticket.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderUIWithRouter, setupUser } from '@/test/ui'
import ConfigFormPage from './ConfigFormPage'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession } from '@/types'

vi.mock('@/services/api', () => ({
  api: {
    configs: { get: vi.fn(), update: vi.fn(), create: vi.fn() },
    imports: { list: vi.fn(), statuses: vi.fn() },
  },
}))

const CONFIG: ProjectConfig = {
  id: 'c1',
  name: 'RR Team',
  source_type: 'jira',
  base_url: null,
  status_order: ['Up Next', 'Preparation', 'Development', 'Customer Feedback', 'Done'],
  cycle_time_start_status: 'Preparation',
  cycle_time_end_status: 'Customer Feedback',
  cycle_time_mode: 'first_last',
  lead_time_start_status: 'Up Next',
  lead_time_end_status: 'Done',
  active_statuses: null,
  restart_statuses: null,
  created_at: '2026-01-01T00:00:00Z',
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(api.configs.get).mockResolvedValue(CONFIG)
  vi.mocked(api.configs.update).mockResolvedValue(CONFIG)
  vi.mocked(api.imports.list).mockResolvedValue([
    { id: 'i1', config_id: 'c1' } as ImportSession,
    { id: 'i2', config_id: 'other' } as ImportSession,
  ])
  vi.mocked(api.imports.statuses).mockResolvedValue(['Backlog', 'Up Next', 'Preparation', 'Development', 'Customer Feedback', 'Done'])
})

function renderPage() {
  return renderUIWithRouter(
    <Routes><Route path="/configs/:configId" element={<ConfigFormPage />} /></Routes>,
    '/configs/c1',
  )
}

describe('ConfigFormPage — restart statuses', () => {
  it('offers Backlog from the import, never statuses inside the cycle window', async () => {
    renderPage()
    expect(await screen.findByRole('button', { name: 'Backlog' })).toBeInTheDocument()
    expect(api.imports.statuses).toHaveBeenCalledWith('i1')
    expect(api.imports.statuses).not.toHaveBeenCalledWith('i2')
    expect(screen.queryByRole('button', { name: 'Development' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Preparation' })).not.toBeInTheDocument()
  })

  it('toggling Backlog saves restart_statuses', async () => {
    const user = setupUser()
    renderPage()
    const chip = await screen.findByRole('button', { name: 'Backlog' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    await user.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Save Configuration' }))
    await waitFor(() => expect(api.configs.update).toHaveBeenCalled())
    expect(vi.mocked(api.configs.update).mock.calls[0][1]).toMatchObject({ restart_statuses: ['Backlog'] })
  })

  it('unselecting sends an empty list so the field gets cleared', async () => {
    vi.mocked(api.configs.get).mockResolvedValue({ ...CONFIG, restart_statuses: ['Backlog'] })
    const user = setupUser()
    renderPage()
    const chip = await screen.findByRole('button', { name: 'Backlog' })
    await waitFor(() => expect(chip).toHaveAttribute('aria-pressed', 'true'))
    await user.click(chip)
    await user.click(screen.getByRole('button', { name: 'Save Configuration' }))
    await waitFor(() => expect(api.configs.update).toHaveBeenCalled())
    expect(vi.mocked(api.configs.update).mock.calls[0][1]).toMatchObject({ restart_statuses: [] })
  })
})
