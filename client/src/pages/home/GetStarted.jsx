import { motion } from "framer-motion";
import { FiArrowRight, FiUserPlus, FiSearch } from "react-icons/fi";
import { FaRocket, FaRegStar, FaRegGem } from "react-icons/fa";
import AnimatedButton from "./common/AnimatedButton";
import TransitionWrapper from "./common/TransitionWrapper";

export default function GetStarted() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: Math.random() * 10 + 5 + "px",
            height: Math.random() * 10 + 5 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Floating decorative elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Animated stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-300"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            fontSize: `${Math.random() * 10 + 10}px`,
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaRegStar />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <TransitionWrapper>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.3)",
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 10px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              Ready to Transform Your Experience?
            </motion.h2>
          </TransitionWrapper>

          <TransitionWrapper delay={0.2}>
            <motion.p
              className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Join our thriving community of {""}
              <span className="font-semibold text-white">10,000+</span>{" "}
              satisfied customers and {""}
              <span className="font-semibold text-white">500+</span> top-rated
              providers. Your journey starts today.
            </motion.p>
          </TransitionWrapper>

          <div className="flex flex-wrap justify-center gap-6">
            <TransitionWrapper delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedButton
                  className="bg-white hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="flex items-center group">
                    <FiSearch className="mr-3 text-indigo-600 group-hover:text-white transition-all duration-300" />
                    <span
                      className="
        text-indigo-600 
        group-hover:text-white 
        transition-all duration-300
      "
                    >
                      Explore Services
                    </span>
                    <motion.div
                      className="ml-3 text-indigo-600 group-hover:text-white transition-all duration-300"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <FiArrowRight />
                    </motion.div>
                  </div>
                </AnimatedButton>
              </motion.div>
            </TransitionWrapper>

            <TransitionWrapper delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedButton
                  variant="outline"
                  className="text-white border-2 border-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
                  }}
                >
                  <div className="flex items-center">
                    <FaRocket className="mr-3" />
                    Become a Provider
                    <motion.div
                      className="ml-3"
                      animate={{
                        rotate: [0, 20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <FiUserPlus />
                    </motion.div>
                  </div>
                </AnimatedButton>
              </motion.div>
            </TransitionWrapper>
          </div>

          {/* Floating trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: <FaRegGem className="text-yellow-300" />,
                text: "Verified Professionals",
              },
              {
                icon: <FiArrowRight className="text-green-300" />,
                text: "Instant Booking",
              },
              {
                icon: <FaRegStar className="text-blue-200" />,
                text: "5-Star Rated",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                whileHover={{ y: -3 }}
              >
                <motion.div
                  className="mr-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-white/90 text-sm font-medium">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
