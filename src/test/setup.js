import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// unmount React trees between tests so document.title, DOM, and observers
// don't leak from one test into the next
afterEach(() => {
  cleanup();
});

// jsdom implements none of the browser APIs the hero animation and the Layout
// scroll effect reach for. Stub them so component render never throws.

// prefers-reduced-motion + any other media query -> report "no match"
window.matchMedia = window.matchMedia || ((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// IntersectionObserver (useReveal, QuantumField visibility gating)
class MockIntersectionObserver {
  constructor(callback) { this.callback = callback; }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() { return []; }
}
window.IntersectionObserver = MockIntersectionObserver;
global.IntersectionObserver = MockIntersectionObserver;

// ResizeObserver
class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}
window.ResizeObserver = MockResizeObserver;
global.ResizeObserver = MockResizeObserver;

// canvas 2d context (QuantumField draws the Bloch sphere)
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  ellipse: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  setTransform: vi.fn(),
  createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  closePath: vi.fn(),
  rect: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
}));

// jsdom leaves these unimplemented (Layout scroll effect + hash scrolling)
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
