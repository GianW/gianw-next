import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => {
  return {
    card: {
      border:
        theme.palette.mode == 'dark'
          ? '0.5px solid rgb(238 238 238 / 21%)'
          : '0.5px solid #000',
      borderRadius: 6,
      padding: 20,
      cursor: 'pointer',
      display: 'flex',
      gap: 10,
      minHeight: '100%',
      transition: '0.2s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.mode == 'dark' ? '#292929' : '#d7d7d7',
      },
    },
    cardProj: {
      border:
        theme.palette.mode == 'dark'
          ? '0.5px solid rgb(238 238 238 / 21%)'
          : '0.5px solid #000',
      borderRadius: 6,
      padding: 20,
      cursor: 'pointer',
      gap: 4,
      transition: '0.35s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.mode == 'dark' ? '#292929' : '#d7d7d7',
      },
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    chip: {
      padding: 2,
      margin: 4,
      transition: '0.5s ease',
      '&:hover': {
        backgroundColor: theme.palette.mode == 'dark' ? '#fefefe' : '#d3b5d6',
      },
    },
    text: {
      fontSize: '17.6px',
    },
    textDesc: {
      marginTop: 5,
      color: '#919191',
    },
    cardGrid: {
      marginTop: 10,
      marginBottom: 30,
    },
  }
})
