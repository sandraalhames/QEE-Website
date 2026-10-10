import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import SpeakerGrid from '../speakers/SpeakerGrid';
import speakers from '../../content/speakers';
import useReveal from '../../hooks/useReveal';
import styles from './SpeakersPreview.module.css';

// Speakers section on the Qompute 2026 landing page.
const SpeakersPreview = () => {
  const ref = useReveal();
  if (speakers.length === 0) return null;
  return (
    <section className={styles.section} ref={ref}>
      <Container>
        <SectionHeading
          eyebrow="speakers"
          title="Speakers"
          subtitle="Meet the people joining us on October 18. Click a speaker to read their bio."
          align="center"
        />
        <SpeakerGrid />
      </Container>
    </section>
  );
};

export default SpeakersPreview;
