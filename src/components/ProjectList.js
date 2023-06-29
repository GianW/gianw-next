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
      className={classes.root}
      direction='row'
      justifyContent='center'
      alignItems='flex-start'>
      <Grid item xs={9} alignItems='center' className={classes.inLineItens}>
        {projects?.map(proj => (
          <Grid key={proj.slug} item xs={12} md={3} justifyContent='center'>
            <Card>
              <CardActionArea href={`/projects/${proj.slug}`}>
                <CardMedia
                  component='img'
                  height='140'
                  image={proj.capa ? proj.capa?.url : defaultCover}
                  alt='Project cover image'
                />
                <CardHeader subheader={proj.nome.toUpperCase()} />
                <CardContent>
                  <Typography variant='body2'>{proj.descricao}</Typography>
                  <p>
                    {proj.tags.map(tag => (
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
    },
    inLineItens: {
      display: 'flex',
    },
  }
})
