import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiHome } from "react-icons/fi";

export default function GuestNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      }}
      className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/30 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            <motion.span
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mr-2"
            >
              <FiHome className="text-purple-400" />
            </motion.span>
            NexusServe
          </Link>
        </motion.div>

        <ul className="flex items-center gap-4 sm:gap-6">
          <motion.li whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all group"
            >
              <FiLogIn className="mr-2 group-hover:text-purple-400 transition-colors" />
              <span>Login</span>
              <motion.span
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.li>

          <motion.li whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 group"
            >
              <FiUserPlus className="mr-2" />
              <span>Register</span>
              <motion.span
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
}
