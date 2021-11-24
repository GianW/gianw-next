import * as React from 'react'
import PropTypes from 'prop-types'
import { getAllPostsForHome } from '/lib/api'
import { AppHeader } from '/components/AppHeader'
import { PostsList } from '/components/PostsList'

export default function Posts({ blogPosts }) {
  return (
    <>
      <AppHeader />
      <PostsList posts={blogPosts} />
    </>
  )
}

Posts.propTypes = {
  blogPosts: PropTypes.array,
}

export async function getStaticProps() {
  const blogPosts = (await getAllPostsForHome()) || []
  return {
    props: { blogPosts },
  }
}
