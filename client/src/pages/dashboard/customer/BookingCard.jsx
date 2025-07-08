import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiInfo,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import { getImageUrl } from "../../../utils/getImageUrl";
import { getStatusIcon } from "../../../utils/getStatusIcon";

const statusColors = {
  cancelled: {
    dark: "bg-gradient-to-br from-red-500/10 to-rose-600/10 border-red-500/30",
    light: "bg-gradient-to-br from-red-100 to-rose-100 border-red-200",
  },
  pending: {
    dark: "bg-gradient-to-br from-amber-500/10 to-yellow-600/10 border-amber-500/30",
    light: "bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-200",
  },
  confirmed: {
    dark: "bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/30",
    light: "bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200",
  },
  completed: {
    dark: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-emerald-500/30",
    light: "bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-200",
  },
  in_progress: {
    dark: "bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/30",
    light: "bg-gradient-to-br from-purple-100 to-violet-100 border-purple-200",
  },
};

export const BookingCard = ({
  booking,
  hoveredCard,
  setHoveredCard,
  darkMode,
  openReviewModal,
}) => {
  const getStatusColor = (status) => {
    return (
      statusColors[status]?.[darkMode ? "dark" : "light"] ||
      (darkMode
        ? "bg-gradient-to-br from-gray-600/10 to-gray-700/10 border-gray-600/30"
        : "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200")
    );
  };

  const getGlowColor = (status) => {
    const colorMap = {
      cancelled: "red",
      pending: "amber",
      confirmed: "blue",
      completed: "emerald",
      in_progress: "purple",
    };
    const color = colorMap[status] || "gray";
    return darkMode ? `${color}-600` : `${color}-400`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.3,
        type: "spring",
        bounce: 0.2,
      }}
      whileHover={{
        y: -3,
        boxShadow: darkMode
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
          : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      onHoverStart={() => setHoveredCard(booking._id)}
      onHoverEnd={() => setHoveredCard(null)}
      className={`relative overflow-hidden rounded-xl border transition-all duration-300
        ${
          hoveredCard === booking._id
            ? darkMode
              ? "border-gray-600/50"
              : "border-gray-400/50"
            : darkMode
            ? "border-gray-700/30"
            : "border-gray-200"
        }
        ${
          darkMode
            ? "bg-gray-900/50 backdrop-blur-sm"
            : "bg-white backdrop-blur-sm"
        }`}
    >
      {/* Animated background highlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: hoveredCard === booking._id ? (darkMode ? 0.1 : 0.05) : 0,
        }}
        className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(
          booking.status
        ).replace("bg-", "")}`}
      />

      <div className="relative z-10 p-5 flex flex-col sm:flex-row gap-5">
        {/* Provider Image with Glow */}
        <motion.div
          animate={{
            scale: hoveredCard === booking._id ? 1.03 : 1,
          }}
          className="relative"
        >
          <motion.div
            animate={{
              opacity:
                hoveredCard === booking._id
                  ? darkMode
                    ? 0.6
                    : 0.3
                  : darkMode
                  ? 0.3
                  : 0.1,
            }}
            className={`absolute -inset-1 rounded-full blur-md bg-${getGlowColor(
              booking.status
            )}`}
          />
          <img
            src={
              booking.providerId?.user?.profilePic
                ? getImageUrl(booking.providerId.user.profilePic)
                : "https://www.gravatar.com/avatar/default?s=200"
            }
            alt={booking.providerId?.user?.name || "Provider"}
            className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 ${
              darkMode ? "border-white/10" : "border-gray-200"
            }`}
          />
        </motion.div>

        {/* Booking Details */}
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start gap-3">
            <div>
              <motion.h3
                animate={{
                  color:
                    hoveredCard === booking._id
                      ? darkMode
                        ? "#ffffff"
                        : "#111827"
                      : darkMode
                      ? "#f3f4f6"
                      : "#374151",
                }}
                className="text-lg font-semibold tracking-tight"
              >
                {booking.service}
              </motion.h3>
              <div
                className={`space-y-1 text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FiUser className="text-blue-500" />
                  <span>
                    {booking.providerId?.user?.name || "Unknown Provider"}
                  </span>
                </div>

                {booking.providerId?.location && (
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-purple-500" />
                    <span>{booking.providerId.location}</span>
                  </div>
                )}

                {booking.providerId?.services?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <FiStar className="text-yellow-400" />
                    <span>{booking.providerId.services.join(", ")}</span>
                  </div>
                )}

                {booking.providerId?.charges && (
                  <div className="flex items-center gap-2">
                    💰
                    <span>
                      Charges: <strong>₹{booking.providerId.charges}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <motion.div
                animate={{
                  scale: hoveredCard === booking._id ? 1.05 : 1,
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                  booking.status
                )}`}
              >
                <div className="flex items-center gap-1.5">
                  {getStatusIcon(booking.status, darkMode)}
                  <span
                    className={`${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    } capitalize`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                </div>
              </motion.div>

              {booking.status === "completed" && (
                <button
                  onClick={() => openReviewModal(booking)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                    darkMode
                      ? "bg-purple-600 text-white hover:bg-purple-500"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                >
                  {booking.reviewId ? "Edit Review" : "Review"}
                </button>
              )}
            </div>
          </div>

          {/* Date/Time */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div
              className={`flex items-center gap-1.5 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FiCalendar
                className={`${
                  darkMode ? "text-purple-400/80" : "text-purple-600"
                } flex-shrink-0`}
              />
              <span>
                {new Date(booking.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div
              className={`flex items-center gap-1.5 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FiClock
                className={`${
                  darkMode ? "text-blue-400/80" : "text-blue-600"
                } flex-shrink-0`}
              />
              <span>{booking.time}</span>
            </div>
          </div>

          {/* Additional Notes */}
          {booking.additionalNotes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: hoveredCard === booking._id ? "auto" : 0,
                opacity: hoveredCard === booking._id ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div
                className={`mt-2 flex items-start gap-2 rounded-lg p-2.5 ${
                  darkMode ? "bg-gray-800/30" : "bg-gray-100"
                }`}
              >
                <FiInfo
                  className={`${
                    darkMode ? "text-blue-400/80" : "text-blue-600"
                  } mt-0.5 flex-shrink-0`}
                />
                <p
                  className={`text-xs leading-snug ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {booking.additionalNotes}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Hover indicator */}
        <motion.div
          animate={{
            opacity: hoveredCard === booking._id ? 1 : 0,
            x: hoveredCard === booking._id ? 0 : 5,
          }}
          className={`absolute right-4 bottom-4 ${
            darkMode ? "text-blue-400/80" : "text-blue-600"
          }`}
        >
          <FiChevronRight className="text-lg" />
        </motion.div>
      </div>
    </motion.div>
  );
};
