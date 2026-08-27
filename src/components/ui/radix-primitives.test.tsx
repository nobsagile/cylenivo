/**
 * Interaction tests for the shared Radix wrappers.
 *
 * Why here and not per consumer: Popover alone has 21 consumers (the info icon
 * on every metric card — a hard rule in this project), Select has 5, Dialog 4.
 * A Radix patch that breaks opening a popover breaks all 21 at once, so testing
 * the wrapper catches it once instead of never.
 *
 * Before these existed, the frontend suite rendered components and asserted on
 * text — no test clicked anything. A dependency bump that broke every dropdown
 * in the app would have gone green.
 *
 * What these tests do NOT cover: positioning, animation, focus trapping across
 * a real viewport. jsdom has no layout. That needs a browser.
 */

import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderUI, setupUser } from '@/test/ui'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from './tooltip'
import { Slider } from './slider'
import ConfirmDialog from './ConfirmDialog'

describe('Popover — the info icon on every metric card', () => {
  it('content is not rendered until the trigger is clicked', async () => {
    const user = setupUser()
    renderUI(
      <Popover>
        <PopoverTrigger>info</PopoverTrigger>
        <PopoverContent>Cycle time is measured from status transitions.</PopoverContent>
      </Popover>
    )

    expect(screen.queryByText(/measured from status transitions/)).not.toBeInTheDocument()
    await user.click(screen.getByText('info'))
    expect(screen.getByText(/measured from status transitions/)).toBeInTheDocument()
  })

  it('closes again on Escape', async () => {
    const user = setupUser()
    renderUI(
      <Popover>
        <PopoverTrigger>info</PopoverTrigger>
        <PopoverContent>help body</PopoverContent>
      </Popover>
    )

    await user.click(screen.getByText('info'))
    expect(screen.getByText('help body')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByText('help body')).not.toBeInTheDocument())
  })

  it('is reachable by keyboard — the trigger is a real button', async () => {
    const user = setupUser()
    renderUI(
      <Popover>
        <PopoverTrigger>info</PopoverTrigger>
        <PopoverContent>help body</PopoverContent>
      </Popover>
    )

    await user.tab()
    expect(screen.getByText('info')).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('help body')).toBeInTheDocument()
  })
})

describe('Select — config forms', () => {
  it('opens, lists options and reports the chosen value', async () => {
    const user = setupUser()
    const onValueChange = vi.fn()
    renderUI(
      <Select onValueChange={onValueChange}>
        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="in-dev">In Dev</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.queryByText('In Dev')).not.toBeInTheDocument()
    await user.click(screen.getByText('Select status'))
    expect(screen.getByText('In Dev')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()

    await user.click(screen.getByText('Done'))
    expect(onValueChange).toHaveBeenCalledWith('done')
  })

  it('shows the controlled value instead of the placeholder', () => {
    renderUI(
      <Select value="done">
        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="in-dev">In Dev</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.queryByText('Select status')).not.toBeInTheDocument()
  })

  it('a disabled select cannot be opened', async () => {
    const user = setupUser()
    renderUI(
      <Select disabled>
        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="in-dev">In Dev</SelectItem>
        </SelectContent>
      </Select>
    )

    await user.click(screen.getByText('Select status'))
    expect(screen.queryByText('In Dev')).not.toBeInTheDocument()
  })
})

describe('Dialog', () => {
  it('opens from its trigger and closes on Escape', async () => {
    const user = setupUser()
    renderUI(
      <Dialog>
        <DialogTrigger>Rename</DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Rename dataset</DialogTitle></DialogHeader>
        </DialogContent>
      </Dialog>
    )

    expect(screen.queryByText('Rename dataset')).not.toBeInTheDocument()
    await user.click(screen.getByText('Rename'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Rename dataset')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('a controlled dialog reports close attempts instead of closing itself', async () => {
    const user = setupUser()
    const onOpenChange = vi.fn()
    renderUI(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader><DialogTitle>Still open</DialogTitle></DialogHeader>
        </DialogContent>
      </Dialog>
    )

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
    // Controlled: the parent decides, so it must still be on screen
    expect(screen.getByText('Still open')).toBeInTheDocument()
  })
})

describe('ConfirmDialog — guards every destructive action', () => {
  const base = {
    open: true,
    title: 'Delete dataset?',
    description: 'This will permanently delete it. This cannot be undone.',
  }

  it('shows title and description', () => {
    renderUI(<ConfirmDialog {...base} onCancel={() => {}} />)

    expect(screen.getByText('Delete dataset?')).toBeInTheDocument()
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument()
  })

  // The next two tests document behaviour that surprised me while writing them,
  // and that is load-bearing rather than broken:
  //
  // `onOpenChange` maps every close to `onCancel`. So confirming ALSO calls
  // onCancel (that is what closes the dialog — all five callers pass
  // `() => setPendingX(null)`), and clicking Cancel calls it twice (once from
  // the button's onClick, once from the close).
  //
  // Harmless for state resets, which is all any caller currently does. A trap
  // for anything non-idempotent — a toast, analytics, a navigation — because it
  // would fire on confirm too, and twice on cancel. Pinned here so that
  // stops being a surprise.

  it('confirm runs the confirm handler, and the close path runs onCancel too', async () => {
    const user = setupUser()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    renderUI(
      <ConfirmDialog {...base} confirmLabel="Delete" onConfirm={onConfirm} onCancel={onCancel} />
    )

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onConfirm).toHaveBeenCalledOnce()
    // Not a mistake: this is how the dialog closes itself after confirming.
    expect(onCancel).toHaveBeenCalled()
  })

  it('cancel never runs the confirm handler', async () => {
    const user = setupUser()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    renderUI(
      <ConfirmDialog {...base} confirmLabel="Delete" onConfirm={onConfirm} onCancel={onCancel} />
    )

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    // The part that actually matters for a destructive dialog
    expect(onConfirm).not.toHaveBeenCalled()
    // Called twice: button onClick + onOpenChange(false). Callers must stay idempotent.
    expect(onCancel).toHaveBeenCalledTimes(2)
  })

  it('Escape cancels — it must never confirm', async () => {
    const user = setupUser()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    renderUI(
      <ConfirmDialog {...base} confirmLabel="Delete" onConfirm={onConfirm} onCancel={onCancel} />
    )

    await user.keyboard('{Escape}')
    expect(onCancel).toHaveBeenCalled()
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('renders no confirm button when confirmLabel is missing', () => {
    // A real trap in the current API: the confirm button requires BOTH
    // onConfirm and confirmLabel. Pass only onConfirm and the dialog silently
    // becomes an acknowledge-only box.
    renderUI(<ConfirmDialog {...base} onConfirm={() => {}} onCancel={() => {}} />)

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument()
  })

  it('renders nothing while closed', () => {
    renderUI(<ConfirmDialog {...base} open={false} onCancel={() => {}} />)

    expect(screen.queryByText('Delete dataset?')).not.toBeInTheDocument()
  })
})

describe('Tooltip', () => {
  it('shows its content on focus', async () => {
    const user = setupUser()
    renderUI(
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger>hover me</TooltipTrigger>
          <TooltipContent>tooltip body</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    )

    expect(screen.queryByText('tooltip body')).not.toBeInTheDocument()
    await user.tab()
    await waitFor(() => expect(screen.getAllByText('tooltip body').length).toBeGreaterThan(0))
  })
})

describe('Slider — drives the date range filter', () => {
  it('reports a new value on arrow keys', async () => {
    const user = setupUser()
    const onValueChange = vi.fn()
    renderUI(
      <Slider value={[5]} min={0} max={10} step={1} onValueChange={onValueChange} />
    )

    const thumb = screen.getByRole('slider')
    thumb.focus()
    await user.keyboard('{ArrowRight}')

    expect(onValueChange).toHaveBeenCalledWith([6])
  })

  it('renders two thumbs for a range', () => {
    renderUI(<Slider value={[2, 8]} min={0} max={10} step={1} />)

    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  it('respects min and max at the edges', async () => {
    const user = setupUser()
    const onValueChange = vi.fn()
    renderUI(<Slider value={[10]} min={0} max={10} step={1} onValueChange={onValueChange} />)

    screen.getByRole('slider').focus()
    await user.keyboard('{ArrowRight}')

    // Already at max — no change event, and certainly not 11
    expect(onValueChange).not.toHaveBeenCalledWith([11])
  })
})
