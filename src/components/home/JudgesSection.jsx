import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import JudgeGrid from '../speakers/JudgeGrid';
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
        <SectionHeading
          eyebrow="judges"
          title="Judges"
          subtitle="Click a judge to read their bio."
          align="center"
        />
        <JudgeGrid />
      </Container>
    </section>
  );
};

export default JudgesSection;
