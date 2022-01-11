import { makeStyles } from '@mui/styles'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Link } from '@mui/material'

export const SocialLinks = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Link
        href='mailto:gianbwinckler@gmail.com?subject=Hello'
        target='_blank'
        className={classes.link}>
        <EmailIcon />
      </Link>
      <Link
        href='https://www.linkedin.com/in/giancarlo-winckler'
        target='_blank'
        className={classes.link}>
        <LinkedInIcon />
      </Link>
      <Link
        href='https://twitter.com/GianWinckler'
        target='_blank'
        className={classes.link}>
        <TwitterIcon />
      </Link>
    </div>
  )
}
const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    link: {
      padding: '2%',
    },
  }
})
