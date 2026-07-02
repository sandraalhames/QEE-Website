import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import styles from './NotFound.module.css';

const NotFound = () => (
  <section className={styles.section}>
    <Container className={styles.inner}>
      <h1 className={styles.code}>
        <span className={styles.ket}>|</span>
        404
        <span className={styles.ket}>⟩</span>
      </h1>
      <p className={styles.blurb}>
        This state doesn&apos;t exist. The wavefunction collapsed to nothing.
      </p>
      <Button to="/" variant="primary">Return to |home⟩</Button>
    </Container>
  </section>
);

export default NotFound;
