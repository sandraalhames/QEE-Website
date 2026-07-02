import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FaqItem.module.css';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.question}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{question}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`.trim()} aria-hidden="true">
          ⟩
        </span>
      </button>
      {isOpen && <p className={styles.answer}>{answer}</p>}
    </div>
  );
};

FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default FaqItem;
