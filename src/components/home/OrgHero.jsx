import Container from '../ui/Container';
import Button from '../ui/Button';
import QuantumField from './QuantumField';
import Countdown from './Countdown';
import event from '../../content/event';
import styles from './OrgHero.module.css';

const memberHref = event.joinFormUrl
  || 'mailto:qee@usc.edu?subject=Joining%20QEE';

const OrgHero = () => (
  <section className={styles.hero}>
    <QuantumField />
    <Container className={styles.inner}>
      <p className={styles.eyebrow}>
        <span className={styles.ket}>|</span>
        usc quantum engineering ethics
        <span className={styles.ket}>⟩</span>
      </p>
      <h1 className={styles.title}>
        Quantum computing,
        {' '}
        <span className={styles.accent}>done ethically</span>
      </h1>
      <p className={styles.subtitle}>
        QEE is USC&apos;s student org exploring the responsibility that comes
        with quantum computing&apos;s power, through talks, panels, and
        hands-on events.
      </p>
      <div className={styles.actions}>
        <Button href={memberHref} variant="glow">Become a member</Button>
        <Button to="/events/qompute" variant="ghost">Explore Qompute in LA</Button>
      </div>
      <p className={styles.teaser}>Next up: Qompute in LA</p>
      <Countdown />
    </Container>
  </section>
);

export default OrgHero;
