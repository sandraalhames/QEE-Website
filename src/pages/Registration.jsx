import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import styles from './Registration.module.css';

// TODO: replace with the real Google Form URL once it's built.
const REGISTRATION_FORM_URL = null;

const Registration = () => (
  <section className={styles.section}>
    <Container className={styles.inner}>
      <SectionHeading
        eyebrow="Registration"
        title="Sign up for Qompute in LA"
        subtitle="Registration opens soon via Google Form — check back here or follow @qee_usc for the announcement."
        align="center"
      />
      {REGISTRATION_FORM_URL ? (
        <Button href={REGISTRATION_FORM_URL} variant="primary">Open registration form</Button>
      ) : (
        <p className={styles.tba}>Form link coming soon.</p>
      )}
    </Container>
  </section>
);

export default Registration;
