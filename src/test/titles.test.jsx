import { waitFor } from '@testing-library/react';
import { renderAt } from './utils';

// Layout keeps its own client-side document.title map, separate from the
// build-time scripts/inject-meta.mjs static titles. Both must agree, and every
// route needs an entry or it silently falls back to "Not found". This guards
// that trap: a new route added without a matching TITLES entry fails here.
describe('per-route document.title', () => {
  it.each([
    ['/', 'QEE · USC Quantum Engineering Ethics'],
    ['/team', 'Team | QEE'],
    ['/events/qompute', 'Qompute in LA | QEE'],
    ['/events/qompute/schedule', 'Schedule | Qompute in LA'],
    ['/events/qompute/speakers', 'Speakers | Qompute in LA'],
    ['/events/qompute/faq', 'FAQ | Qompute in LA'],
    ['/events/qompute/resources', 'Resources | Qompute in LA'],
    ['/events/qompute/register', 'Register | Qompute in LA'],
  ])('sets the title for %s', async (path, title) => {
    renderAt(path);
    await waitFor(() => expect(document.title).toBe(title));
  });
});
