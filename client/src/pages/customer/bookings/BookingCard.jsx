// components/MyBookings/BookingCard.jsx
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { FiCalendar, FiClock, FiStar, FiTrash2 } from "react-icons/fi";

import StatusBadge from "./StatusBadge";
import { getImageUrl } from "../../../utils/getImageUrl";

export default function BookingCard({
  booking,
  darkMode,
  hoveredBooking,
  setHoveredBooking,
  handleCancel,
  setCurrentProviderId,
  setSelectedBooking,
  setShowModal,
}) {
  const isPast = dayjs(`${booking.date} ${booking.time}`).isBefore(dayjs());
  const showReviewButton =
    isPast && booking.status === "completed" && !booking.review;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setHoveredBooking(booking._id)}
      onHoverEnd={() => setHoveredBooking(null)}
      className={`p-5 rounded-xl transition-all border ${
        darkMode
          ? hoveredBooking === booking._id
            ? "bg-gray-700/70 border-gray-600"
            : "bg-gray-800/30 border-gray-700"
          : hoveredBooking === booking._id
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-4">
        <motion.div
          animate={{
            scale: hoveredBooking === booking._id ? 1.05 : 1,
            rotate: hoveredBooking === booking._id ? 2 : 0,
          }}
          className="relative flex-shrink-0"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20"></div>
          <img
            src={
              booking.providerId?.user?.profilePic
                ? getImageUrl(booking.providerId.user.profilePic)
                : "/default.jpg"
            }
            alt={booking.providerId?.user?.name || "Provider"}
            className="relative z-10 w-14 h-14 rounded-full object-cover border-2 border-gray-600/50"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h4
                className={`font-semibold truncate ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {booking.service}
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                with {booking.providerId?.user?.name || "Unknown Provider"}
              </p>
            </div>

            <StatusBadge status={booking.status} darkMode={darkMode} />
          </div>

          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <div
              className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FiCalendar />
              <span>{dayjs(booking.date).format("MMM D, YYYY")}</span>
            </div>

            <div
              className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FiClock />
              <span>{booking.time}</span>
            </div>

            {booking.price && (
              <div
                className={`flex items-center gap-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span>${booking.price.toFixed(2)}</span>
              </div>
            )}
          </div>

          {booking.additionalNotes && (
            <div className="mt-3">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span className="font-medium">Notes:</span>{" "}
                {booking.additionalNotes}
              </p>
            </div>
          )}

          {booking.review && (
            <div className="mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < booking.review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : darkMode
                        ? "text-gray-600"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {booking.review.comment}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        {!["cancelled", "confirmed", "completed"].includes(booking.status) &&
          !isPast && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCancel(booking._id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode
                  ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
              } flex items-center gap-1`}
            >
              <FiTrash2 size={14} /> Cancel
            </motion.button>
          )}

        {showReviewButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentProviderId(booking.providerId._id);
              setSelectedBooking(booking);
              setShowModal(true);
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
            } flex items-center gap-1`}
          >
            <FiStar size={14} /> Review
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
