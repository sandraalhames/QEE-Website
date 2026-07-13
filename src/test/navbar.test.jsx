import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const renderNav = (path = '/') => render(
  <MemoryRouter initialEntries={[path]}>
    <Navbar />
  </MemoryRouter>,
);

describe('Navbar', () => {
  it('shows the org-level nav links', () => {
    renderNav();
    ['Home', 'About', 'Events', 'Team'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
  });

  it('does not surface hackathon links in the global nav', () => {
    renderNav();
    expect(screen.queryByRole('link', { name: 'Schedule' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Resources' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'FAQ' })).not.toBeInTheDocument();
  });

  it('has a Become a member CTA (external form or email fallback)', () => {
    renderNav();
    const cta = screen.getByRole('link', { name: /become a member/i });
    expect(cta).toHaveAttribute('href');
    expect(cta.getAttribute('href')).toMatch(/^(https?:|mailto:)/);
  });

  it('marks Home active but not the hash About link on /', () => {
    renderNav('/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current', 'page');
  });
});
