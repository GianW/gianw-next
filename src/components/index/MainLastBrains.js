import PropTypes from 'prop-types'

import { Card, CardContent, Link, CardHeader } from '@mui/material'
import { useStyles } from './style'

export const MainLastBrains = ({ brains }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardHeader subheader='Last in brain' />
      <CardContent>
        {brains &&
          brains.map(brain => (
            <p key={brain.slug}>
              <Link href={`/brain/${brain.slug}`}>{brain.slug}</Link>
            </p>
          ))}
      </CardContent>
    </Card>
  )
}

MainLastBrains.propTypes = {
  brains: PropTypes.array,
}
