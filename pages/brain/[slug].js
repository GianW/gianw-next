import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Grid, Typography } from '@mui/material'
import { PostBody } from 'components/post-body'
import { getAllBrainSlugs, getBrainData } from 'lib/dataSource'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader/AppHeader'
import { Seo } from 'components/Seo'
import { Fade } from 'components/Animation/Fade'
import Link from 'next/link'

export default function Brain({ brain }) {
  const router = useRouter()

  if (!router.isFallback && !brain?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <AppHeader />
      <Grid
        container
        spacing={2}
        alignItems='flex-start'
        direction='row'
        justifyContent='center'>
        <Grid item xs={9} alignItems='center'>
          {router.isFallback ? (
            <>
              <p>Loading…</p>
            </>
          ) : (
            <>
              <Head>
                <title>{brain.title}</title>
                <Seo keywords={[brain.seo]} />
              </Head>
              <Fade delay={0}>
                <Link href='/brain' style={{ color: '#8a8a8a', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block', marginTop: '24px', marginBottom: '8px' }}>
                  ← Brain
                </Link>
              </Fade>
              <Fade delay={0.1}>
                <Typography variant='h3' style={{ marginTop: '8px', marginBottom: '8px', textTransform: 'capitalize' }}>
                  {brain?.title}
                </Typography>
              </Fade>
              <Fade delay={0.3}>
                <PostBody content={brain?.contentHtml} />
              </Fade>
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}

Brain.propTypes = {
  brain: PropTypes.object,
}

export async function getStaticProps({ params }) {
  const brain = await getBrainData(params.slug)
  return {
    props: {
      brain,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllBrainSlugs()
  return {
    paths: allPosts?.map(post => `/brain/${post.slug}`) || [],
    fallback: true,
  }
}
