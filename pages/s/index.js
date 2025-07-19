// pages/s/index.js
import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LinkIcon from '@mui/icons-material/Link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'

export default function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const handleSubmit = async e => {
    e.preventDefault()

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch (err) {
      setError('Please enter a valid URL including http:// or https://')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to shorten URL')
      }

      const data = await response.json()
      setShortUrl(data.shortUrl)
      setSuccessMessage('URL shortened successfully!')
    } catch (err) {
      setError(err.message || 'Failed to shorten URL. Please try again.')
      console.error('Error shortening URL:', err)
    } finally {
      setLoading(false)
    }
  }
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('Failed to copy:', err)
        setError('Failed to copy to clipboard')
      })
  }

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name='description' content='Shorten your long URLs easily' />
      </Head>

      <Container maxWidth='md'>
        <Box sx={{ my: 8 }}>
          <Typography
            variant='h2'
            component='h1'
            align='center'
            gutterBottom
            sx={{
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(45deg, #64b5f6 30%, #4fc3f7 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            URL Shortener
          </Typography>

          <Typography
            variant='h6'
            component='h2'
            align='center'
            color='text.secondary'
            sx={{ mb: 4 }}>
            Transform your long URLs into short, easy-to-share links
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}>
            <Box component='form' onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label='Enter your long URL'
                variant='outlined'
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder='https://gianw.com/very/long/url/that/needs/shortening'
                required
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LinkIcon color='primary' />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disableElevation
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: isDark
                    ? 'linear-gradient(45deg, #64b5f6 30%, #4fc3f7 90%)'
                    : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: isDark
                      ? 'linear-gradient(45deg, #42a5f5 30%, #29b6f6 90%)'
                      : 'linear-gradient(45deg, #1e88e5 30%, #00b0ff 90%)',
                  },
                }}>
                {loading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Shorten URL'
                )}
              </Button>
            </Box>

            {shortUrl && (
              <Box sx={{ mt: 4 }}>
                <Divider sx={{ mb: 3 }} />
                <Typography variant='h6' gutterBottom color='primary'>
                  Your shortened URL
                </Typography>

                <Paper
                  variant='outlined'
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                    borderColor: 'primary.light',
                    bgcolor: isDark ? 'grey.800' : 'grey.100',
                  }}>
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mr: 1,
                      fontFamily: 'monospace',
                      fontWeight: 500,
                    }}>
                    {shortUrl}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={copyToClipboard}
                      color='primary'
                      title='Copy to clipboard'
                      size='small'>
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton
                      component='a'
                      href={shortUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      color='primary'
                      title='Open in new tab'
                      size='small'>
                      <OpenInNewIcon />
                    </IconButton>
                  </Box>
                </Paper>

                <Typography variant='body2' color='text.secondary'>
                  Share this link with others to redirect them to your original
                  URL.
                </Typography>
              </Box>
            )}
          </Paper>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              © {new Date().getFullYear()} Gian`s URL Shortener Service
            </Typography>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity='success' variant='filled'>
          Copied to clipboard!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity='success' variant='filled'>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
