import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@mui/material'
import { AppHeader } from '/components/AppHeader'
import Head from 'next/head'
import { Seo } from '/components/Seo'

import { getAllPostsWithSlug, getPost } from '/lib/contentFullApi'

import { PostBody } from '/components/post-body'
import markdownToHtml from '/lib/markdownToHtml'

export default function Post({ content, post }) {
  const router = useRouter()

  if (!router.isFallback && !post) {
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
              <title>{content.titulo}</title>
              <Seo keywords={content.seo} />
            </Head>
            <PostBody content={post} />
          </>
        )}
      </Container>
    </>
  )
}
Post.propTypes = {
  content: PropTypes.object,
  post: PropTypes.object,
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPost(params.slug, preview)
  const buildedContent = await markdownToHtml(data?.post.post || '')

  return {
    props: {
      preview,
      post: buildedContent,
      content: data?.post,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: true,
  }
}
