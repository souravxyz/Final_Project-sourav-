import { useState } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../../../utils/getImageUrl";
import {
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BookingsSection({
  bookings,
  darkMode,
  updateStatusMutation,
  disablePagination = false,
}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
  const totalPages = Math.ceil(bookings?.length / bookingsPerPage) || 1;

  const paginatedBookings = disablePagination
    ? bookings
    : bookings?.slice(
        (currentPage - 1) * bookingsPerPage,
        currentPage * bookingsPerPage
      );

  const goToPreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className={`text-xl font-semibold flex items-center gap-2 ${
              darkMode ? "text-purple-300" : "text-purple-600"
            }`}
          >
            <FiCalendar className="text-purple-500" />
            {disablePagination ? "All Bookings" : "Upcoming Bookings"}
          </h2>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {bookings?.length || 0} {disablePagination ? "total" : "upcoming"}{" "}
            appointments
          </p>
        </div>

        {!disablePagination && bookings?.length > 3 && (
          <p
            onClick={() => navigate("/provider/bookings")}
            className={`text-sm font-medium cursor-pointer underline ${
              darkMode
                ? "text-purple-300 hover:text-purple-400"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            View All Bookings
          </p>
        )}
      </div>

      {bookings?.length > 0 ? (
        <>
          <div className="space-y-3">
            {paginatedBookings.map((booking) => (
              <motion.div
                key={booking._id}
                whileHover={{ y: -2 }}
                className={`group flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  darkMode
                    ? "bg-gray-700/50 hover:bg-gray-700 border-gray-600"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    src={getImageUrl(booking.userId?.profilePic)}
                    alt={booking.userId?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50 group-hover:border-purple-500 transition-colors"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {booking.userId?.name || "Unknown User"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FiClock
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {" • "}
                      {booking.time}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              bookingId: booking._id,
                              status: "confirmed",
                            })
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              bookingId: booking._id,
                              status: "cancelled",
                            })
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Reject
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
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : booking.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    }`}
                  >
                    {booking.status || "confirmed"}
                  </div>
                  <FiChevronRight
                    className={`${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    } group-hover:text-purple-500 transition-colors`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {!disablePagination && totalPages > 1 && (
            <div
              className={`flex justify-between items-center mt-6 pt-4 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-1 rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                }`}
              >
                <FiChevronLeft /> Previous
              </button>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-1 rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                }`}
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className={`text-center py-8 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-50"
          }`}
        >
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 mb-3">
            <FiCalendar size={24} />
          </div>
          <h3
            className={`font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No upcoming bookings
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Your upcoming appointments will appear here
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
