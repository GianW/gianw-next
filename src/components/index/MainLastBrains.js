import PropTypes from 'prop-types'

import { Card, Typography, Grid, Icon } from '@mui/material'
import PsychologyIcon from '@mui/icons-material/Psychology'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import AddchartIcon from '@mui/icons-material/Addchart'
import SailingIcon from '@mui/icons-material/Sailing'
import { useStyles } from './style'
import Router from 'next/router'

const iconList = [
  <PsychologyIcon />,
  <AcUnitIcon />,
  <SailingIcon />,
  <AddchartIcon />,
]

export const MainLastBrains = ({ brains }) => {
  const classes = useStyles()
  return (
    <>
      <Typography>Last in brain</Typography>
      <Typography variant='caption'>
        I use this section to take notes to myself and have a kicly way to
        access it
      </Typography>
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
        style={{ marginTop: 10 }}>
        {brains &&
          brains.map((brain, i) => (
            <Grid item xs={3}>
              <Card
                key={brain.slug}
                className={classes.card}
                onClick={() => Router.push(`/brain/${brain.slug}`)}>
                <Icon color='primary'>{iconList[i] ?? iconList[0]}</Icon>
                <Typography className={classes.text}>
                  {brain.slug.charAt(0).toUpperCase() + brain.slug.slice(1)}
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  )
}

MainLastBrains.propTypes = {
  brains: PropTypes.array,
}
