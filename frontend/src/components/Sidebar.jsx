import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ role }) {
  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.title}>{role} Menu</h3>

      <ul style={styles.menu}>
        <li>
          <Link to='/dashboard' style={styles.link}>
            Dashboard Home
          </Link>
        </li>

        {role === 'Farmer' && (
          <>
            <li>
              <Link to='/farmer/products' style={styles.link}>
                My Products
              </Link>
            </li>
            <li>
              <Link to='/farmer/orders' style={styles.link}>
                Orders
              </Link>
            </li>
            <li>
              <Link to='/farmer/analytics' style={styles.link}>
                Analytics
              </Link>
            </li>
          </>
        )}

        {role === 'Buyer' && (
          <>
            <li>
              <Link to='/buyer/explore' style={styles.link}>
                Explore
              </Link>
            </li>
            <li>
              <Link to='/buyer/orders' style={styles.link}>
                My Orders
              </Link>
            </li>
            <li>
              <Link to='/buyer/chat' style={styles.link}>
                Chat
              </Link>
            </li>
          </>
        )}

        {role === 'Admin' && (
          <>
            <li>
              <Link to='/admin/users' style={styles.link}>
                Manage Users
              </Link>
            </li>
            <li>
              <Link to='/admin/listings' style={styles.link}>
                Manage Listings
              </Link>
            </li>
            <li>
              <Link to='/admin/logs' style={styles.link}>
                System Logs
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '220px',
    background: '#f2f2f2',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '20px',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    display: 'block',
    padding: '10px 0',
  },
};
