import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import styles from './Footer.module.css';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className={styles.footer}>
    <Container className={styles.inner}>
      <div>
        <p className={styles.org}>Quantum Engineering Ethics @ USC</p>
        <a href="mailto:qee@usc.edu" className={styles.email}>qee@usc.edu</a>
      </div>

      <nav className={styles.links}>
        <a href="https://www.linkedin.com/company/quantum-engineering-ethics/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://www.instagram.com/qee_usc/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <Link to="/registration">Register</Link>
      </nav>

      <p className={styles.copyright}>
        &copy;
        {' '}
        {CURRENT_YEAR}
        {' '}
        Quantum Engineering Ethics. All rights reserved.
      </p>
    </Container>
  </footer>
);

export default Footer;
