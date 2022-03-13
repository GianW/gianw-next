import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Typography, Grid } from '@mui/material'
import { getSortedPostsData, getAllBrainSlugs } from 'lib/dataSource'
import { getProjectsForMain } from 'lib/contentFullApi'
import { MainLastPosts } from 'components/MainLastPosts'
import { MainLastProjects } from 'components/MainLastProjects'
import { MainLastBrains } from 'components/MainLastBrains'
import { SocialLinks } from 'components/SocialLinks'
import { AppHeader } from 'components/AppHeader'
import { Fade } from 'components/Animation/Fade'

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  }
})

export default function Home({ blogPosts, brainPosts, projPosts }) {
  const classes = useStyles()
  return (
    <>
      <AppHeader />
      <Grid
        container
        spacing={2}
        className={classes.root}
        alignItems='flex-start'
        direction='row'
        justifyContent='center'>
        <Grid item xs={9} alignItems='center'>
          <Fade delay={0}>
            <SelfPresentation />
          </Fade>
          <Fade delay={0.2}>
            <SocialLinks />
          </Fade>
        </Grid>
      </Grid>
      <Fade delay={0.4}>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
          justifyContent='center'
          className={classes.root}>
          <Grid item xs={10} sm={6} md={3}>
            <MainLastPosts blogPosts={blogPosts} />
          </Grid>
          <Grid item xs={10} sm={6} md={3}>
            <MainLastProjects projects={projPosts} />
          </Grid>
          <Grid item xs={10} sm={6} md={3}>
            <MainLastBrains brains={brainPosts} />
          </Grid>
        </Grid>
      </Fade>
    </>
  )
}

Home.propTypes = {
  blogPosts: PropTypes.array,
  brainPosts: PropTypes.array,
  projPosts: PropTypes.array,
}

const SelfPresentation = () => (
  <>
    <Typography variant='h5'>Hi there! I&apos;m Gian.</Typography>
    <Typography variant='h6'>
      I&apos;m a software engineer who loves to find new ways to solve real
      problems with code.
    </Typography>
    <Typography variant='h6'>
      This website is my digital laboratory where i try some things and share
      another.
    </Typography>
    <Typography variant='body1'></Typography>
  </>
)

export async function getStaticProps() {
  const blogPosts = (await getSortedPostsData()).slice(0, 5) || []
  const brainPosts = (await getAllBrainSlugs()).slice(0, 5) || []
  const projPosts = (await getProjectsForMain()) || []
  return {
    props: { blogPosts, brainPosts, projPosts },
  }
}
