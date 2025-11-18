import React from 'react';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ role, children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role={role} />

      <main style={{ padding: '20px', width: '100%' }}>{children}</main>
    </div>
  );
}
