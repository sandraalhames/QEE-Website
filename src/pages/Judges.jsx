import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import JudgeGrid from '../components/speakers/JudgeGrid';
import styles from './Speakers.module.css';

const Judges = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        as="h1"
        eyebrow="judges"
        title="Meet the judges"
        subtitle="The researchers and engineers reviewing this year's projects. Click a judge to read their bio."
      />
      <JudgeGrid />
    </Container>
  </section>
);

export default Judges;
