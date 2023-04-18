import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Grid, Typography } from '@mui/material'
import { PostBody } from 'components/post-body'
import { getAllBrainSlugs, getBrainData } from 'lib/dataSource'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader'
import { Seo } from 'components/Seo'

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
              <Typography variant='h3' style={{ marginTop: '2%' }}>
                {brain?.title}
              </Typography>
              <hr />
              <PostBody content={brain?.contentHtml} />
              <hr className='border-accent-2 mt-28 mb-24' />
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
