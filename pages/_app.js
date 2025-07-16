import * as React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContext } from 'ThemeContext'
import NextNprogress from 'nextjs-progressbar'
import '../public/prism-dracula.css'

// Importa o Header dinamicamente, sem SSR
const Header = dynamic(() => import('Header'), {
  ssr: false,
  loading: () => <div style={{ height: '64px' }} /> // Placeholder com altura similar ao AppBar
})

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
      <Header title={'Gian Winckler'} />
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
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

export default MyApp