import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

if (window.location.pathname === '/' && window.location.hash === '#classic') {
  window.location.replace('/2026-aloha-kickball-classic/');
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
