import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>FarmConnect</h2>

      <div style={styles.links}>
        <Link to='/' style={styles.link}>
          Home
        </Link>
        <Link to='/login' style={styles.link}>
          Login
        </Link>
        <Link to='/register' style={styles.link}>
          Register
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: '60px',
    background: '#1a861a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
