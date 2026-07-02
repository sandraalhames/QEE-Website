import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import styles from './NotFound.module.css';

const NotFound = () => (
  <section className={styles.section}>
    <Container className={styles.inner}>
      <h1 className={styles.code}>404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Button to="/" variant="primary">Back to home</Button>
    </Container>
  </section>
);

export default NotFound;
