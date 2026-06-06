import { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import { Card, CardActionArea, Grid, Typography } from '@mui/material'

const BrainCard = ({ brain, classes }) => {
  const [imgError, setImgError] = useState(false)
  return (
    <Card className={classes.card}>
      <CardActionArea href={`/brain/${brain.slug}`} className={classes.actionArea}>
        {!imgError && (
          <Image
            src={`/static/${brain.title}.png`}
            alt={brain.title}
            width={36}
            height={36}
            onError={() => setImgError(true)}
          />
        )}
        <Typography variant='subtitle1' className={classes.text}>
          {brain.title.charAt(0).toUpperCase() + brain.title.slice(1)}
        </Typography>
      </CardActionArea>
    </Card>
  )
}

BrainCard.propTypes = {
  brain: PropTypes.object,
  classes: PropTypes.object,
}

export const BrainList = ({ brains }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      alignItems='stretch'
      direction='row'>
      {brains?.map(brain => (
        <Grid key={brain.slug} item xs={6} sm={3} md={2}>
          <BrainCard brain={brain} classes={classes} />
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
    card: {
      border:
        theme.palette.mode === 'dark'
          ? '0.5px solid rgba(238, 238, 238, 0.21)'
          : '0.5px solid rgba(0,0,0,0.2)',
      borderRadius: 8,
      height: '100%',
      transition: '0.2s ease-in-out',
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark' ? '#292929' : '#d7d7d7',
        transform: 'translateY(-2px)',
      },
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 12px',
      gap: 8,
    },
    text: {
      color: theme.palette.text.primary,
      textAlign: 'center',
      fontWeight: 500,
    },
  }
})
