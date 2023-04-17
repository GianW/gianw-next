import PropTypes from 'prop-types'

import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  CardActionArea,
} from '@mui/material'

export const BrainList = ({ brains }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      alignItems='flex-start'
      direction='row'
      justify='flex-start'>
      {brains?.map(brain => (
        <Grid key={brain.slug} item xs={12} md={2} justifyContent='center'>
          <Card>
            <CardActionArea
              href={`/brain/${brain.slug}`}
              className={classes.centeredContent}>
              <CardHeader subheader={brain.title.toUpperCase()} />
              <CardContent className={classes.centeredContent}>
                <Image
                  src={`/static/${brain.title}.png`}
                  alt={brain.title}
                  layout='intrinsic'
                  width={38}
                  height={40}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

BrainList.propTypes = {
  brains: PropTypes.array,
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
    centeredContent: {
      display: 'flex',
      justifyContent: 'center',
    },
  }
})
