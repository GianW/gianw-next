import PropTypes from 'prop-types'

export const Seo = ({ keywords }) => {
  return (
    <>
      {keywords.length > 0 && (
        <meta name='keywords' content={keywords.join(`, `)} />
      )}
    </>
  )
}

Seo.propTypes = {
  keywords: PropTypes.array,
}
