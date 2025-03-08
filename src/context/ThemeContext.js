// src/context/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  background: '#f4f4f4',
  text: '#333',
};

const darkTheme = {
  background: '#1a1a1a',
  backgroundDark: '#2a2a2a',
  text: '#fff',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(darkTheme); // Tema oscuro por defecto

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}