import Header from '/src/Header'
import { makeStyles } from "@mui/styles";
import {AppBar, Container, Typography}  from '@mui/material'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  }
})

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Header title={'Gian Winckler'} />
      <AppBar position="static">
        <Typography variant='inherit'>Gian Winckler</Typography>
      </AppBar>
      <Container maxWidth="xl" className={classes.root}>
        <Typography>MATERIAL</Typography>
      </Container>
    </>
  )
}
