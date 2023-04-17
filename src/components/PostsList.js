import PropTypes from 'prop-types'

import { makeStyles } from '@mui/styles'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  CardActionArea,
  Typography,
  Chip,
} from '@mui/material'
import { dateFormatter } from 'utils/dateFormatter'

export const PostsList = ({ posts }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      direction='row'
      justify='flex-start'
      alignItems='flex-start'
      className={classes.root}>
      {posts.map(post => (
        <Grid key={post.slug} item xs={12} md={3}>
          <Card>
            <CardActionArea href={`/posts/${post.slug}`}>
              <CardHeader subheader={post.title} />
              <CardContent>
                <Typography variant='caption'>
                  {dateFormatter(post.date)}
                </Typography>
                <Typography variant='body2'>{post.description}</Typography>
                <p>
                  {post.tags.map(tag => (
                    <Chip
                      label={tag}
                      key={tag}
                      color='primary'
                      variant='outlined'
                    />
                  ))}
                </p>
              </CardContent>
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
      width: '90%',
      marginLeft: '5%',
    },
  }
})
