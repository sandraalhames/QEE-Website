import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import FaqItem from '../components/faq/FaqItem';
import faq from '../content/faq';
import styles from './Faq.module.css';

const Faq = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        eyebrow="faq"
        title="Frequently asked questions"
        subtitle="Can't find your answer? Email qee@usc.edu and we'll get back to you."
      />
      <div className={styles.list}>
        {faq.map((entry) => (
          <FaqItem key={entry.q} question={entry.q} answer={entry.a} />
        ))}
      </div>
    </Container>
  </section>
);

export default Faq;
