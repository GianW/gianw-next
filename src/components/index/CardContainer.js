import PropTypes from 'prop-types'
import { Typography, Grid } from '@mui/material'
import { useStyles } from './style'

export const CardContainer = ({ children, title, subtitle }) => {
  const classes = useStyles()
  return (
    <>
      <Typography variant='h5'>{title}</Typography>
      {subtitle && (
        <Typography variant='caption'>
          <i>{subtitle}</i>
        </Typography>
      )}
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
        className={classes.cardGrid}>
        {children}
      </Grid>
    </>
  )
}

CardContainer.propTypes = {
  children: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}
