import PropTypes from 'prop-types'

import { Card, Typography, Grid, Icon } from '@mui/material'
import PsychologyIcon from '@mui/icons-material/Psychology'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import AddchartIcon from '@mui/icons-material/Addchart'
import SailingIcon from '@mui/icons-material/Sailing'
import { useStyles } from './style'
import Router from 'next/router'
import { CardContainer } from './CardContainer'

const iconList = [
  <PsychologyIcon key={'PsychologyIcon'} />,
  <AcUnitIcon key={'AcUnitIcon'} />,
  <SailingIcon key={'SailingIcon'} />,
  <AddchartIcon key={'AddchartIcon'} />,
]

export const MainLastBrains = ({ brains }) => {
  const classes = useStyles()
  return (
    <CardContainer
      title='Latest in brain'
      subtitle='I use this section to take notes to myself'>
      {brains &&
        brains.map((brain, i) => (
          <Grid item xs={3} key={brain.slug}>
            <Card
              className={classes.card}
              onClick={() => Router.push(`/brain/${brain.slug}`)}>
              <Icon color='primary'>{iconList[i] ?? iconList[0]}</Icon>
              <Typography className={classes.text}>
                {brain.slug.charAt(0).toUpperCase() + brain.slug.slice(1)}
              </Typography>
            </Card>
          </Grid>
        ))}
    </CardContainer>
  )
}

MainLastBrains.propTypes = {
  brains: PropTypes.array,
}
