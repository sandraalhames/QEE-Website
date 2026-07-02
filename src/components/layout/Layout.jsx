import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.css';

const TITLES = {
  '/': 'Qompute in LA — Quantum Engineering Ethics @ USC',
  '/schedule': 'Schedule — Qompute in LA',
  '/faq': 'FAQ — Qompute in LA',
  '/registration': 'Register — Qompute in LA',
  '/resources': 'Resources — Qompute in LA',
  '/team': 'Team — Qompute in LA',
};

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] || 'Not found — Qompute in LA';
  }, [pathname]);

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
