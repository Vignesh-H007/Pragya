import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
