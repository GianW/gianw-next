import * as React from 'react';
import Header from '/src/Header'
import { makeStyles } from "@mui/styles";
import {AppBar, Toolbar, Typography, Grid}  from '@mui/material'

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
      }
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
          <Typography variant='h6' component="div" >Gian Winckler</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant='h5'>Hi there! I'm Gian.</Typography>
          <Typography variant='h6'>I'm a software engineer who loves to find new ways to solve real problems with technology.</Typography>
          <Typography variant='h6'>This website is my digital laboratory where i try some things and share another.</Typography>
          <Typography variant='body1'></Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  )
}
