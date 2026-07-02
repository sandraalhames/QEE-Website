import Container from '../ui/Container';
import Button from '../ui/Button';
import event from '../../content/event';
import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <Container className={styles.inner}>
      <p className={styles.eyebrow}>USC Quantum Engineering Ethics</p>
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
      <div className={styles.actions}>
        <Button to="/registration" variant="primary">Register interest</Button>
        <Button to="/schedule" variant="secondary">View schedule</Button>
      </div>
    </Container>
  </section>
);

export default Hero;
