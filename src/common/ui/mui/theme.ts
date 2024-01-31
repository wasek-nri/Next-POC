'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          // palette values for dark mode
          background: {
            default: '#121212',
            paper: '#1d1d1d',
          },
        }
      : {
          // palette values for light mode
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
        }),
  },
  // ...other theme customizations
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
