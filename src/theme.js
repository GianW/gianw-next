import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export const theme = ({ mode = 'dark' }) =>
  createTheme({
    palette: {
      mode: mode,
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
    },
    MuiList: {
      dense: true,
    },
    typography: {
      fontFamily: [
        'Google Sans',
        '"Roboto"',
        '"Helvetica"',
        '"Arial"',
        'sans-serif',
      ].join(','),
    },
    MuiCard: {
      root: {
        overflow: 'unset',
        transition: '0.3s',
        borderRadius: 16,
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        '&:hover': {
          boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
        },
      },
    },
  })
