import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import styles from './events/EventPage.module.css';

// TODO: replace the placeholder with the Q³ Initiative content.
const Q3Initiative = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        as="h1"
        eyebrow="initiative"
        title="Q³ Initiative"
        subtitle="More about the Q³ Initiative is coming soon."
      />
    </Container>
  </section>
);

export default Q3Initiative;
