import { createTheme } from '@mui/material/styles';

export const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
        light: '#c34cd7',
        main: '#9c27b0',
        dark: '#641971',
        contrastText: '#ffffff',
    },
    secondary: {
        light: '#9ad69a',
        main: '#64c064',
        dark: '#3e993e',
        contrastText: '#ffffff',
    },
    error: {
        light: '#e18c88',
        main: '#d2504b',
        dark: '#a72e2a',
        contrastText: '#ffffff',
    },
    warning: {
        light: '#f5ce97',
        main: '#eead51',
        dark: '#dd8a16',
        contrastText: '#ffffff',
    },
    info: {
        light: '#56cbd4',
        main: '#2da7b0',
        dark: '#1d6d73',
        contrastText: '#ffffff',
    },
    success: {
        light: '#9ad69a',
        main: '#64c064',
        dark: '#3e993e',
        contrastText: '#ffffff',
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "'Poppins', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 12,
};

const theme = createTheme(themeOptions);

export default theme;
