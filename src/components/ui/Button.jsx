import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({
  children, to, href, variant, type, onClick,
}) => {
  const className = `${styles.button} ${styles[variant]}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type -- type is constrained via propTypes.oneOf
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'glow', 'ghost']),
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  to: undefined,
  href: undefined,
  variant: 'primary',
  type: 'button',
  onClick: undefined,
};

export default Button;
