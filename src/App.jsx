import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Speakers = lazy(() => import('./pages/Speakers'));
const Faq = lazy(() => import('./pages/Faq'));
const Registration = lazy(() => import('./pages/Registration'));
const Resources = lazy(() => import('./pages/Resources'));
const Team = lazy(() => import('./pages/Team'));
const NotFound = lazy(() => import('./pages/NotFound'));

// wraps just the routed page, not Layout, so Navbar/Footer never
// unmount/flash while a lazy page chunk is loading
const PageFallback = () => (
  <div role="status" aria-live="polite" style={{ minHeight: '50vh' }} />
);

const withSuspense = (element) => (
  <Suspense fallback={<PageFallback />}>{element}</Suspense>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={withSuspense(<Home />)} />
        <Route path="schedule" element={withSuspense(<Schedule />)} />
        <Route path="speakers" element={withSuspense(<Speakers />)} />
        <Route path="faq" element={withSuspense(<Faq />)} />
        <Route path="registration" element={withSuspense(<Registration />)} />
        <Route path="resources" element={withSuspense(<Resources />)} />
        <Route path="team" element={withSuspense(<Team />)} />
        <Route path="*" element={withSuspense(<NotFound />)} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
