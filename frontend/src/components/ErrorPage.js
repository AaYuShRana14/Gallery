// ErrorPage.js
import React from 'react';

const ErrorPage = () => {
  const errorMessage = "something went wrong";

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Error!!!</h1>
        <p style={styles.message}>{errorMessage}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '2em',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2em',
    color: '#333',
  },
};

export default ErrorPage;
