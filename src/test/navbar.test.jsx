import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    ['Home', 'Q³ Initiative', 'Team'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /events/i })).toBeInTheDocument();
  });

  it('links Q³ Initiative to its own page, not the home page', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Q³ Initiative' })).toHaveAttribute('href', '/q3-initiative');
  });

  it('opens an Events dropdown listing every event', async () => {
    renderNav();
    const toggle = screen.getByRole('button', { name: /events/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    [
      ['Qompute 2026', '/events/qompute'],
      ['Qompute 2025', '/events/qompute-2025'],
      ['Lecture Series', '/events/lecture-series'],
      ['Lab Tour', '/events/lab-tour'],
    ].forEach(([label, href]) => {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
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
    expect(cta.getAttribute('href')).toMatch(/^(https?:|mailto:)/);
  });

  it('marks Home active on /', () => {
    renderNav('/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Q³ Initiative' })).not.toHaveAttribute('aria-current', 'page');
  });
});
