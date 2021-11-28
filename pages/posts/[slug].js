import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
// import Container from '@/components/container'
import { Container } from '@mui/material'
// import { PostBody } from '/components/post-body'
import { getAllPostsWithSlug, getPost } from '/lib/api'
import Head from 'next/head'
// import markdownToHtml from '/lib/markdownToHtml'
import { AppHeader } from '/components/AppHeader'
import { Seo } from '/components/Seo'

// import ReactMarkdown from 'react-markdown'
import ReactMarkdown from 'react-markdown/react-markdown.min'

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
            {post?.ini.toString()}
            {post?.fim.toString()}
            {/* <PostBody content={post?.content} /> */}
            <ReactMarkdown>{post?.content}</ReactMarkdown>
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
  const ini = new Date()
  const data = await getPost(params.slug)
  // const content = await markdownToHtml(data?.blogPosts[0]?.post || '')
  const content = data?.blogPosts[0]?.post || ''

  const fim = new Date()

  return {
    props: {
      post: {
        ...data?.blogPosts[0],
        content,
        ini: ini.toString(),
        fim: fim.toString(),
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
