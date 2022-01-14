import * as React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContext } from '../src/ThemeContext'
import Header from '/src/Header'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeContext>
      <Header title={'Gian Winckler'} />
      <CssBaseline />
      <NextNprogress
        color='#fa1e1e'
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />
      <Component {...pageProps} />
    </ThemeContext>
  )
}

MyApp.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
}

export default MyApp
