import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import SpeakerGrid from '../components/speakers/SpeakerGrid';
import speakers from '../content/speakers';
import styles from './Speakers.module.css';

const Speakers = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        as="h1"
        eyebrow="speakers"
        title="Talks and panels"
        subtitle="The people bringing quantum computing and its ethics questions to the conference day. Click a speaker to read their bio."
      />
      {speakers.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyBlurb}>
            This year&apos;s lineup is still in superposition. Speakers and
            panelists will be announced here as they&apos;re confirmed.
          </p>
          <Button href="https://www.instagram.com/qee_usc/" variant="secondary">
            Follow @qee_usc for announcements
          </Button>
        </div>
      ) : (
        <SpeakerGrid />
      )}
    </Container>
  </section>
);

export default Speakers;
