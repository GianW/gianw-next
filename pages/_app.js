import CssBaseline from '@mui/material/CssBaseline';
import {ThemeContext}from '../src/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContext>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeContext>
  )
}

export default MyApp
