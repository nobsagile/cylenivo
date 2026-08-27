import '@testing-library/jest-dom'

/**
 * jsdom shims for Radix UI.
 *
 * Radix primitives measure and position themselves with browser APIs that jsdom
 * does not implement. Without these, rendering a Popover throws
 * "ResizeObserver is not defined" and Select cannot be opened at all — which is
 * why the UI had no interaction tests: the first attempt fails on infrastructure,
 * not on the component.
 *
 * These are stubs, not implementations. They make the components mountable and
 * interactive; they do not make layout or positioning testable. Anything that
 * depends on real geometry needs a browser.
 */

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver

// Radix Select scrolls the highlighted item into view.
Element.prototype.scrollIntoView ??= function scrollIntoView() {}

// Radix Select and Slider use pointer capture for drag handling.
Element.prototype.hasPointerCapture ??= function hasPointerCapture() { return false }
Element.prototype.setPointerCapture ??= function setPointerCapture() {}
Element.prototype.releasePointerCapture ??= function releasePointerCapture() {}

// Radix Tooltip/Popover query this for reduced-motion and container queries.
globalThis.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof globalThis.matchMedia
