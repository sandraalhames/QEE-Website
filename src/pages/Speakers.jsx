import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import SpeakerCard from '../components/speakers/SpeakerCard';
import speakers from '../content/speakers';
import styles from './Speakers.module.css';

const Speakers = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        eyebrow="speakers"
        title="Talks and panels"
        subtitle="The people bringing quantum computing and its ethics questions to the conference day."
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
        <div className={styles.grid}>
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.name}
              name={speaker.name}
              credential={speaker.credential}
              title={speaker.title}
              bio={speaker.bio}
              photo={speaker.photo}
              kind={speaker.kind}
            />
          ))}
        </div>
      )}
    </Container>
  </section>
);

export default Speakers;
