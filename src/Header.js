import Head from 'next/head'
import PropTypes from 'prop-types'

export default function Header({ title, description = 'Gian Winckler' }) {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
      />
      <meta name='theme-color' content='#303030' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

Header.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}
