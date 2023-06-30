import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Typography, Grid } from '@mui/material'
import { getSortedPostsData, getAllBrainSlugs } from 'lib/dataSource'
import { getProjectsForMain } from 'lib/contentFullApi'
import { MainLastPosts } from 'components/index/MainLastPosts'
import { MainLastProjects } from 'components/index/MainLastProjects'
import { MainLastBrains } from 'components/index/MainLastBrains'
import { SocialLinks } from 'components/SocialLinks'
import { AppHeader } from 'components/AppHeader/AppHeader'
import { Fade } from 'components/Animation/Fade'

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    presentTitle: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      width: '70%',
      marginTop: '5%',
      marginBotton: '4%',
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
        </Grid>
      </Grid>
      <Fade delay={0}>
        <hr className={classes.divider} />
      </Fade>
      <Fade delay={0.3}>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
          justifyContent='center'
          className={classes.root}>
          <Grid item xs={9}>
            <MainLastPosts blogPosts={blogPosts} />
          </Grid>
          <Grid item xs={9}>
            <MainLastProjects projects={projPosts} />
          </Grid>
          <Grid item xs={9}>
            <MainLastBrains brains={brainPosts} />
          </Grid>
          <Grid item xs={9}>
            <Fade delay={0.2}>
              <SocialLinks />
            </Fade>
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

const SelfPresentation = () => {
  const classes = useStyles()
  return (
    <>
      <Typography variant='h3' className={classes.presentTitle}>
        Hi there! I&apos;m Gian.
      </Typography>
      <Typography variant='h5'>
        I&apos;m a software engineer who loves to find new ways to solve real
        problems with code.
      </Typography>
      <Typography variant='h5'>
        This website is my digital laboratory, where I do some experiments and
        share others.
      </Typography>
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = (await getSortedPostsData()).slice(0, 8) || []
  const brainPosts = (await getAllBrainSlugs()).slice(0, 5) || []
  const projPosts = (await getProjectsForMain()).slice(0, 8) || []
  return {
    props: { blogPosts, brainPosts, projPosts },
  }
}
