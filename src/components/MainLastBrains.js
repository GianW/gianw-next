import PropTypes from 'prop-types'

import { Card, CardContent, Link, CardHeader } from '@mui/material'

export const MainLastBrains = ({ brains }) => {
  return (
    <Card>
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
