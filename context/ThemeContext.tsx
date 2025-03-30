import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define Context Types
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provide Context
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
