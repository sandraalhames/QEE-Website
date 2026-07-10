import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './Layout.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <section className={styles.errorSection}>
          <Container>
            <p className={styles.errorBlurb}>
              Something went wrong.
              {' '}
              <Button to="/" variant="primary">Return home</Button>
            </p>
          </Container>
        </section>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
