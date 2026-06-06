import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Link } from '@mui/material'

export const SocialLinks = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', marginTop: '24px', marginBottom: '8px', alignItems: 'center' }}>
      <Link
        href='mailto:gianbwinckler@gmail.com?subject=Hello'
        target='_blank'>
        <EmailIcon />
      </Link>
      <Link
        href='https://www.linkedin.com/in/giancarlo-winckler'
        target='_blank'>
        <LinkedInIcon />
      </Link>
      <Link
        href='https://twitter.com/GianWinckler'
        target='_blank'>
        <TwitterIcon />
      </Link>
    </div>
  )
}
