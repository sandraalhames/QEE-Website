import { NavLink } from 'react-router-dom';
import Container from '../ui/Container';
import styles from './EventSubnav.module.css';

const LINKS = [
  { to: '/events/qompute', label: 'Overview', end: true },
  { to: '/events/qompute/schedule', label: 'Schedule' },
  { to: '/events/qompute/speakers', label: 'Speakers' },
  { to: '/events/qompute/faq', label: 'FAQ' },
  { to: '/events/qompute/resources', label: 'Resources' },
  { to: '/events/qompute/register', label: 'Register' },
];

const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`.trim();

const EventSubnav = () => (
  <nav aria-label="Qompute in LA" className={styles.subnav}>
    <Container className={styles.inner}>
      {LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
          {link.label}
        </NavLink>
      ))}
    </Container>
  </nav>
);

export default EventSubnav;
