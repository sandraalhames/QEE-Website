import { screen } from '@testing-library/react';
import { renderAt } from './utils';

// Every real route must render its page without throwing. This is the cheapest,
// highest-value guard: it catches the most common PR break, a bad import or a
// runtime crash in a component, on any page.
const ROUTES = [
  { path: '/', heading: /done ethically/i },
  { path: '/team', heading: /meet the e-board/i },
  { path: '/events/qompute', heading: /qompute in la/i },
  { path: '/events/qompute/schedule', heading: /how the event flows/i },
  { path: '/events/qompute/speakers', heading: /talks and panels/i },
  { path: '/events/qompute/faq', heading: /frequently asked questions/i },
  { path: '/events/qompute/resources', heading: /learn quantum before you compete/i },
  { path: '/events/qompute/register', heading: /sign up for qompute in la/i },
  { path: '/this-route-does-not-exist', heading: /404/i },
];

describe('page smoke tests', () => {
  it.each(ROUTES)('renders $path without crashing', async ({ path, heading }) => {
    renderAt(path);
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
  });
});
