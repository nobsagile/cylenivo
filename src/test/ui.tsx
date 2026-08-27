import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from '@/i18n'

/**
 * Renders a component with the real i18n instance.
 *
 * The real instance, not a mock: every UI string goes through t(), so a missing
 * key would show up as the raw key in an assertion instead of passing silently.
 */
export function renderUI(ui: ReactNode) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

/**
 * Same, plus a router. Needed by anything that renders a <Link> — several cards
 * do so in their empty state, which throws "Cannot destructure property
 * 'basename'" without a Router above it.
 */
export function renderUIWithRouter(ui: ReactNode, initialPath = '/') {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
    </I18nextProvider>
  )
}

/**
 * user-event configured for Radix.
 *
 * pointerEventsCheck is disabled because Radix sets `pointer-events: none` on
 * parts of the tree while an overlay is open. In a browser that is correct and
 * harmless; in jsdom, user-event refuses to click and the test fails on the
 * guard rather than on the component. Everything else about user-event —
 * event sequences, focus, keyboard — stays intact.
 */
export function setupUser() {
  return userEvent.setup({ pointerEventsCheck: 0 })
}

/**
 * Gives a list of elements a stacked vertical layout, and returns a restore fn.
 *
 * dnd-kit decides where a dragged item lands by comparing bounding boxes. In
 * jsdom every box is 0×0, so collision detection always resolves to the item
 * you started on and a keyboard drag silently does nothing — the test passes
 * while reordering is broken. Stubbing distinct boxes makes the sort actually
 * observable.
 *
 * This simulates layout; it does not test it. Whether the rows are visually in
 * the right place is a browser question.
 */
export function stubVerticalLayout(elements: Element[], rowHeight = 40) {
  const originals = new Map<Element, PropertyDescriptor | undefined>()

  elements.forEach((el, index) => {
    originals.set(el, Object.getOwnPropertyDescriptor(el, 'getBoundingClientRect'))
    const top = index * rowHeight
    Object.defineProperty(el, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        x: 0, y: top, top, left: 0, right: 300, bottom: top + rowHeight,
        width: 300, height: rowHeight, toJSON: () => ({}),
      }) as DOMRect,
    })
  })

  return () => {
    for (const [el, descriptor] of originals) {
      if (descriptor) Object.defineProperty(el, 'getBoundingClientRect', descriptor)
      else delete (el as unknown as Record<string, unknown>).getBoundingClientRect
    }
  }
}
