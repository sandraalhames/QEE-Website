import { lazy, Suspense } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Team = lazy(() => import('./pages/Team'));
const QomputeLayout = lazy(() => import('./pages/events/QomputeLayout'));
const QomputeLanding = lazy(() => import('./pages/events/QomputeLanding'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Speakers = lazy(() => import('./pages/Speakers'));
const Faq = lazy(() => import('./pages/Faq'));
const Registration = lazy(() => import('./pages/Registration'));
const Resources = lazy(() => import('./pages/Resources'));
const NotFound = lazy(() => import('./pages/NotFound'));

// wraps just the routed page, not Layout, so Navbar/Footer never
// unmount/flash while a lazy page chunk is loading
const PageFallback = () => (
  <div role="status" aria-live="polite" style={{ minHeight: '50vh' }} />
);

const withSuspense = (element) => (
  <Suspense fallback={<PageFallback />}>{element}</Suspense>
);

// the route tree, split out from BrowserRouter so tests can mount it in a
// MemoryRouter at any initial path
export const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={withSuspense(<Home />)} />
      <Route path="team" element={withSuspense(<Team />)} />

      <Route path="events">
        <Route index element={<Navigate to="/events/qompute" replace />} />
        <Route path="qompute" element={withSuspense(<QomputeLayout />)}>
          <Route index element={withSuspense(<QomputeLanding />)} />
          <Route path="schedule" element={withSuspense(<Schedule />)} />
          <Route path="speakers" element={withSuspense(<Speakers />)} />
          <Route path="faq" element={withSuspense(<Faq />)} />
          <Route path="resources" element={withSuspense(<Resources />)} />
          <Route path="register" element={withSuspense(<Registration />)} />
        </Route>
      </Route>

      {/* legacy flat URLs -> nested paths (preserve old links/QR/SEO) */}
      <Route path="schedule" element={<Navigate to="/events/qompute/schedule" replace />} />
      <Route path="speakers" element={<Navigate to="/events/qompute/speakers" replace />} />
      <Route path="faq" element={<Navigate to="/events/qompute/faq" replace />} />
      <Route path="registration" element={<Navigate to="/events/qompute/register" replace />} />
      <Route path="resources" element={<Navigate to="/events/qompute/resources" replace />} />

      <Route path="*" element={withSuspense(<NotFound />)} />
    </Route>
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
