import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import styles from './About.module.css';

const About = () => (
  <section className={styles.section} ref={useReveal()}>
    <Container>
      <SectionHeading
        eyebrow="About"
        title="Engineering an ethical future in tech"
        subtitle="Quantum Engineering Ethics (QEE) explores the responsibility that comes with quantum computing's power."
      />
      <p className={styles.body}>
        Through lectures, panels, keynote speakers, and hands-on activities,
        QEE challenges current and future engineers to explore the ethical
        implications of their work — building toward a quantum future that
        benefits everyone, not just the people building it. Qompute in LA is
        our annual hackathon: a chance for USC students to work hands-on with
        quantum computing while thinking critically about how it should be
        used.
      </p>
    </Container>
  </section>
);

export default About;
