import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({
  children, to = undefined, href = undefined, variant = 'primary',
  type = 'button', onClick = undefined,
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
    // only real web links open a new tab; mailto: in a new tab leaves the
    // user stranded on a blank page in several browsers
    const isWebLink = href.startsWith('http');
    return (
      <a
        href={href}
        className={className}
        target={isWebLink ? '_blank' : undefined}
        rel={isWebLink ? 'noopener noreferrer' : undefined}
      >
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

export default Button;
