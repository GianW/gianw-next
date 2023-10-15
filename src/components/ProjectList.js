import PropTypes from 'prop-types'

// import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  CardActionArea,
  Typography,
  Chip,
} from '@mui/material'

export const ProjectList = ({ projects }) => {
  const classes = useStyles()

  const defaultCover = '/static/default_cover.jpg'
  return (
    <Grid
      container
      spacing={2}
      direction='row'
      justify='flex-start'
      alignItems='flex-start'
      className={classes.root}>
      {projects?.map(proj => (
        <Grid key={proj.slug} item xs={12} md={3} justifyContent='center'>
          <Card>
            <CardActionArea href={`/projects/${proj.slug}`}>
              <CardMedia
                component='img'
                height='160'
                image={proj.capa ? proj.capa?.url : defaultCover}
                alt='Project cover image'
              />
              <CardHeader
                subheader={
                  <>
                    {proj.nome.toUpperCase()}
                    <br />
                    <Typography variant='caption'>{proj.year}</Typography>
                  </>
                }
              />
              <CardContent>
                <Typography variant='body2'>{proj.descricao}</Typography>
                <p>
                  {proj.tags.map(tag => (
                    <Chip
                      label={tag}
                      key={tag}
                      color='primary'
                      variant='outlined'
                      style={{ marginRight: '5px' }}
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

ProjectList.propTypes = {
  projects: PropTypes.array,
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
