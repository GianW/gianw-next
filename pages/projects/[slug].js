import * as React from 'react'
import PropTypes from 'prop-types'
// import { useRouter } from 'next/router'
// import Head from 'next/head'
// import ErrorPage from 'next/error'

// import Container from '../../components/container'
// import PostBody from '../../components/post-body'
// import Header from '../../components/header'
// import PostHeader from '../../components/post-header'
// import SectionSeparator from '../../components/section-separator'
// import Layout from '../../components/layout'
// import PostTitle from '../../components/post-title'

// import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'

import { getAllPostsWithSlug, getPost } from '/lib/contentFullApi'

// import ReactMarkdown from 'react-markdown/react-markdown.min'
// import remarkGfm from 'remark-gfm'

import { PostBody } from '/components/post-body'
import markdownToHtml from '/lib/markdownToHtml'

export default function Post({ post }) {
  // const router = useRouter()

  // if (!router.isFallback && !post) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (
    // <Layout preview={preview}>
    //   <Container>
    //     <Header />
    //     {router.isFallback ? (
    //       <PostTitle>Loading…</PostTitle>
    //     ) : (
    //       <>
    //         <article>
    //           <Head>
    //             <title>{post.title} | Next.js Blog Example with</title>
    //             <meta property='og:image' content={post.coverImage.url} />
    //           </Head>
    //           <PostHeader
    //             title={post.title}
    //             coverImage={post.coverImage}
    //             date={post.date}
    //             author={post.author}
    //           />
    //           <PostBody content={post.content} />
    //         </article>
    //         <SectionSeparator />
    //       </>
    //     )}
    //   </Container>
    // </Layout>

    // <pre>{JSON.stringify(post, null, 2)}</pre>
    // <pre>
    // {JSON.stringify(post?.post.json.content[0].content[0].value, null, 2)}
    // <pre>{JSON.stringify(post, null, 2)}</pre>
    <PostBody content={post} />
    // <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
  )
}
Post.propTypes = {
  post: PropTypes.object,
  // preview: PropTypes.bool,
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPost(params.slug, preview)
  const dados = data?.post.postTwo
  // const dados = data?.post.post.json.content[0].content[0].value
  const content = await markdownToHtml(dados || '')
  // const content = dados

  return {
    props: {
      preview,
      post: content,
      // post: data?.post ?? null,
      // morePosts: data?.morePosts ?? null,
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
