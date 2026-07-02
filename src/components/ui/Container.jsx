import PropTypes from 'prop-types';
import styles from './Container.module.css';

const Container = ({ children, className = '' }) => (
  <div className={`${styles.container} ${className}`.trim()}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
