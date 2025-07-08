import { motion } from "framer-motion";
import {
  FiShield,
  FiStar,
  FiClock,
  FiDollarSign,
  FiHeadphones,
  FiThumbsUp,
} from "react-icons/fi";
import { FaMedal, FaHandshake, FaRocket } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FiSmile } from "react-icons/fi";

import SectionTitle from "./common/SectionTitle";
import TransitionWrapper from "./common/TransitionWrapper";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Verified Providers",
      description:
        "All providers undergo strict background checks and verification.",
      color: "bg-indigo-100 dark:bg-indigo-900/50",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      animation: { rotate: [0, 10, -10, 0] },
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Premium Quality",
      description:
        "We maintain elite standards for all services on our platform.",
      color: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      animation: { scale: [1, 1.1, 1] },
    },
    {
      icon: <FaRocket className="w-7 h-7" />,
      title: "Lightning Fast",
      description:
        "Get connected with providers who respond in minutes, not hours.",
      color: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      animation: { y: [0, -5, 0] },
    },
    {
      icon: <GiTakeMyMoney className="w-8 h-8" />,
      title: "No Hidden Fees",
      description:
        "See all costs upfront before booking - what you see is what you pay.",
      color: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      animation: { x: [0, 5, -5, 0] },
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Our elite support team is always ready to assist you, day or night.",
      color: "bg-blue-100 dark:bg-blue-900/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      animation: { rotate: [0, 15, 0] },
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "Happiness Guaranteed",
      description:
        "Not 100% satisfied? We'll make it right - no questions asked.",
      color: "bg-pink-100 dark:bg-pink-900/50",
      iconColor: "text-pink-600 dark:text-pink-400",
      animation: { scale: [1, 1.05, 1] },
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl"
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
        className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
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
              className="inline-block"
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
              Why We're Unbeatable
            </motion.span>
          }
          subtitle="We don't just meet expectations - we shatter them with every interaction"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <TransitionWrapper key={index} delay={0.1 * index}>
              <motion.div
                className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/50 relative overflow-hidden"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(600px circle at ${
                      Math.random() * 100
                    }% ${Math.random() * 100}%, ${feature.iconColor.replace(
                      "text-",
                      "bg-"
                    )}/20, transparent 80%)`,
                  }}
                />

                <div className="flex items-center space-x-4 mb-4">
                  <motion.div
                    className={`${feature.color} p-4 rounded-xl`}
                    animate={feature.animation}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <span className={feature.iconColor}>{feature.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold dark:text-white bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">
                  {feature.description}
                </p>

                {/* Floating medal for premium features */}
                {["Premium Quality", "Happiness Guaranteed"].includes(
                  feature.title
                ) && (
                  <motion.div
                    className="absolute top-2 right-2 text-amber-400"
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <FaMedal className="w-6 h-6" />
                  </motion.div>
                )}
              </motion.div>
            </TransitionWrapper>
          ))}
        </div>

        {/* Animated trust badge */}
        <motion.div
          className="mt-16 p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="flex-shrink-0"
          >
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
              <FaHandshake className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
          </motion.div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold dark:text-white mb-2">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join over 50,000 satisfied customers who've transformed their
              service experience with us
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
