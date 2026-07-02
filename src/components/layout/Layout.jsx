import { useEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.css';

const TITLES = {
  '/': 'Qompute in LA · Quantum Engineering Ethics @ USC',
  '/schedule': 'Schedule · Qompute in LA',
  '/faq': 'FAQ · Qompute in LA',
  '/registration': 'Register · Qompute in LA',
  '/resources': 'Resources · Qompute in LA',
  '/team': 'Team · Qompute in LA',
};

const Layout = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // scroll to top on link navigation only; browser back/forward (POP)
    // keeps its own restored scroll position
    if (navigationType !== 'POP') window.scrollTo(0, 0);
    // normalize: react-router matches /Schedule and /schedule/ to the same
    // route, so the title lookup has to as well
    const normalized = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    document.title = TITLES[normalized] || 'Not found · Qompute in LA';
  }, [pathname, navigationType]);

  return (
    <>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
