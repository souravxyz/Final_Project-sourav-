import { motion } from "framer-motion";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
  FiGithub,
} from "react-icons/fi";
import { FaHandshake, FaShieldAlt, FaRegGem } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import TransitionWrapper from "./common/TransitionWrapper";

export default function Footer() {
  const links = [
    {
      title: "Company",
      items: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Help Center", href: "#" },
        { name: "Safety Center", href: "#" },
        { name: "Community Guidelines", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
    {
      title: "Legal",
      items: [
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
        { name: "Accessibility", href: "#" },
      ],
    },
  ];

  const trustBadges = [
    { icon: <FaShieldAlt />, text: "Secure Platform" },
    { icon: <FaRegGem />, text: "Verified Providers" },
    { icon: <RiCustomerService2Fill />, text: "24/7 Support" },
    { icon: <FaHandshake />, text: "Satisfaction Guaranteed" },
  ];

  const contactDetails = [
    {
      icon: <FiMail />,
      text: "srivasatavasourav68689@gmail.com",
      href: "mailto:srivasatavasourav68689@gmail.com",
    },
    { icon: <FiPhone />, text: "+91 8927083213", href: "tel:+918927083213" },
    {
      icon: <FiGithub />,
      text: "github.com/souravxyz",
      href: "https://github.com/souravxyz",
    },
    { icon: <FiMapPin />, text: "Kolkata, West Bengal, India" },
  ];

  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-20 pb-12 overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />

      {/* Floating dots pattern */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/10 pointer-events-none"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 20],
            x: [0, (Math.random() - 0.5) * 20],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and description */}
          <TransitionWrapper>
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <motion.span
                  className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 4px 14px rgba(99, 102, 241, 0.3)",
                      "0 6px 18px rgba(99, 102, 241, 0.4)",
                      "0 4px 14px rgba(99, 102, 241, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  ServeHub
                </motion.span>
              </motion.div>

              <p className="mb-8 text-gray-400 text-lg leading-relaxed">
                Revolutionizing service experiences through trusted connections
                and cutting-edge technology.
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                {[
                  { icon: <FiFacebook />, color: "bg-blue-600" },
                  { icon: <FiTwitter />, color: "bg-cyan-500" },
                  { icon: <FiInstagram />, color: "bg-pink-600" },
                  { icon: <FiLinkedin />, color: "bg-blue-700" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`${social.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all`}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </TransitionWrapper>

          {/* Links columns */}
          {links.map((column, index) => (
            <TransitionWrapper key={index} delay={0.1 * (index + 1)}>
              <div>
                <motion.h3
                  className="text-xl font-semibold text-white mb-6 flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  {column.title}
                </motion.h3>
                <ul className="space-y-3">
                  {column.items.map((item, itemIndex) => (
                    <motion.li key={itemIndex} whileHover={{ x: 5 }}>
                      <a
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      >
                        {item.name}
                        <motion.span
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{
                            x: [0, 3, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          <FiArrowUpRight className="w-4 h-4" />
                        </motion.span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TransitionWrapper>
          ))}

          {/* Enhanced Contact Us section with your real details */}
          <TransitionWrapper delay={0.4}>
            <div>
              <motion.h3
                className="text-xl font-semibold text-white mb-6 flex items-center"
                whileHover={{ x: 5 }}
              >
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Contact Developer
              </motion.h3>
              <ul className="space-y-4">
                {contactDetails.map((contact, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-4 group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className={`p-2 rounded-lg ${
                        index % 2 === 0
                          ? "bg-indigo-900/30"
                          : "bg-purple-900/30"
                      } text-indigo-400 mt-1 flex-shrink-0`}
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {contact.icon}
                    </motion.div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 group-hover:text-white transition-colors whitespace-normal"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-gray-400 group-hover:text-white transition-colors whitespace-normal">
                        {contact.text}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </TransitionWrapper>
        </div>

        {/* Copyright and back to top */}
        <TransitionWrapper delay={0.5}>
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} ServeHub. All rights reserved.
            </p>

            <motion.a
              href="#top"
              className="flex items-center text-indigo-400 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              Back to top
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="ml-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.div>
            </motion.a>
          </div>
        </TransitionWrapper>
      </div>
    </footer>
  );
}
