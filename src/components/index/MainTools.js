import { useEffect, useState } from 'react'
import { Card, Grid, Typography } from '@mui/material'
import { useStyles } from './style'
import { CardContainer } from './CardContainer'

export const MainTools = () => {
  const classes = useStyles()
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  const tools = [
    {
      name: 'URL Shortener',
      link: `${origin}/s`,
    },
    {
      name: 'PDF Edit',
      link: 'https://pdf.gianw.com/',
    },
  ]

  return (
    <CardContainer title='Tools'>
      {tools.map(tool => (
        <Grid item sm={9} md={2} key={tool.name}>
          <Card
            className={classes.cardProj}
            component='a'
            href={tool.link}
            target={tool.link.startsWith('http') ? '_blank' : '_self'}
            rel={
              tool.link.startsWith('http') ? 'noopener noreferrer' : undefined
            }>
            <Typography className={classes.text}>{tool.name}</Typography>
          </Card>
        </Grid>
      ))}
    </CardContainer>
  )
}
