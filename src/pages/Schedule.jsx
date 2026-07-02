import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import event from '../content/event';
import styles from './Schedule.module.css';

const Schedule = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading eyebrow="Coming soon" title="Schedule" />
      <p className={styles.body}>
        {event.format}
        {' '}
        Full dates for the virtual challenge window and workshops will be
        posted here once locked in. The final conference day is
        {' '}
        <strong>{event.finalEventDateLabel}</strong>
        .
      </p>
    </Container>
  </section>
);

export default Schedule;
