import { useState } from 'react';
import dayof from '../../content/dayof';
import event from '../../content/event';
import styles from './DayOfAgenda.module.css';

const FILTERS = ['all', 'talk', 'workshop', 'panel', 'logistics'];

const DayOfAgenda = () => {
  const [filter, setFilter] = useState('all');
  const rows = filter === 'all' ? dayof : dayof.filter((item) => item.kind === filter);

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>
        Conference day agenda
        <span className={styles.date}>{event.finalEventDateLabel}</span>
      </h3>
      <p className={styles.note}>
        Times and rooms land with the run-of-show. The blocks below are the
        confirmed shape of the day.
      </p>

      <div className={styles.filters} role="group" aria-label="Filter agenda by type">
        {FILTERS.map((kind) => (
          <button
            key={kind}
            type="button"
            className={`${styles.chip} ${filter === kind ? styles.chipActive : ''}`.trim()}
            aria-pressed={filter === kind}
            onClick={() => setFilter(kind)}
          >
            {kind}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {rows.map((item) => (
          <li key={item.title} className={styles.row}>
            <span className={styles.time}>{item.time || 'time tba'}</span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.kind}>
              <span className={styles.bracket}>|</span>
              {item.kind}
              <span className={styles.bracket}>⟩</span>
            </span>
            <span className={styles.location}>{item.location || 'location tba'}</span>
          </li>
        ))}
      </ul>
      {rows.length === 0 && (
        <p className={styles.note}>Nothing in this category yet.</p>
      )}
    </div>
  );
};

export default DayOfAgenda;
