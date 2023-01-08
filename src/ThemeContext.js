import * as React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function ThemeContext({ children }) {
  const [mode, setMode] = React.useState('dark')

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )
  const userTheme = theme({ mode: mode })

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={userTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

ThemeContext.propTypes = {
  children: PropTypes.array,
}

function useChangeTheme() {
  const context = React.useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error('useChangeTheme must be used within a ColorModeContext')
  }
  return context
}

export { ThemeContext, useChangeTheme }
