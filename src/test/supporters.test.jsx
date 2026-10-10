import { screen } from '@testing-library/react';
import { renderAt } from './utils';

// The supporters row appears on the home page and on every event page.
describe('supporters section', () => {
  it.each([
    '/',
    '/events/qompute',
    '/events/qompute/schedule',
    '/events/qompute/faq',
    '/events/qompute-2025',
    '/events/lecture-series',
    '/events/lab-tour',
  ])('shows on %s', async (path) => {
    renderAt(path);
    expect(await screen.findByRole('heading', { name: 'Past and Current Supporters' })).toBeInTheDocument();
  });
});
