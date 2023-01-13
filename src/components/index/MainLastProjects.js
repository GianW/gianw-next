import PropTypes from 'prop-types'

import { Card, Typography, Grid } from '@mui/material'
import { useStyles } from './style'
import { CardContainer } from './CardContainer'
import Router from 'next/router'

export const MainLastProjects = ({ projects }) => {
  const classes = useStyles()
  return (
    <CardContainer title='Latest Projects'>
      {projects &&
        projects.map((proj, i) => (
          <Grid item xs={3} key={proj.slug}>
            <Card
              className={classes.card}
              onClick={() => Router.push(`/projects/${proj.slug}`)}>
              <Typography className={classes.text}>{proj.nome}</Typography>
            </Card>
          </Grid>
        ))}
    </CardContainer>
  )
}

MainLastProjects.propTypes = {
  projects: PropTypes.array,
}
