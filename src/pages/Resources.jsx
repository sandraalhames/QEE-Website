import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import resources from '../content/resources';
import styles from './Resources.module.css';

const Resources = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        as="h1"
        eyebrow="resources"
        title="Learn quantum before you compete"
        subtitle="No prior experience needed for Qompute. These will take you from zero to writing circuits."
      />
      <div className={styles.grid}>
        {resources.map((resource) => (
          <a
            key={resource.url}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.tag}>{resource.tag}</span>
            <h3 className={styles.title}>{resource.title}</h3>
            <p className={styles.blurb}>{resource.blurb}</p>
          </a>
        ))}
      </div>
    </Container>
  </section>
);

export default Resources;
