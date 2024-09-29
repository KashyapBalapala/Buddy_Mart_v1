import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'https://localhost:8000/auth/google';
  };

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const isUserLoggedIn = localStorage.getItem('user');
    if (isUserLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <button style={styles.button} onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Login;
