import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container, Typography } from '@mui/material'
import { PostBody } from 'components/post-body'
import { getAllPostSlugs, getPostData } from 'lib/dataSource'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader'
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
      <Container>
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
            <Typography variant='h3' style={{ marginTop: '2%' }}>
              {post?.title}
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '2%' }}>
              {dateFormatter(post.date)}
            </Typography>
            <hr />
            <PostBody content={post?.contentHtml} />
            <hr className='border-accent-2 mt-28 mb-24' />
          </>
        )}
      </Container>
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
