import PropTypes from 'prop-types'

import { Card, Grid, Typography } from '@mui/material'
import { useStyles } from './style'
import { CardContainer } from './CardContainer'
import Router from 'next/router'

export const MainLastPosts = ({ blogPosts }) => {
  const classes = useStyles()

  return (
    <CardContainer title='Latest posts'>
      {blogPosts.map(post => (
        <Grid item sm={9} md={3} key={post.slug}>
          <Card
            className={classes.card}
            onClick={() => Router.push(`/posts/${post.slug}`)}>
            <Typography className={classes.text}>{post.title}</Typography>
          </Card>
        </Grid>
      ))}
    </CardContainer>
  )
}

MainLastPosts.propTypes = {
  blogPosts: PropTypes.array,
}
