import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import event from '../content/event';
import styles from './Registration.module.css';

// TODO: replace with the real Google Form URL once it's built.
const REGISTRATION_FORM_URL = null;

const DETAILS = [
  { k: 'when', v: `${event.finalEventDateLabel} — conference day; virtual challenges run in the weeks prior` },
  { k: 'where', v: 'USC campus, Los Angeles (venue announced with the schedule)' },
  { k: 'format', v: 'Keynote talks, hands-on workshops, panels, and merch' },
];

const Registration = () => (
  <section className={styles.section}>
    <Container className={styles.inner}>
      <SectionHeading
        eyebrow="registration"
        title="Sign up for Qompute in LA"
        subtitle="Registration opens soon via Google Form."
        align="center"
      />

      <dl className={styles.details}>
        {DETAILS.map((row) => (
          <div key={row.k} className={styles.row}>
            <dt className={styles.key}>
              <span className={styles.ket}>|</span>
              {row.k}
              <span className={styles.ket}>⟩</span>
            </dt>
            <dd className={styles.value}>{row.v}</dd>
          </div>
        ))}
      </dl>

      {REGISTRATION_FORM_URL ? (
        <Button href={REGISTRATION_FORM_URL} variant="primary">Open registration form</Button>
      ) : (
        <div className={styles.notify}>
          <p className={styles.tba}>
            The form isn&apos;t live yet — get notified the moment it is:
          </p>
          <div className={styles.notifyActions}>
            <Button href="https://www.instagram.com/qee_usc/" variant="primary">Follow @qee_usc</Button>
            <Button href="mailto:qee@usc.edu?subject=Qompute%20in%20LA%20interest" variant="secondary">
              Email us your interest
            </Button>
            <Button href={event.gcalUrl} variant="secondary">Add to Google Calendar</Button>
          </div>
        </div>
      )}
    </Container>
  </section>
);

export default Registration;
