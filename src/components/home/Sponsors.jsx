import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import sponsors from '../../content/sponsors';
import styles from './Sponsors.module.css';

const Sponsors = () => (
  <section className={styles.section} ref={useReveal()}>
    <Container>
      <SectionHeading eyebrow="Sponsors" title="Backed by" align="center" />
      {sponsors.length === 0 ? (
        <p className={styles.tba}>
          This year&apos;s sponsor lineup is being finalized — check back soon.
          {' '}
          <a href="mailto:qee@usc.edu">Interested in sponsoring?</a>
        </p>
      ) : (
        <div className={styles.grid}>
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoLink}
            >
              <img src={sponsor.logo} alt={sponsor.name} />
            </a>
          ))}
        </div>
      )}
    </Container>
  </section>
);

export default Sponsors;
