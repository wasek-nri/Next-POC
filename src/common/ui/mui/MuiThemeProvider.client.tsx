'use client';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { getDesignTokens } from './theme';

// Create a context for the theme
const ThemeContext = createContext({
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => {
    const createdTheme = createTheme(getDesignTokens(mode));
    // console.log('Theme updated:', mode, createdTheme);  // Log the updated theme
    return createdTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      //   console.log('Toggling theme mode to:', newMode);  // Debug log
      return newMode;
    });
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
