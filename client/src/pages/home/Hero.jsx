import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiClock, FiStar } from "react-icons/fi";
import AnimatedButton from "./common/AnimatedButton";
import TransitionWrapper from "./common/TransitionWrapper";
import { Link } from "react-router-dom";
import { useUserProfile } from "../../hooks/auth/useAuth";

export default function Hero() {
  const token = localStorage.getItem("token");
  const { data: user } = useUserProfile(undefined, {
    enabled: !!token,
  });

  const isAuthenticated = !!user;

  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      {/* Enhanced background with subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900"></div>
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent dark:from-gray-900/40"
        ></motion.div>
      </motion.div>

      {/* Animated blob shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-indigo-400 blur-3xl opacity-30 dark:opacity-20"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-pink-400 blur-3xl opacity-20 dark:opacity-10"
      ></motion.div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <TransitionWrapper>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 dark:text-white"
                whileHover={{ scale: 1.01 }}
              >
                Find & Book{" "}
                <motion.span
                  className="text-indigo-600 inline-block"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Top
                </motion.span>{" "}
                Service Providers
              </motion.h1>
            </TransitionWrapper>

            <TransitionWrapper delay={0.2}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Discover trusted professionals for all your needs. From home
                services to personal care, we connect you with the best
                providers in your area.
              </p>
            </TransitionWrapper>

            <div className="flex flex-wrap gap-4 mb-8">
              <TransitionWrapper delay={0.3}>
                <Link to={token ? "/redirect" : "/login"}>
                  <AnimatedButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span className="flex items-center">
                      Explore Services
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        <FiArrowRight />
                      </motion.span>
                    </motion.span>
                  </AnimatedButton>
                </Link>
              </TransitionWrapper>

              {!isAuthenticated && (
                <TransitionWrapper delay={0.4}>
                  <Link to="/login">
                    <AnimatedButton
                      variant="secondary"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#f3f4f6",
                        color: "#4f46e5",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Our Community
                    </AnimatedButton>
                  </Link>
                </TransitionWrapper>
              )}
            </div>

            <TransitionWrapper delay={0.5}>
              <motion.div
                className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm max-w-md"
                whileHover={{ y: -2 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <motion.img
                      key={item}
                      src={`https://randomuser.me/api/portraits/${
                        item % 2 === 0 ? "women" : "men"
                      }/${item + 20}.jpg`}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
                      alt="Happy customer"
                      initial={{ x: -20 * item, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + item * 0.1 }}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FiCheckCircle className="text-green-500 text-xl" />
                  <span>1000+ Verified Providers</span>
                </div>
              </motion.div>
            </TransitionWrapper>
          </div>

          {/* Right image */}
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <motion.img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Service provider"
                  className="rounded-2xl shadow-xl w-full h-auto"
                  whileHover={{ scale: 1.01 }}
                />

                {/* Floating card 1 - Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg w-48 border border-indigo-100 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        4.9
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Average Rating</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card 2 - Quick Booking */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg w-56 border border-indigo-100 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-start space-x-3">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <FiClock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium">Quick Booking</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Average response time: 15 minutes
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card 3 - Happy Customers */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-10 -right-10 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg w-40 border border-indigo-100 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        +99
                      </div>
                    </div>
                    <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-300">
                      Happy customers today
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
