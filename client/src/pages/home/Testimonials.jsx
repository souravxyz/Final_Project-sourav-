import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { GiSpiralArrow } from "react-icons/gi";
import SectionTitle from "./common/SectionTitle";
import TransitionWrapper from "./common/TransitionWrapper";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    content:
      "I've used ServeHub for multiple home services and each time the providers have been punctual, professional, and did excellent work. The platform makes booking so easy!",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Small Business Owner",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 5,
    content:
      "As a provider on ServeHub, I've been able to grow my client base significantly. The platform handles payments and scheduling so I can focus on delivering great service.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Frequent User",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
    content:
      "The variety of services available is impressive. I've found everything from pet grooming to home cleaning, all with verified providers I can trust.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Local Service Provider",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    content:
      "ServeHub has transformed my small business. I've doubled my clientele in just 3 months while spending less time on admin work!",
    color: "from-amber-500 to-orange-500",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-200/20 dark:bg-indigo-900/10 blur-3xl"
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
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-200/20 dark:bg-purple-900/10 blur-3xl"
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
              Voices of Trust
            </motion.span>
          }
          subtitle="Real experiences from our growing community"
          center
        />

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className={`relative p-1 rounded-3xl bg-gradient-to-r ${testimonials[currentIndex].color} shadow-xl`}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl">
                {/* Quote marks */}
                <div className="absolute top-6 left-6 text-gray-200 dark:text-gray-700">
                  <FaQuoteLeft className="w-8 h-8" />
                </div>
                <div className="absolute bottom-6 right-6 text-gray-200 dark:text-gray-700">
                  <FaQuoteRight className="w-8 h-8" />
                </div>

                <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full p-1"
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    >
                      <GiSpiralArrow className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-xl dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiStar
                        className={`w-6 h-6 mx-1 ${
                          i < testimonials[currentIndex].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="text-gray-700 dark:text-gray-300 text-center text-lg italic relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {testimonials[currentIndex].content}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            <div className="relative">
              <FiChevronLeft className="w-6 h-6" />
              <motion.span
                className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  x: [-10, 0, -10],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                ←
              </motion.span>
            </div>
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            <div className="relative">
              <FiChevronRight className="w-6 h-6" />
              <motion.span
                className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  x: [10, 0, 10],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                →
              </motion.span>
            </div>
          </motion.button>

          {/* Animated indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`relative w-4 h-4 rounded-full ${
                  currentIndex === index
                    ? "bg-indigo-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
              >
                {currentIndex === index && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-indigo-600"
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Floating trust badges */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "500+", label: "Verified Providers" },
            { number: "24/7", label: "Support Available" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md text-center"
              whileHover={{ y: -5 }}
            >
              <motion.p
                className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {item.number}
              </motion.p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
