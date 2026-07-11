import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import qeeMark from '../../assets/qee-mark.png';
import event from '../../content/event';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/#about', label: 'About', end: false },
  { to: '/events/qompute', label: 'Events', end: false },
  { to: '/team', label: 'Team', end: false },
];

const memberHref = event.joinFormUrl
  || 'mailto:qee@usc.edu?subject=Joining%20QEE';

const navLinkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`.trim();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} onClick={() => setIsOpen(false)}>
          <img src={qeeMark} alt="QEE logo" className={styles.logo} />
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
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={memberHref}
            className={styles.cta}
            target={memberHref.startsWith('http') ? '_blank' : undefined}
            rel={memberHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => setIsOpen(false)}
          >
            Become a member
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
