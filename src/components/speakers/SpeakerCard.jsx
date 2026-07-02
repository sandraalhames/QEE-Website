import PropTypes from 'prop-types';
import styles from './SpeakerCard.module.css';

const SpeakerCard = ({
  name, credential = null, title, bio, photo = null, kind,
}) => (
  <article className={styles.card}>
    <div className={styles.top}>
      {photo ? (
        <img src={photo} alt={name} className={styles.photo} />
      ) : (
        <div className={styles.avatar} aria-hidden="true">
          <span>|ψ⟩</span>
        </div>
      )}
      <div>
        <p className={styles.kind}>
          <span className={styles.bracket}>|</span>
          {kind}
          <span className={styles.bracket}>⟩</span>
        </p>
        <h3 className={styles.name}>
          {name}
          {credential && <span className={styles.credential}>{`, ${credential}`}</span>}
        </h3>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
    <p className={styles.bio}>{bio}</p>
  </article>
);

SpeakerCard.propTypes = {
  name: PropTypes.string.isRequired,
  credential: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  photo: PropTypes.string,
  kind: PropTypes.oneOf(['speaker', 'panelist']).isRequired,
};

export default SpeakerCard;
