import PropTypes from 'prop-types'

import { Card, CardContent, Link, CardHeader } from '@mui/material'

export const MainLastProjects = ({ projects }) => {
  return (
    <Card>
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
