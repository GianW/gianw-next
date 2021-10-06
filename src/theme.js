import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#aa6cff',
    },
    secondary: {
      light: '#0066ff',
      dark: '#ff66ff',
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#303030'
    },
  },
});

