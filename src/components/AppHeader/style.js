import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => {
  return {
    root: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    toolBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > :second-child': {
        marginLeft: '85%',
      },
    },
    inLineItens: {
      display: 'flex',
    },
    menuLink: {
      cursor: 'pointer',
    },
    linkText: {
      color: theme.palette.mode == 'dark' ? '#8a8a8a' : '#626161',
      transition: '0.5s ease',
      '&:hover': {
        color:
          theme.palette.mode == 'dark'
            ? '#fefefe'
            : theme.palette.colors.primary,
        cursor: 'pointer',
      },
    },
    selectedLinkText: {
      color:
        theme.palette.mode == 'dark' ? '#fefefe' : theme.palette.colors.primary,
      cursor: 'pointer',
    },
    linkStyle: {
      textDecoration: 'none'
    }
  }
})
