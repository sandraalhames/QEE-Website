import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ children, className = '' }) => (
  <div className={`${styles.card} ${className}`.trim()}>{children}</div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
