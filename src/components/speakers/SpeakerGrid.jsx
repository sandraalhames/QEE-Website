import SpeakerCard from './SpeakerCard';
import speakers from '../../content/speakers';
import styles from './SpeakerGrid.module.css';

const SpeakerGrid = () => (
  <div className={styles.grid}>
    {speakers.map((s) => (
      <SpeakerCard
        key={s.name}
        name={s.name}
        title={s.title}
        bio={s.bio}
        photo={s.photo}
        kind={s.kind}
        roleLabel={s.roleLabel}
      />
    ))}
  </div>
);

export default SpeakerGrid;
