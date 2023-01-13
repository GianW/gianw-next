import PropTypes from 'prop-types'

import { Card, Grid, Typography } from '@mui/material'
import { useStyles } from './style'
import { CardContainer } from './CardContainer'
import Router from 'next/router'
import { dateFormatter } from 'utils/dateFormatter'

export const MainLastPosts = ({ blogPosts }) => {
  const classes = useStyles()

  return (
    <CardContainer title='Latest posts'>
      {blogPosts.map(post => (
        <Grid item sm={9} md={3} key={post.slug}>
          <Card
            className={classes.cardProj}
            onClick={() => Router.push(`/posts/${post.slug}`)}>
            <Typography className={classes.text}>{post.title}</Typography>
            <Typography className={classes.textDesc} variant='caption'>
              {dateFormatter(post.date)}
            </Typography>
          </Card>
        </Grid>
      ))}
    </CardContainer>
  )
}

MainLastPosts.propTypes = {
  blogPosts: PropTypes.array,
}
