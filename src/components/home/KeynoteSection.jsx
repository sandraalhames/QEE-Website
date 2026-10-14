import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import keynote from '../../content/keynote';
import useReveal from '../../hooks/useReveal';
import styles from './KeynoteSection.module.css';

// Keynote title and abstract, shown above the speaker list.
const KeynoteSection = () => (
  <section className={styles.section} ref={useReveal()}>
    <Container>
      <div className={styles.card}>
        <SectionHeading eyebrow="keynote" title={keynote.title} subtitle={keynote.presenters} />
        <div className={styles.abstract}>
          {keynote.abstract.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
    </Container>
  </section>
);

export default KeynoteSection;
