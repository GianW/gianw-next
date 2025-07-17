import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/styles'
import {
  AppBar,
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
import { useRouter } from 'next/router'
import { useStyles } from './style'

export const AppHeader = ({ title = '' }) => {
  const theme = useTheme()
  const changeTheme = useChangeTheme()

  const [mobile, setMobile] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)

  const colorMode = () => {
    changeTheme.toggleColorMode()
  }

  const checkIsMobile = React.useCallback(() => {
    return window.innerWidth < 700
  }, [])

  React.useEffect(() => {
    setMounted(true)
    
    // Só define o mobile após o mount para evitar hidratação
    const handleResize = () => {
      setMobile(checkIsMobile())
    }
    
    // Define o estado inicial
    handleResize()
    
    // Adiciona listener
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [checkIsMobile])


  // Enquanto não montou, renderiza a versão mobile para evitar flash
  if (!mounted) {
    return <HeaderMobile colorMode={colorMode} title={title} theme={theme} />
  }

  return mobile ? (
    <HeaderMobile colorMode={colorMode} title={title} theme={theme} />
  ) : (
    <HeaderDesk colorMode={colorMode} theme={theme} />
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
}

const itens = [
  { name: 'Home', icon: <HomeIcon />, page: '' },
  { name: 'Brain', icon: <LightIcon />, page: 'brain' },
  { name: 'Posts', icon: <AutoStoriesIcon />, page: 'posts' },
  { name: 'Projects', icon: <AutoAwesomeMotionIcon />, page: 'projects' },
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

const HeaderDesk = ({ colorMode, theme }) => {
  const classes = useStyles()
  const router = useRouter()
  const path = router.pathname.replace('/', '')
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      alignItems='flex-start'
      direction='row'
      justifyContent='center'>
      <Grid item xs={9} alignItems='center' className={classes.inLineItens}>
        <Grid item xs={10}>
          <Typography variant='h5' component='div' align='left'>
            Gian Winckler
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ChangeColorButton colorMode={colorMode} theme={theme} />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.inLineItens}>
        {itens.map(item => (
          <Grid key={item.name} item xs={2}>
            <Typography>
              <Link key={item.name} href={`/${item.page}`} className={classes.linkStyle} >
                <span
                  className={
                    path == item.page
                      ? classes.selectedLinkText
                      : classes.linkText
                  }>
                  {item.name}
                </span>
              </Link>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

HeaderDesk.propTypes = {
  colorMode: PropTypes.func,
  theme: PropTypes.object,
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
            Gian Winckler
          </Typography>
          <ChangeColorButton colorMode={colorMode} theme={theme} />
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={open} onClose={toggleDrawer}>
        <MenuItens toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  )
}

HeaderMobile.propTypes = {
  colorMode: PropTypes.func,
  theme: PropTypes.object,
  title: PropTypes.string,
}

const ChangeColorButton = ({ colorMode, theme }) => (
  <IconButton sx={{ ml: 1 }} onClick={colorMode} color='inherit'>
    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness3 />}
  </IconButton>
)

ChangeColorButton.propTypes = {
  colorMode: PropTypes.func,
  theme: PropTypes.object,
}
