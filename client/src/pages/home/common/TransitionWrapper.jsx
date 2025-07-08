// components/common/TransitionWrapper.jsx
import { motion } from 'framer-motion'

const transitionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function TransitionWrapper({ children, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transitionVariants}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}