import * as React from 'react';
import Header from '/src/Header'
import { makeStyles, useTheme } from "@mui/styles";
import {AppBar, Toolbar, Typography, Grid, IconButton}  from '@mui/material'
import { Brightness3, Brightness7 } from '@mui/icons-material';

import {useChangeTheme} from '/src/ThemeContext'

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
        marginLeft: '85%',
      }
    },
  }
})

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const changeTheme = useChangeTheme()

  const colorMode = () => {
    changeTheme.toggleColorMode()
  }

  return (
    <>
      <Header title={'Gian Winckler'} />
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton sx={{ ml: 1 }} onClick={colorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness3 />}
          </IconButton>
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
