import Container from '../ui/Container';
import Button from '../ui/Button';
import QuantumField from './QuantumField';
import Countdown from './Countdown';
import event from '../../content/event';
import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <QuantumField />
    <Container className={styles.inner}>
      <p className={styles.eyebrow}>
        <span className={styles.ket}>|</span>
        usc quantum engineering ethics
        <span className={styles.ket}>⟩</span>
      </p>
      <h1 className={styles.title}>
        Qompute in
        {' '}
        <span className={styles.accent}>LA</span>
      </h1>
      <p className={styles.subtitle}>
        A quantum computing &amp; ethics hackathon for USC students.
        Virtual challenges lead up to an in-person conference day on
        {' '}
        {event.finalEventDateLabel}
        .
      </p>
      <Countdown />
      <div className={styles.actions}>
        <Button to="/registration" variant="glow">Register interest</Button>
        <Button to="/schedule" variant="ghost">View schedule</Button>
      </div>
    </Container>
  </section>
);

export default Hero;
