import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import styles from './Layout.module.css';

// Client-side tab titles for in-app navigation. Keep each entry matching the
// static title scripts/inject-meta.mjs writes for that route, so a direct hit
// (static title) and a client nav (this map) never disagree. Home matches the
// title in index.html.
const TITLES = {
  '/': 'QEE · USC Quantum Engineering Ethics',
  '/team': 'Team | QEE',
  '/events/qompute': 'Qompute in LA | QEE',
  '/events/qompute/schedule': 'Schedule | Qompute in LA',
  '/events/qompute/speakers': 'Speakers | Qompute in LA',
  '/events/qompute/faq': 'FAQ | Qompute in LA',
  '/events/qompute/resources': 'Resources | Qompute in LA',
  '/events/qompute/register': 'Register | Qompute in LA',
};

const Layout = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const mainRef = useRef(null);

  useEffect(() => {
    let rafId;
    // scroll on link navigation only; browser back/forward (POP) keeps its
    // own restored scroll position
    if (navigationType !== 'POP') {
      if (hash) {
        // the target section may live on a lazy route that hasn't mounted
        // yet, so retry across a few frames until it appears, then scroll to
        // it (e.g. /team -> /#about loads the Home chunk asynchronously)
        let attempts = 0;
        const scrollToHash = () => {
          const target = document.getElementById(hash.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          } else if (attempts < 20) {
            attempts += 1;
            rafId = requestAnimationFrame(scrollToHash);
          }
        };
        scrollToHash();
      } else {
        window.scrollTo(0, 0);
        // move focus to the new page's content so screen-reader users get
        // notified of the route change (SPA navigation doesn't trigger the
        // browser's normal focus-reset-on-load behavior)
        mainRef.current?.focus();
      }
    }
    // normalize: react-router matches /Schedule and /schedule/ to the same
    // route, so the title lookup has to as well
    const normalized = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    document.title = TITLES[normalized] || 'Not found | QEE';
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname, hash, navigationType]);

  return (
    <>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
