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
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
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
    <p className={styles.wrap} aria-label={`${parts.days} days until the conference day`}>
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
    </p>
  );
};

export default Countdown;
