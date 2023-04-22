import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Typography, Grid } from '@mui/material'
import { PostBody } from 'components/post-body'
import { getAllPostSlugs, getPostData } from 'lib/dataSource'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader/AppHeader'
import { Seo } from 'components/Seo'
import { dateFormatter } from 'utils/dateFormatter'

export default function Post({ post }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
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
        <Grid item xs={9} alignItems='center' justifyContent='flex-start'>
          {router.isFallback ? (
            <>
              <p>Loading…</p>
            </>
          ) : (
            <>
              <Head>
                <title>{post.title}</title>
                <Seo keywords={[post.seo]} />
              </Head>
              <Typography variant='h4' style={{ marginTop: '2%' }}>
                {post?.title}
              </Typography>
              <Typography variant='body2' style={{ marginBottom: '2%' }}>
                {dateFormatter(post.date)}
              </Typography>
              <PostBody content={post?.contentHtml} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug)
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostSlugs()
  return {
    paths: allPosts?.map(post => `/posts/${post.params.slug}`) || [],
    fallback: true,
  }
}
