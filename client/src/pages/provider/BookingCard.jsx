import { motion } from "framer-motion";
import { FiClock, FiChevronRight } from "react-icons/fi";

import { getImageUrl } from "../../utils/getImageUrl";
import { useUpdateBookingStatus } from "../../hooks/bookings/useBooking";

export default function BookingCard({ booking, darkMode }) {
  const updateStatusMutation = useUpdateBookingStatus();
  const customerName = booking.userId?.name || "Unknown User";
  const customerPic = booking.userId?.profilePic
    ? getImageUrl(booking.userId.profilePic)
    : "/default-profile.png";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`group flex items-center gap-4 p-5 rounded-xl transition-all ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
          : "bg-white hover:bg-gray-50 border border-gray-100"
      } shadow-xs`}
    >
      <div className="relative">
        <img
          src={customerPic}
          alt={customerName}
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors"
        />
        <span
          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${
            darkMode ? "border-gray-800" : "border-white"
          } ${
            booking.status === "cancelled"
              ? "bg-red-500"
              : booking.status === "completed"
              ? "bg-green-500"
              : booking.status === "confirmed"
              ? "bg-blue-500"
              : "bg-yellow-500"
          }`}
        ></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`font-medium truncate ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {customerName}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              booking.status === "cancelled"
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                : booking.status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : booking.status === "confirmed"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
            }`}
          >
            {booking.status}
          </span>
        </div>

        <p
          className={`text-sm mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {booking.service}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <div
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <FiClock size={12} />
            <span>
              {new Date(booking.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              {" • "}
              {booking.time}
            </span>
          </div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {booking.status === "pending" && (
            <>
              <button
                onClick={() =>
                  updateStatusMutation.mutate({
                    bookingId: booking._id,
                    status: "confirmed",
                  })
                }
                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Accept Booking
              </button>
              <button
                onClick={() =>
                  updateStatusMutation.mutate({
                    bookingId: booking._id,
                    status: "cancelled",
                  })
                }
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Decline
              </button>
            </>
          )}

          {booking.status === "confirmed" && (
            <button
              onClick={() =>
                updateStatusMutation.mutate({
                  bookingId: booking._id,
                  status: "completed",
                })
              }
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>

      <FiChevronRight
        className={`ml-2 ${
          darkMode ? "text-gray-500" : "text-gray-400"
        } group-hover:text-purple-500 transition-colors`}
      />
    </motion.div>
  );
}
