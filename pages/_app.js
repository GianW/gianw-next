import * as React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContext } from '../src/ThemeContext'

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
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeContext>
  )
}

MyApp.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
}

export default MyApp
