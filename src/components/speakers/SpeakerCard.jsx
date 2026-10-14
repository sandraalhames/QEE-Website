import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SpeakerCard.module.css';

const KIND_LABEL = {
  keynote: 'Keynote Speaker', speaker: 'Speaker', panelist: 'Panelist', workshop: 'Workshop Host',
};

const Photo = ({ photo = null, name, className }) => (photo ? (
  <img src={photo} alt={name} className={className} />
) : (
  <div className={`${className} ${styles.avatar}`} role="img" aria-label={`${name} (photo coming soon)`}>
    <span aria-hidden="true">|ψ⟩</span>
  </div>
));

Photo.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

// Photo, name and title on the card; clicking opens a dialog with the full bio.
const SpeakerCard = ({
  name, title, bio, photo = null, kind = null, roleLabel = null, compact = false,
}) => {
  const label = roleLabel || (kind ? KIND_LABEL[kind] : null);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const dialogId = `speaker-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className={`${styles.card} ${compact ? styles.compact : ''}`.trim()}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-controls={dialogId}
      >
        <Photo photo={photo} name={name} className={compact ? styles.photoSmall : styles.photo} />
        <span className={styles.name}>{name}</span>
        {label && <span className={styles.role}>{label}</span>}
        <span className={styles.title}>{title}</span>
        <span className={styles.more}>{bio.length ? 'Read bio →' : 'Bio coming soon'}</span>
      </button>

      {open && (
        // clicking the dimmed backdrop (not the dialog) closes it; keyboard
        // users close with Escape or the close button
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={styles.backdrop} onClick={onBackdrop}>
          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-name`}
            className={styles.dialog}
            tabIndex={-1}
          >
            <button
              type="button"
              ref={closeRef}
              className={styles.close}
              onClick={close}
              aria-label="Close bio"
            >
              ×
            </button>
            <div className={styles.dialogHead}>
              <Photo photo={photo} name={name} className={styles.dialogPhoto} />
              <div>
                <h3 id={`${dialogId}-name`} className={styles.dialogName}>{name}</h3>
                <p className={styles.dialogTitle}>{label ? `${label} · ${title}` : title}</p>
              </div>
            </div>
            <div className={styles.bio}>
              {bio.length ? bio.map((p) => <p key={p}>{p}</p>) : <p>Bio coming soon.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SpeakerCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.arrayOf(PropTypes.string).isRequired,
  photo: PropTypes.string,
  kind: PropTypes.oneOf(['keynote', 'speaker', 'panelist', 'workshop']),
  roleLabel: PropTypes.string,
  compact: PropTypes.bool,
};

export default SpeakerCard;
