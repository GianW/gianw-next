import * as React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContext } from '../src/ThemeContext'

function MyApp({ Component, pageProps }) {
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
