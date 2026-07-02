import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import qeeMark from '../../assets/qee-mark.png';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/faq', label: 'FAQ' },
  { to: '/team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
];

const navLinkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`.trim();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} onClick={() => setIsOpen(false)}>
          <img src={qeeMark} alt="QEE logo" className={styles.logo} />
          <span>Qompute in LA</span>
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

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`.trim()}>
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
          <NavLink to="/registration" className={styles.cta} onClick={() => setIsOpen(false)}>
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
