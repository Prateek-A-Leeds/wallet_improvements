import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

type ThemeMode = 'system' | 'light' | 'dark';

const applyThemeOnLoad = () => {
  const savedTheme =
    (localStorage.getItem('theme-mode') as ThemeMode | null) || 'system';
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  if (savedTheme === 'dark') {
    root.classList.add('dark');
  } else if (savedTheme === 'light') {
    root.classList.remove('dark');
  } else {
    root.classList.toggle('dark', systemPrefersDark);
  }
};

applyThemeOnLoad();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
