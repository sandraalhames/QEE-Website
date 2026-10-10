import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import judges from '../../content/judges';
import useReveal from '../../hooks/useReveal';
import styles from './JudgesSection.module.css';

// Judges section on the Qompute 2026 landing page, below Speakers.
const JudgesSection = () => {
  const ref = useReveal();
  if (judges.length === 0) return null;
  return (
    <section className={styles.section} ref={ref}>
      <Container>
        <SectionHeading eyebrow="judges" title="Judges" align="center" />
        <ul className={styles.grid}>
          {judges.map((j) => (
            <li key={j.name} className={styles.card}>
              {j.photo ? (
                <img src={j.photo} alt={j.name} className={styles.photo} />
              ) : (
                <div
                  className={`${styles.photo} ${styles.avatar}`}
                  role="img"
                  aria-label={`${j.name} (photo coming soon)`}
                >
                  <span aria-hidden="true">|ψ⟩</span>
                </div>
              )}
              <span className={styles.name}>{j.name}</span>
              {j.role && <span className={styles.role}>{j.role}</span>}
              <span className={styles.org}>{j.org}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default JudgesSection;
