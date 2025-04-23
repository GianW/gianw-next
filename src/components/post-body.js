import { useEffect } from 'react'
import PropTypes from 'prop-types'
import markdownStyles from './markdown-styles.module.css'
import Prism from 'prismjs'

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-ruby')
require('prismjs/components/prism-sql')
require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')

export const PostBody = ({ content }) => {

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
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
