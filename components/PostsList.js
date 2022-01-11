import PropTypes from 'prop-types'

import { makeStyles } from '@mui/styles'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  CardActionArea,
} from '@mui/material'

export const PostsList = ({ posts }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      direction='row'
      justify='flex-start'
      alignItems='flex-start'>
      {posts.map(post => (
        <Grid key={post.slug} item xs={3}>
          <Card>
            <CardActionArea href={`/posts/${post.slug}`}>
              <CardHeader subheader={post.title} />
              <CardContent>{post.Titulo}</CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array,
}

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      boxSizing: 'border-box',
      padding: '10px',
    },
  }
})
