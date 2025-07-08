// components/common/AnimatedButton.jsx
import { motion } from 'framer-motion'

export default function AnimatedButton({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'px-6 py-3 rounded-full font-medium transition-all duration-300'
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/50',
    secondary: 'bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600',
    outline: 'bg-transparent hover:bg-indigo-50 text-indigo-600 border border-indigo-600'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}