import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
// import Container from '@/components/container'
import { Container } from '@mui/material'
import { PostBody } from '/components/post-body'
// import MoreStories from '@/components/more-stories'
// import Header from '@/components/header'
// import PostHeader from '@/components/post-header'
// import SectionSeparator from '@/components/section-separator'
import { getAllPostsWithSlug, getPost } from '/lib/api'
// import PostTitle from '@/components/post-title'
import Head from 'next/head'
// import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '/lib/markdownToHtml'
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
              <title>{post.Titulo}</title>
              <Seo keywords={[post.seo]} />
            </Head>
            <PostBody content={post?.content} />
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
  const data = await getPost(params.slug)
  const content = await markdownToHtml(data?.blogPosts[0]?.post || '')

  return {
    props: {
      post: {
        ...data?.blogPosts[0],
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(post => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
