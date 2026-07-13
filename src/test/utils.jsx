import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AppRoutes } from '../App';

// mount the real route tree at any initial path, inside a MemoryRouter so
// tests exercise routing/redirects without a real browser history
export const renderAt = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <AppRoutes />
  </MemoryRouter>,
);
