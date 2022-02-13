import * as React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@mui/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
} from '@mui/material'
import { Brightness3, Brightness7 } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import LightIcon from '@mui/icons-material/Light'
import { useChangeTheme } from 'ThemeContext'
import Link from 'next/link'

export const AppHeader = ({ title = '' }) => {
  const classes = useStyles()
  const theme = useTheme()
  const changeTheme = useChangeTheme()
  const [open, setOpen] = React.useState(false)

  const colorMode = () => {
    changeTheme.toggleColorMode()
  }

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(!open)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar className={classes.toolBar}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' align='left'>
            {title}
          </Typography>
          <Typography variant='h6' component='div'>
            <IconButton sx={{ ml: 1 }} onClick={colorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness3 />
              )}
            </IconButton>
            Gian Winckler
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={open} onClose={toggleDrawer}>
        <MenuItens toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
}

const itens = [
  { name: 'Home', icon: <HomeIcon />, page: '' },
  { name: 'Brain', icon: <LightIcon />, page: 'brain' },
  { name: 'Projects', icon: <AutoAwesomeMotionIcon />, page: 'projects' },
  { name: 'Posts', icon: <AutoStoriesIcon />, page: 'posts' },
]

const MenuItens = ({ toggleDrawer }) => {
  return (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}>
      <List>
        {itens.map(item => (
          <Link key={item.name} href={`/${item.page}`}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}

MenuItens.propTypes = {
  toggleDrawer: PropTypes.func,
}

const useStyles = makeStyles(() => {
  return {
    toolBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > :second-child': {
        marginLeft: '85%',
      },
    },
  }
})
