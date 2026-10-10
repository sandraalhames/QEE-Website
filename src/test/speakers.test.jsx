import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAt } from './utils';
import speakers from '../content/speakers';

describe('speakers', () => {
  it('lists each speaker with their title on the Qompute 2026 landing page', async () => {
    renderAt('/events/qompute');
    expect(await screen.findByRole('heading', { name: 'Speakers' })).toBeInTheDocument();
    speakers.forEach((s) => {
      expect(screen.getByText(s.name)).toBeInTheDocument();
    });
  });

  it('opens a bio dialog on click and closes it with Escape', async () => {
    const user = userEvent.setup();
    renderAt('/events/qompute/speakers');
    const first = speakers.find((s) => s.bio.length);
    await user.click(await screen.findByRole('button', { name: new RegExp(first.name) }));
    const dialog = screen.getByRole('dialog', { name: first.name });
    expect(within(dialog).getByText(first.bio[0])).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the bio dialog with the close button', async () => {
    const user = userEvent.setup();
    renderAt('/events/qompute/speakers');
    await user.click(await screen.findByRole('button', { name: new RegExp(speakers[0].name) }));
    await user.click(screen.getByRole('button', { name: 'Close bio' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
