import * as React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@mui/styles'
import {
  AppBar,
  Container,
  Grid,
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
  const theme = useTheme()
  const changeTheme = useChangeTheme()
  const [mobile, setMobile] = React.useState(false)

  const colorMode = () => {
    changeTheme.toggleColorMode()
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  const handleResize = () => setMobile(isMobile)

  return mobile ? (
    <HeaderMobile colorMode={colorMode} title={title} theme={theme} />
  ) : (
    <Header colorMode={colorMode} theme={theme} />
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

const Header = ({ colorMode, theme }) => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Box>
        <Grid
          container
          spacing={2}
          alignItems='flex-start'
          justifyContent='center'
          direction='row'>
          <Grid item xs={10}>
            <Typography variant='h5' component='div' align='left'>
              Gian Winckler
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness3 />
              )}
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems='flex-start'
          direction='row'
          maxWidth='sm'>
          {itens.map(item => (
            <Grid key={item.name} item xs={2}>
              <Link key={item.name} href={`/${item.page}`}>
                <Typography className={classes.menuLink}>
                  <span className={classes.linkText}>{item.name}</span>
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

const HeaderMobile = ({ colorMode, title, theme }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

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

const isMobile = () => (window?.outerWidth < 900 ? true : false)

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    toolBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > :second-child': {
        marginLeft: '85%',
      },
    },
    menuLink: {
      cursor: 'pointer',
    },
    linkText: {
      // color: theme.palette.getContrastText(theme.palette.background.default),
      color: theme.palette.mode == 'dark' ? '#8a8a8a' : '#626161',
      '&:hover': {
        borderBottom: `1px solid ${theme.palette.colors.primary}`,
        boxShadow:
          '0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe,0 0 2.8rem #bc13fe,inset 0 0 1.3rem #bc13fe; ',
      },
    },
  }
})
