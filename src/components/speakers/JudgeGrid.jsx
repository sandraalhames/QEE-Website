import SpeakerCard from './SpeakerCard';
import judges from '../../content/judges';
import styles from './JudgeGrid.module.css';

const JudgeGrid = () => (
  <div className={styles.grid}>
    {judges.map((j) => (
      <div key={j.name} className={styles.cell}>
        <SpeakerCard
          compact
          name={j.name}
          roleLabel={j.role}
          title={j.org}
          bio={j.bio}
          photo={j.photo}
        />
      </div>
    ))}
  </div>
);

export default JudgeGrid;
