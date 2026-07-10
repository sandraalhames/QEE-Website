import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

const TARGET = new Date('2026-10-04T00:00:00-07:00').getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

const partsUntil = (now) => {
  const diff = TARGET - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return {
    days, hours, minutes, seconds,
  };
};

const pad = (n) => String(n).padStart(2, '0');

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let id = null;

    const tick = () => setNow(Date.now());

    const start = () => {
      if (id !== null) return;
      id = window.setInterval(tick, 1000);
    };

    const stop = () => {
      if (id === null) return;
      window.clearInterval(id);
      id = null;
    };

    // pause the tick while the tab is hidden; resync immediately from
    // Date.now() on resume so the displayed countdown isn't stale
    const syncRunning = () => {
      if (document.hidden) {
        stop();
      } else {
        tick();
        start();
      }
    };

    document.addEventListener('visibilitychange', syncRunning);
    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', syncRunning);
    };
  }, []);

  const parts = partsUntil(now);
  const isEventDay = !parts && (now - TARGET) < DAY_MS;

  if (!parts) {
    return (
      <p className={styles.wrap}>
        {isEventDay ? 'Happening today at USC.' : 'That’s a wrap. See you next year.'}
      </p>
    );
  }

  return (
    <p className={styles.wrap}>
      <span className="sr-only">
        {`${parts.days} days, ${parts.hours} hours, and ${parts.minutes} minutes until the conference day.`}
      </span>
      <span aria-hidden="true" className={styles.visual}>
        <span className={styles.tminus}>T−</span>
        <span className={styles.unit}>
          {parts.days}
          <em>d</em>
        </span>
        <span className={styles.unit}>
          {pad(parts.hours)}
          <em>h</em>
        </span>
        <span className={styles.unit}>
          {pad(parts.minutes)}
          <em>m</em>
        </span>
        <span className={styles.unit}>
          {pad(parts.seconds)}
          <em>s</em>
        </span>
        <span className={styles.label}>until conference day</span>
      </span>
    </p>
  );
};

export default Countdown;
