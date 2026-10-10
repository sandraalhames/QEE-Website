import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import qeeLogo from '../../assets/qee-logo-2026.png';
import event from '../../content/event';
import events from '../../content/events';
import styles from './Navbar.module.css';

const memberHref = event.joinFormUrl
  || 'mailto:qee@usc.edu?subject=Joining%20QEE';

const navLinkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`.trim();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const eventsRef = useRef(null);
  const { pathname } = useLocation();
  const onEventsPage = pathname.toLowerCase().startsWith('/events');

  const closeAll = () => {
    setIsOpen(false);
    setEventsOpen(false);
  };

  // close the Events menu on outside click or Escape
  useEffect(() => {
    if (!eventsOpen) return undefined;
    const onClick = (e) => {
      if (eventsRef.current && !eventsRef.current.contains(e.target)) setEventsOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setEventsOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [eventsOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} onClick={closeAll}>
          <img src={qeeLogo} alt="QEE logo" className={styles.logo} />
          <span>QEE</span>
        </NavLink>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.toggleBar} />
          <span className={styles.toggleBar} />
          <span className={styles.toggleBar} />
        </button>

        <nav aria-label="Primary" className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`.trim()}>
          <NavLink to="/" end className={navLinkClass} onClick={closeAll}>Home</NavLink>
          <NavLink to="/q3-initiative" className={navLinkClass} onClick={closeAll}>
            Q³ Initiative
          </NavLink>

          <div className={styles.dropdown} ref={eventsRef}>
            <button
              type="button"
              className={`${styles.link} ${styles.dropdownToggle} ${onEventsPage ? styles.linkActive : ''}`.trim()}
              aria-expanded={eventsOpen}
              aria-controls="events-menu"
              onClick={() => setEventsOpen((prev) => !prev)}
            >
              Events
              <span className={styles.caret} aria-hidden="true">▾</span>
            </button>
            <ul
              id="events-menu"
              className={`${styles.menu} ${eventsOpen ? styles.menuOpen : ''}`.trim()}
            >
              {events.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={item.to}
                    end={item.slug !== 'qompute'}
                    className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`.trim()}
                    onClick={closeAll}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/team" className={navLinkClass} onClick={closeAll}>Team</NavLink>
          <a
            href={memberHref}
            className={styles.cta}
            target={memberHref.startsWith('http') ? '_blank' : undefined}
            rel={memberHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={closeAll}
          >
            Become a member
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
