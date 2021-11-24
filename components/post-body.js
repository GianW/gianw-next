import * as React from 'react'
import PropTypes from 'prop-types'

import markdownStyles from './markdown-styles.module.css'

export const PostBody = ({ content }) => {
  return (
    // <div className='max-w-2xl mx-auto'>
    <div>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

PostBody.propTypes = {
  content: PropTypes.object,
}
