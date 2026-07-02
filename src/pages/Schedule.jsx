import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import schedule from '../content/schedule';
import event from '../content/event';
import styles from './Schedule.module.css';

const Schedule = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        eyebrow="schedule"
        title="How the event flows"
        subtitle="Dates for the virtual phases are being finalized. The conference day is locked."
      />
      <div className={styles.circuit}>
        {schedule.map((step) => (
          <div key={step.label} className={styles.step}>
            <div className={`${styles.gate} ${step.confirmed ? styles.gateConfirmed : ''}`.trim()}>
              {step.gate}
            </div>
            <div className={styles.info}>
              <p className={styles.date}>
                {step.date || 'date tba'}
              </p>
              <h3 className={styles.label}>{step.label}</h3>
              <p className={styles.detail}>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.legend}>
        The phases form a real quantum circuit: initialize
        {' '}
        <span className={styles.legendGate}>|0⟩</span>
        , superpose
        {' '}
        <span className={styles.legendGate}>H</span>
        , entangle
        {' '}
        <span className={styles.legendGate}>CX</span>
        , measure
        {' '}
        <span className={styles.legendGate}>M</span>
        . Measurement day is the one that&apos;s locked in.
      </p>
      <div className={styles.calendar}>
        <Button href={event.gcalUrl} variant="secondary">
          Add Oct 4 to Google Calendar
        </Button>
      </div>
    </Container>
  </section>
);

export default Schedule;
