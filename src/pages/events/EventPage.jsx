import PropTypes from 'prop-types';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Sponsors from '../../components/home/Sponsors';
import events from '../../content/events';
import styles from './EventPage.module.css';

// Simple page for events that don't (yet) have a full multi-page section.
const EventPage = ({ slug }) => {
  const { page } = events.find((e) => e.slug === slug);
  return (
    <>
      <section className={styles.section}>
        <Container>
          <SectionHeading as="h1" eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />
          <div className={styles.body}>
            {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {page.link && (
          <div className={styles.actions}>
            <Button href={page.link.href} variant="primary">{page.link.label}</Button>
          </div>
          )}
        </Container>
      </section>
      <Sponsors />
    </>
  );
};

EventPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default EventPage;
