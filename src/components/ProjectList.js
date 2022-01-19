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
} from '@mui/material'

export const ProjectList = ({ projects }) => {
  const classes = useStyles()

  const defaultCover = '/static/default_cover.jpg'
  console.log(projects)
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      direction='row'
      justify='flex-start'
      alignItems='flex-start'>
      {projects?.map(proj => (
        <Grid key={proj.slug} item xs={12} md={3} justifyContent='center'>
          <Card>
            <CardActionArea href={`/projects/${proj.slug}`}>
              <CardMedia
                component='img'
                height='140'
                image={proj.capa ? proj.capa : defaultCover}
                alt='Project cover image'
              />
              <CardHeader subheader={proj.nome.toUpperCase()} />
              <CardContent>
                <Typography variant='body2'>{proj.descricao}</Typography>
                {/* <Image
                  src={`/static/${brain.title}.png`}
                  alt={brain.title}
                  layout='intrinsic'
                  width={50}
                  height={60}
                /> */}
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
    },
  }
})
