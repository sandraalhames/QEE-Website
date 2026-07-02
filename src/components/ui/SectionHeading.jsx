import PropTypes from 'prop-types';
import styles from './SectionHeading.module.css';

const SectionHeading = ({
  eyebrow, title, subtitle, align,
}) => (
  <div className={`${styles.wrap} ${styles[align]}`}>
    {eyebrow && (
      <p className={styles.eyebrow}>
        <span className={styles.ket}>|</span>
        {eyebrow}
        <span className={styles.ket}>⟩</span>
      </p>
    )}
    <h2 className={styles.title}>{title}</h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

SectionHeading.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center']),
};

SectionHeading.defaultProps = {
  eyebrow: undefined,
  subtitle: undefined,
  align: 'left',
};

export default SectionHeading;
