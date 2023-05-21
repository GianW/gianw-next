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

export const Bounce = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{ scale: [1, 2, 2, 1, 1] }}
      transition={{ delay: delay }}>
      {children}
    </motion.div>
  )
}

Bounce.propTypes = {
  children: PropTypes.object,
  delay: PropTypes.number,
}

Fade.propTypes = {
  children: PropTypes.object,
  delay: PropTypes.number,
}
