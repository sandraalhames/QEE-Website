import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import schedule from '../content/schedule';
import styles from './Schedule.module.css';

const Schedule = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        eyebrow="schedule"
        title="How the event flows"
        subtitle="Dates for the virtual phases are being finalized — the conference day is locked."
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
        Gate letters borrowed from quantum circuits — the measurement gate
        {' '}
        <span className={styles.legendGate}>M</span>
        {' '}
        is the one that&apos;s locked in.
      </p>
    </Container>
  </section>
);

export default Schedule;
