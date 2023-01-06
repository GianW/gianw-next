import PropTypes from 'prop-types'

import { Card, CardContent, Link, CardHeader } from '@mui/material'
import { useStyles } from './style'

export const MainLastPosts = ({ blogPosts }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader subheader='Last posts' />
      <CardContent>
        {blogPosts.map(post => (
          <p key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </p>
        ))}
      </CardContent>
    </Card>
  )
}

MainLastPosts.propTypes = {
  blogPosts: PropTypes.array,
}
