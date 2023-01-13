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
    },
    text: {
      fontSize: '17.6px',
    },
    cardGrid: {
      marginTop: 10,
      marginBottom: 30,
    },
  }
})
