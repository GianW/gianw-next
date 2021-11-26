import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'

export default function Custom404() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>¯\_(ツ)_/¯</h1>
      <p>Parece que não há nada por aqui</p>
      <p>
        <Link href='/'>Página inicial</Link>
      </p>
    </div>
  )
}

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '20%',
      marginLeft: '40%',
      marginTop: '20%',
      textAlign: 'center',
    },
  }
})
