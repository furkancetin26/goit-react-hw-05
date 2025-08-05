import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you requested does not exist.</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </main>
  );
}

export default NotFoundPage;
