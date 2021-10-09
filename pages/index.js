import Header from '/src/Header'
import { makeStyles } from "@mui/styles";
import {AppBar, Toolbar, Container, Typography}  from '@mui/material'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    toolBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > :first-child': {
        marginLeft: '90%',
      },
    },
  }
})

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Header title={'Gian Winckler'} />
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant='inherit' component="div" >Gian Winckler</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className={classes.root}>
        <Typography>Hi, there! </Typography>
      </Container>
    </>
  )
}
