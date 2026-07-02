import PropTypes from 'prop-types';
import styles from './TeamCard.module.css';

const initialsOf = (name) => name
  .split(' ')
  .map((part) => part[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();

const TeamCard = ({
  name, role, photo, linkedin,
}) => (
  <div className={styles.card}>
    {photo ? (
      <img src={photo} alt={name || role} className={styles.photo} />
    ) : (
      <div className={styles.avatar} aria-hidden="true">
        <span>{name ? initialsOf(name) : '|ψ⟩'}</span>
      </div>
    )}
    <div className={styles.details}>
      <h3 className={styles.name}>{name || 'Coming soon'}</h3>
      <p className={styles.role}>{role}</p>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.social}>
          LinkedIn
        </a>
      )}
    </div>
  </div>
);

TeamCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string.isRequired,
  photo: PropTypes.string,
  linkedin: PropTypes.string,
};

TeamCard.defaultProps = {
  name: null,
  photo: null,
  linkedin: null,
};

export default TeamCard;
