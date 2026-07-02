import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import useReveal from '../../hooks/useReveal';
import styles from './TeamPreview.module.css';

const TeamPreview = () => (
  <section className={styles.section} ref={useReveal()}>
    <Container className={styles.inner}>
      <SectionHeading
        eyebrow="Who's behind it"
        title="Meet the e-board"
        subtitle="The USC students organizing Qompute in LA and running QEE's programming year-round."
        align="center"
      />
      <Button to="/team" variant="secondary">Meet the team</Button>
    </Container>
  </section>
);

export default TeamPreview;
