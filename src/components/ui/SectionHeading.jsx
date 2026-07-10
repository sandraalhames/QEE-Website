import PropTypes from 'prop-types';
import styles from './SectionHeading.module.css';

const SectionHeading = ({
  eyebrow = undefined, title, subtitle = undefined, align = 'left', as = 'h2',
}) => {
  const Heading = as;
  return (
    <div className={`${styles.wrap} ${styles[align]}`}>
      {eyebrow && (
        <p className={styles.eyebrow}>
          <span className={styles.ket}>|</span>
          {eyebrow}
          <span className={styles.ket}>⟩</span>
        </p>
      )}
      <Heading className={styles.title}>{title}</Heading>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

SectionHeading.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center']),
  as: PropTypes.oneOf(['h1', 'h2', 'h3']),
};

export default SectionHeading;
