// components/MyBookings/BookingsEmptyState.jsx
import { motion } from "framer-motion";

export default function BookingsEmptyState({
  darkMode,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-8 text-center rounded-xl ${
        darkMode ? "bg-gray-800/30" : "bg-gray-100"
      }`}
    >
      <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        No bookings found matching your criteria
      </p>
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className={`mt-3 px-4 py-1 rounded-full text-sm ${
            darkMode
              ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Clear search
        </button>
      )}
    </motion.div>
  );
}