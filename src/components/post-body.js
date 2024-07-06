import PropTypes from 'prop-types'
import Head from 'next/head'
import markdownStyles from './markdown-styles.module.css'

export const PostBody = ({ content }) => {
  const theme = 'tomorrow'
  return (
    <>
      <Head> 
        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`}
          rel='stylesheet'
        />                       
      </Head>
      <div className='max-w-2xl mx-auto' style={{ maxWidth: '900px' }}>
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  )
}

PostBody.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}
