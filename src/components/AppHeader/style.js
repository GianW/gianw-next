import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
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
      // color: theme.palette.getContrastText(theme.palette.background.default),
      color: theme.palette.mode == 'dark' ? '#8a8a8a' : '#626161',
      transition: '0.5s ease',
      '&:hover': {
        color:
          theme.palette.mode == 'dark'
            ? '#fefefe'
            : theme.palette.colors.primary,
        borderBottom: `1px solid ${theme.palette.colors.primary}`,
        cursor: 'pointer',
      },
    },
    selectedLinkText: {
      color:
        theme.palette.mode == 'dark' ? '#fefefe' : theme.palette.colors.primary,
      borderBottom: `1px solid ${theme.palette.colors.primary}`,
      cursor: 'pointer',
    },
  }
})
