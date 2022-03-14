import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export const Fade = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay }}>
      {children}
    </motion.div>
  )
}

Fade.propTypes = {
  children: PropTypes.object,
  delay: PropTypes.number,
}
