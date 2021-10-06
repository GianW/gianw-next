// import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
