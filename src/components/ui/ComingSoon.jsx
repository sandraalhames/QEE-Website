import PropTypes from 'prop-types';
import Container from './Container';
import SectionHeading from './SectionHeading';
import styles from './ComingSoon.module.css';

const ComingSoon = ({ title, blurb }) => (
  <section className={styles.section}>
    <Container>
      <SectionHeading eyebrow="Coming soon" title={title} subtitle={blurb} />
    </Container>
  </section>
);

ComingSoon.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
};

export default ComingSoon;
