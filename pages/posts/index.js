import PropTypes from 'prop-types'
import { getSortedPostsData } from 'lib/dataSource'
import { AppHeader } from 'components/AppHeader'
import { PostsList } from 'components/PostsList'
import { Fade } from 'components/Animation/Fade'

export default function Posts({ blogPosts }) {
  return (
    <>
      <AppHeader title='Posts' />
      <Fade delay={0}>
        <PostsList posts={blogPosts} />
      </Fade>
    </>
  )
}

Posts.propTypes = {
  blogPosts: PropTypes.array,
}

export async function getStaticProps() {
  const blogPosts = (await getSortedPostsData()) || []
  return {
    props: { blogPosts },
  }
}
