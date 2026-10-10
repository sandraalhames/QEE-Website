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

  it('shows supporter logos under the Past and Current Supporters heading', async () => {
    renderAt('/events/qompute');
    expect(await screen.findByRole('heading', { name: 'Past and Current Supporters' })).toBeInTheDocument();
    expect(screen.getByAltText('Center for Quantum Networks')).toBeInTheDocument();
  });
});
