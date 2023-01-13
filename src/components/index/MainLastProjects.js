import PropTypes from 'prop-types'

import { Card, Typography, Grid, Chip } from '@mui/material'
import { useStyles } from './style'
import { CardContainer } from './CardContainer'
import Router from 'next/router'

export const MainLastProjects = ({ projects }) => {
  const classes = useStyles()
  return (
    <CardContainer title='Latest Projects'>
      {projects &&
        projects.map(proj => (
          <Grid item sm={9} md={4} key={proj.slug}>
            <Card
              className={classes.cardProj}
              onClick={() => Router.push(`/projects/${proj.slug}`)}>
              <Typography className={classes.text}>{proj.nome}</Typography>
              <Typography variant='caption' className={classes.textDesc}>
                {proj.descricao}
              </Typography>
              <br />
              <p>
                {proj.tags.map(tag => (
                  <Chip
                    label={tag}
                    key={tag}
                    className={classes.chip}
                    color='primary'
                    variant='outlined'
                  />
                ))}
              </p>
            </Card>
          </Grid>
        ))}
    </CardContainer>
  )
}

MainLastProjects.propTypes = {
  projects: PropTypes.array,
}
