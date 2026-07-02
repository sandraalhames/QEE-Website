import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import styles from './Expect.module.css';

const TRACKS = [
  {
    ket: 'learn',
    title: 'Workshops',
    body: 'Intro sessions that take you from zero quantum background to writing your first circuits. No prerequisites.',
  },
  {
    ket: 'build',
    title: 'Virtual challenges',
    body: 'Quantum computing challenges you complete on your own schedule in the weeks before the conference, solo or with a team.',
  },
  {
    ket: 'connect',
    title: 'Conference day',
    body: 'October 4 at USC: keynote talks, panels on quantum ethics, hands-on workshops, merch, and the people building the field.',
  },
];

const Expect = () => (
  <section className={styles.section} ref={useReveal()}>
    <Container>
      <SectionHeading
        eyebrow="what to expect"
        title="Three ways in"
        subtitle="Come for the talks, the challenges, or the community. Most people leave with all three."
      />
      <div className={styles.grid}>
        {TRACKS.map((track) => (
          <div key={track.ket} className={styles.card}>
            <p className={styles.ket}>
              <span className={styles.bracket}>|</span>
              {track.ket}
              <span className={styles.bracket}>⟩</span>
            </p>
            <h3 className={styles.title}>{track.title}</h3>
            <p className={styles.body}>{track.body}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default Expect;
