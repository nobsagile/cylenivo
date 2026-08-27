/**
 * Accessible names for the icon-only controls in a status row.
 *
 * Both the drag handle and the remove button contain nothing but an
 * aria-hidden icon. Before the labels, a screen reader announced them as
 * "button, sortable" and "button" — no indication of which status they act on,
 * and no way for a test to address them either.
 *
 * The label is also what the ConfigureStep tests query by, so this file is the
 * contract those tests rely on.
 */

import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { renderUI, setupUser } from '@/test/ui'
import { SortableStatusRow } from './SortableStatusRow'

function renderRow(id: string, onRemove = vi.fn()) {
  // useSortable needs a DndContext + SortableContext above it.
  renderUI(
    <DndContext>
      <SortableContext items={[id]}>
        <SortableStatusRow id={id} onRemove={onRemove} />
      </SortableContext>
    </DndContext>
  )
  return { onRemove }
}

describe('SortableStatusRow', () => {
  it('shows the status name', () => {
    renderRow('In Dev')
    expect(screen.getByText('In Dev')).toBeInTheDocument()
  })

  it('the drag handle is named after its status', () => {
    renderRow('In Dev')
    expect(screen.getByRole('button', { name: 'Reorder In Dev' })).toBeInTheDocument()
  })

  it('the remove button is named after its status', () => {
    renderRow('In Dev')
    expect(screen.getByRole('button', { name: 'Remove In Dev' })).toBeInTheDocument()
  })

  it('remove fires the handler', async () => {
    const user = setupUser()
    const { onRemove } = renderRow('In Dev')

    await user.click(screen.getByRole('button', { name: 'Remove In Dev' }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('the drag handle is keyboard reachable', async () => {
    const user = setupUser()
    renderRow('In Dev')

    await user.tab()
    expect(screen.getByRole('button', { name: 'Reorder In Dev' })).toHaveFocus()
  })

  it('labels are translated, not raw i18n keys', () => {
    renderRow('In Dev')

    const names = screen.getAllByRole('button').map(b => b.getAttribute('aria-label') ?? '')
    for (const name of names) {
      expect(name).not.toMatch(/^common\./)
      expect(name.length).toBeGreaterThan(0)
    }
  })

  it('a status name with spaces still produces a usable label', () => {
    renderRow('Ready for Development')
    expect(screen.getByRole('button', { name: 'Reorder Ready for Development' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove Ready for Development' })).toBeInTheDocument()
  })
})
