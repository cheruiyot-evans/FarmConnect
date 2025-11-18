import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // create this (Tailwind or plain CSS) if you haven't already

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
