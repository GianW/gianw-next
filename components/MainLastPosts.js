import * as React from 'react'
import PropTypes from 'prop-types'

import { Card, CardContent, Link, CardHeader } from '@mui/material'

export const MainLastPosts = ({ blogPosts }) => {
  return (
    <Card>
      <CardHeader subheader='Last posts' />
      <CardContent>
        {blogPosts.map(post => (
          <p key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.Titulo}</Link>
          </p>
        ))}
      </CardContent>
    </Card>
  )
}

MainLastPosts.propTypes = {
  blogPosts: PropTypes.array,
}
