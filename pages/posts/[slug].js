import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@mui/material'
import { PostBody } from '/components/post-body'
// import { getAllPostsWithSlug, getPost } from '/lib/api'
import { getAllPostSlugs, getPostData } from '/lib/dataSource'
import Head from 'next/head'
// import markdownToHtml from '/lib/markdownToHtml'
import { AppHeader } from '/components/AppHeader'
import { Seo } from '/components/Seo'

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
            {/* <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} /> */}
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

// export async function getStaticProps({ params }) {
// const data = await getPost(params.slug)
// // const content = await markdownToHtml(data?.blogPosts[0]?.post || '')
// const content = data?.blogPosts[0]?.post
// return {
//   props: {
//     post: {
//       ...data?.blogPosts[0],
//       content,
//     },
//   },
// }
// }

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
  console.log('=====================', allPosts)
  return {
    paths: allPosts?.map(post => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
