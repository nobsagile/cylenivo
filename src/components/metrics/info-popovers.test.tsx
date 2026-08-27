/**
 * The info icon on every metric card must actually open.
 *
 * This project has a hard rule: every new chart or metric card gets an info
 * icon, implemented as a Radix Popover with help text from `help.*`. That makes
 * Popover the single most widely used interactive primitive in the app — 21
 * components depend on it — and it was completely untested. A dependency bump
 * that broke Popover would have removed the explanation from every chart at
 * once, with a green test suite.
 *
 * `radix-primitives.test.tsx` covers the wrapper in isolation. This file checks
 * the real cards: that the trigger exists, that clicking it reveals text, and
 * that the text is a translated string rather than a raw `help.*` key.
 */

import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderUI, renderUIWithRouter, setupUser } from '@/test/ui'
import { PercentileCard } from './PercentileCard'
import { ReworkCard } from './ReworkCard'
import { FlowEfficiencyCard } from './FlowEfficiencyCard'
import type { PercentileStats, ReworkResponse } from '@/types'

const percentiles: PercentileStats = {
  mean_days: 8, median_days: 7, p50: 7, p70: 9, p85: 12, p95: 18,
  sample_size: 20, warning: null,
}

const rework: ReworkResponse = {
  tickets_with_rework: 5,
  total_completed: 20,
  rework_paths: [{ from: 'Review', to: 'In Dev', count: 4 }],
  avg_cycle_with_rework: 14.2,
  avg_cycle_without_rework: 6.1,
}

/** Info triggers are icon-only buttons; they carry no accessible name. */
function infoTriggers(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('button[aria-haspopup="dialog"]'))
}

async function openFirstInfo(container: HTMLElement) {
  const user = setupUser()
  const triggers = infoTriggers(container)
  expect(triggers.length).toBeGreaterThan(0)
  await user.click(triggers[0])
}

describe('PercentileCard', () => {
  it('has an info trigger', () => {
    const { container } = renderUI(<PercentileCard data={percentiles} />)
    expect(infoTriggers(container).length).toBeGreaterThan(0)
  })

  it('reveals help text on click', async () => {
    const { container } = renderUI(<PercentileCard data={percentiles} />)

    const before = document.body.textContent ?? ''
    await openFirstInfo(container)
    const after = document.body.textContent ?? ''

    expect(after.length).toBeGreaterThan(before.length)
  })

  it('the help text is translated, not a raw i18n key', async () => {
    const { container } = renderUI(<PercentileCard data={percentiles} />)
    await openFirstInfo(container)

    const dialogs = screen.getAllByRole('dialog')
    const text = dialogs.map(d => d.textContent ?? '').join(' ')
    expect(text.trim().length).toBeGreaterThan(10)
    // A missing key renders as "help.somethingSomething"
    expect(text).not.toMatch(/\bhelp\.[a-zA-Z]/)
  })
})

describe('ReworkCard', () => {
  it('reveals translated help text on click', async () => {
    const { container } = renderUI(<ReworkCard data={rework} />)
    await openFirstInfo(container)

    const text = screen.getAllByRole('dialog').map(d => d.textContent ?? '').join(' ')
    expect(text.trim().length).toBeGreaterThan(10)
    expect(text).not.toMatch(/\bhelp\.[a-zA-Z]/)
  })

  it('renders nothing when there is no completed work to report on', () => {
    const { container } = renderUI(
      <ReworkCard data={{ ...rework, total_completed: 0, tickets_with_rework: 0 }} />
    )
    expect(container).toBeEmptyDOMElement()
  })
})

describe('FlowEfficiencyCard', () => {
  const data = { mean: 36.3, median: 33.3, histogram: [{ bucket: 30, count: 4 }] }

  it('reveals translated help text on click', async () => {
    const { container } = renderUI(
      <FlowEfficiencyCard data={data} activeStatuses={['In Progress']} configId="cfg-1" />
    )
    await openFirstInfo(container)

    const text = screen.getAllByRole('dialog').map(d => d.textContent ?? '').join(' ')
    expect(text.trim().length).toBeGreaterThan(10)
    expect(text).not.toMatch(/\bhelp\.[a-zA-Z]/)
  })

  it('falls back to an explanation when no active statuses are configured', () => {
    // The empty state links to the config page, so this one needs a router.
    const { container } = renderUIWithRouter(
      <FlowEfficiencyCard data={data} activeStatuses={[]} configId="cfg-1" />
    )
    // Must still say something rather than render an empty card
    expect((container.textContent ?? '').trim().length).toBeGreaterThan(10)
  })
})

describe('popovers do not leak into each other', () => {
  it('two cards on one page keep their own help text', async () => {
    const user = setupUser()
    const { container } = renderUI(
      <>
        <PercentileCard data={percentiles} variant="cycle" />
        <ReworkCard data={rework} />
      </>
    )

    const triggers = infoTriggers(container)
    expect(triggers.length).toBeGreaterThanOrEqual(2)

    await user.click(triggers[0])
    const firstText = screen.getAllByRole('dialog').map(d => d.textContent).join(' ')

    await user.keyboard('{Escape}')
    await user.click(triggers[triggers.length - 1])
    const lastText = screen.getAllByRole('dialog').map(d => d.textContent).join(' ')

    expect(firstText).not.toBe(lastText)
  })
})

describe('every info popover in these cards opens', () => {
  it('each trigger reveals a dialog', async () => {
    const user = setupUser()
    const { container } = renderUI(
      <>
        <PercentileCard data={percentiles} variant="cycle" />
        <PercentileCard data={percentiles} variant="lead" />
        <ReworkCard data={rework} />
      </>
    )

    const triggers = infoTriggers(container)
    expect(triggers.length).toBeGreaterThanOrEqual(3)

    for (const trigger of triggers) {
      await user.click(trigger)
      expect(screen.queryAllByRole('dialog').length).toBeGreaterThan(0)
      await user.keyboard('{Escape}')
    }
  })
})
