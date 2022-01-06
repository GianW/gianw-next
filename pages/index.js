import * as React from 'react'
import PropTypes from 'prop-types'
import Header from '/src/Header'
import { makeStyles } from '@mui/styles'
import { Typography, Grid } from '@mui/material'
// import { getLastPostsForHome } from '/lib/api'
import { getSortedPostsData } from '/lib/dataSource'
import { MainLastPosts } from '/components/MainLastPosts'
import { MainLastProjects } from '/components/MainLastProjects'
import { MainLastBrains } from '/components/MainLastBrains'
import { SocialLinks } from '/components/SocialLinks'
import { AppHeader } from '/components/AppHeader'

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  }
})

export default function Home({ blogPosts }) {
  const classes = useStyles()
  return (
    <>
      <Header title={'Gian Winckler'} />
      <AppHeader />
      <Grid container spacing={2} className={classes.root} alignItems='center'>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} alignItems='center'>
          <SelfPresentation />
          <SocialLinks />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <MainLastPosts blogPosts={blogPosts} />
        </Grid>
        <Grid item xs={3}>
          <MainLastProjects />
        </Grid>
        <Grid item xs={3}>
          <MainLastBrains />
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </>
  )
}

Home.propTypes = {
  blogPosts: PropTypes.array,
}

const SelfPresentation = () => (
  <>
    <Typography variant='h5'>Hi there! I`m Gian.</Typography>
    <Typography variant='h6'>
      I`m a software engineer who loves to find new ways to solve real problems
      with code.
    </Typography>
    <Typography variant='h6'>
      This website is my digital laboratory where i try some things and share
      another.
    </Typography>
    <Typography variant='body1'></Typography>
  </>
)

export async function getStaticProps() {
  // const blogPosts = (await getLastPostsForHome()) || []
  const blogPosts = (await getSortedPostsData()).slice(0, 5) || []
  return {
    props: { blogPosts },
  }
}
