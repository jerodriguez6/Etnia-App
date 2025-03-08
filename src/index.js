import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Actualiza el atributo data-theme cuando cambie el modo
const themeProvider = document.querySelector('#root').closest('html');
if (themeProvider) {
  const updateTheme = (isDark) => {
    themeProvider.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };
  // Simula un cambio inicial (puedes conectar esto al contexto)
  updateTheme(false); // Modo claro por defecto
}