import { motion } from "framer-motion";
import {
  FiSearch,
  FiCalendar,
  FiCreditCard,
  FiUserPlus,
  FiSettings,
  FiDollarSign,
} from "react-icons/fi";
import { FaHandshake, FaRegSmileWink, FaMoneyBillWave } from "react-icons/fa";
import { GiProgression, GiReceiveMoney } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";
import SectionTitle from "./common/SectionTitle";
import TransitionWrapper from "./common/TransitionWrapper";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const customerSteps = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Discover Services",
      description: "Browse our curated selection of premium service providers",
      color: "from-purple-500 to-indigo-500",
      animation: { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] },
    },
    {
      icon: <FaHandshake className="w-7 h-7" />,
      title: "Instant Booking",
      description: "Secure your appointment with just a few taps",
      color: "from-blue-500 to-cyan-500",
      animation: { y: [0, -5, 5, 0] },
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Hassle-Free Payment",
      description: "Multiple secure payment options with fraud protection",
      color: "from-green-500 to-emerald-500",
      animation: { x: [0, 5, -5, 0] },
    },
  ];

  const providerSteps = [
    {
      icon: <RiCustomerService2Fill className="w-8 h-8" />,
      title: "Build Your Brand",
      description: "Create a stunning profile showcasing your expertise",
      color: "from-amber-500 to-orange-500",
      animation: { rotate: [0, 10, -10, 0] },
    },
    {
      icon: <GiProgression className="w-8 h-8" />,
      title: "Grow Your Business",
      description: "Get matched with customers needing your services",
      color: "from-red-500 to-pink-500",
      animation: { scale: [1, 1.1, 1] },
    },
    {
      icon: <GiReceiveMoney className="w-8 h-8" />,
      title: "Earn More",
      description: "Get paid instantly with our reliable payment system",
      color: "from-indigo-500 to-purple-500",
      animation: { y: [0, -8, 0] },
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-60 h-60 rounded-full bg-indigo-200/20 dark:bg-indigo-900/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-20 w-80 h-80 rounded-full bg-purple-200/20 dark:bg-purple-900/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title={
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0px rgba(99, 102, 241, 0)",
                  "0 0 10px rgba(99, 102, 241, 0.3)",
                  "0 0 0px rgba(99, 102, 241, 0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              How It Works
            </motion.span>
          }
          subtitle="Our seamless process makes getting or providing services effortless"
          center
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Customer Steps */}
          <motion.div
            className="lg:w-1/2"
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TransitionWrapper>
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <h3 className="text-3xl font-bold dark:text-white bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  For Customers
                </h3>
                <motion.div
                  className="ml-3"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <FaRegSmileWink className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
              </div>
            </TransitionWrapper>

            <div className="space-y-6">
              {customerSteps.map((step, index) => (
                <TransitionWrapper key={index} delay={0.1 * index}>
                  <motion.div
                    className="group relative p-1 rounded-2xl bg-gradient-to-r hover:shadow-xl transition-all"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      background: `linear-gradient(45deg, ${step.color
                        .replace("from-", "")
                        .replace("to-", "")
                        .split(" ")
                        .map((c) => `var(--tw-${c}-500)`)
                        .join(", ")})`,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                    }}
                  >
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${step.color} text-white`}
                          animate={step.animation}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          {step.icon}
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-lg dark:text-white">
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                              {step.title}
                            </span>
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        rotate: [0, 15, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                </TransitionWrapper>
              ))}
            </div>
          </motion.div>

          {/* Provider Steps */}
          <motion.div
            className="lg:w-1/2"
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TransitionWrapper delay={0.3}>
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <h3 className="text-3xl font-bold dark:text-white bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  For Providers
                </h3>
                <motion.div
                  className="ml-3"
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  <FaMoneyBillWave className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
              </div>
            </TransitionWrapper>

            <div className="space-y-6">
              {providerSteps.map((step, index) => (
                <TransitionWrapper key={index} delay={0.3 + 0.1 * index}>
                  <motion.div
                    className="group relative p-1 rounded-2xl bg-gradient-to-r hover:shadow-xl transition-all"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      background: `linear-gradient(45deg, ${step.color
                        .replace("from-", "")
                        .replace("to-", "")
                        .split(" ")
                        .map((c) => `var(--tw-${c}-500)`)
                        .join(", ")})`,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                    }}
                  >
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${step.color} text-white`}
                          animate={step.animation}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.2,
                          }}
                        >
                          {step.icon}
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-lg dark:text-white">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                              {step.title}
                            </span>
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        rotate: [0, -15, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                </TransitionWrapper>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/login">
            {" "}
            <motion.div
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 5px 15px rgba(79, 70, 229, 0.3)",
                  "0 10px 25px rgba(79, 70, 229, 0.4)",
                  "0 5px 15px rgba(79, 70, 229, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              Get Started Today →
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
