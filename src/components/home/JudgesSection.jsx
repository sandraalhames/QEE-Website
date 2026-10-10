import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import SpeakerCard from '../speakers/SpeakerCard';
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
        <div className={styles.grid}>
          {judges.map((j) => (
            <div key={j.name} className={styles.cell}>
              <SpeakerCard
                compact
                name={j.name}
                roleLabel={j.role}
                title={j.org}
                bio={j.bio}
                photo={j.photo}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default JudgesSection;
