import PropTypes from 'prop-types'

import { Card, CardContent, Link, CardHeader } from '@mui/material'
import { useStyles } from './style'

export const MainLastProjects = ({ projects }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardHeader subheader='Last Projects' />
      <CardContent>
        {projects &&
          projects.map(proj => (
            <p key={proj.slug}>
              <Link href={`/projects/${proj.slug}`}>{proj.nome}</Link>
            </p>
          ))}
      </CardContent>
    </Card>
  )
}

MainLastProjects.propTypes = {
  projects: PropTypes.array,
}
