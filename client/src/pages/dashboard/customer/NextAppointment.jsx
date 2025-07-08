import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { getImageUrl } from "../../../utils/getImageUrl";

export const NextAppointment = ({ appointment, darkMode }) => {
  const cardStyles = darkMode
    ? {
        background: "bg-gray-900/50",
        border: "border-gray-700/30",
        text: {
          primary: "text-white",
          secondary: "text-gray-400",
          tertiary: "text-gray-500",
        },
      }
    : {
        background: "bg-white/90",
        border: "border-gray-200/50",
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-600",
          tertiary: "text-gray-400",
        },
      };

  if (!appointment)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${cardStyles.background} backdrop-blur-sm rounded-xl ${cardStyles.border} p-6`}
      >
        <div className="text-center py-4">
          <p className={cardStyles.text.secondary}>No upcoming appointments</p>
          <p className={`text-sm ${cardStyles.text.tertiary} mt-1`}>
            Your next booking will appear here
          </p>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${cardStyles.background} backdrop-blur-sm rounded-xl ${cardStyles.border} shadow-lg overflow-hidden`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3
            className={`text-lg font-semibold ${cardStyles.text.primary} tracking-tight flex items-center gap-2`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                darkMode ? "bg-blue-500" : "bg-blue-600"
              } animate-pulse`}
            ></span>
            Upcoming Appointment
          </h3>
          <motion.button
            whileHover={{ x: 2 }}
            className={`text-xs flex items-center gap-1 ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            } transition-colors`}
          >
            Details <FiArrowRight className="text-xs" />
          </motion.button>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative">
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${
                darkMode
                  ? "from-blue-500 to-purple-600"
                  : "from-blue-400 to-purple-500"
              } rounded-full blur opacity-20`}
            ></div>
            <img
              src={
                appointment.providerId?.user?.profilePic
                  ? getImageUrl(appointment.providerId.user.profilePic)
                  : "https://www.gravatar.com/avatar/default?s=200"
              }
              alt={appointment.providerId?.user?.name || "Provider"}
              className={`relative z-10 w-12 h-12 rounded-full object-cover border-2 ${
                darkMode ? "border-white/10" : "border-gray-200"
              }`}
            />
          </div>

          <div className="flex-1">
            <h4 className={`font-medium ${cardStyles.text.primary}`}>
              {appointment.service}
            </h4>
            <p
              className={`text-sm ${cardStyles.text.secondary} flex items-center gap-1.5 mt-1`}
            >
              <FiUser
                className={`${
                  darkMode ? "text-blue-400/80" : "text-blue-600/90"
                } flex-shrink-0`}
              />
              {appointment.providerId?.user?.name || "Unknown Provider"}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <div
                className={`flex items-center gap-1.5 ${cardStyles.text.primary}`}
              >
                <FiCalendar
                  className={`${
                    darkMode ? "text-purple-400/80" : "text-purple-600/90"
                  } flex-shrink-0`}
                />
                <span>
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${cardStyles.text.primary}`}
              >
                <FiClock
                  className={`${
                    darkMode ? "text-blue-400/80" : "text-blue-600/90"
                  } flex-shrink-0`}
                />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-4 pt-4 border-t ${
            darkMode ? "border-gray-800/50" : "border-gray-200/50"
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className={cardStyles.text.secondary}>Appointment ID</span>
            <span className={`font-mono ${cardStyles.text.primary}`}>
              {appointment._id.slice(-6)}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
