import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventSubnav from '../components/events/EventSubnav';

describe('EventSubnav', () => {
  it('renders every hackathon section link', () => {
    render(
      <MemoryRouter initialEntries={['/events/qompute']}>
        <EventSubnav />
      </MemoryRouter>,
    );
    ['Overview', 'Schedule', 'Speakers', 'FAQ', 'Resources', 'Register'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
  });
});
