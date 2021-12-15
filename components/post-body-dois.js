import * as React from 'react'
import PropTypes from 'prop-types'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import markdownStyles from './markdown-styles.module.css'

export const PostBody = ({ content }) => {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className={markdownStyles['markdown']}>
        {documentToReactComponents(content)}
      </div>
    </div>
  )
}

PostBody.propTypes = {
  content: PropTypes.string,
}
