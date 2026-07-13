import { screen } from '@testing-library/react';
import { renderAt } from './utils';

// Content is still placeholder (no confirmed speakers/team/sponsors yet). The
// pages must degrade to their empty states rather than crash on empty data.
describe('placeholder empty states', () => {
  it('speakers shows the superposition placeholder', async () => {
    renderAt('/events/qompute/speakers');
    expect(await screen.findByText(/still in superposition/i)).toBeInTheDocument();
  });

  it('team shows Coming soon placeholders', async () => {
    renderAt('/team');
    expect((await screen.findAllByText(/coming soon/i)).length).toBeGreaterThan(0);
  });

  it('sponsors shows the finalizing placeholder on the qompute landing', async () => {
    renderAt('/events/qompute');
    expect(await screen.findByText(/sponsor lineup is being finalized/i)).toBeInTheDocument();
  });
});
