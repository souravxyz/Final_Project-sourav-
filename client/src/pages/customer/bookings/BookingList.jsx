// components/MyBookings/BookingsList.jsx
import { motion } from "framer-motion";
import BookingCard from "./BookingCard";
import BookingsEmptyState from "./BookingsEmptyState";

export default function BookingsList({
  darkMode,
  filteredBookings,
  hoveredBooking,
  setHoveredBooking,
  handleCancel,
  setCurrentProviderId,
  setSelectedBooking,
  setShowModal,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={`rounded-2xl p-6 ${
        darkMode
          ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700"
          : "bg-white shadow-md"
      }`}
    >
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              darkMode={darkMode}
              hoveredBooking={hoveredBooking}
              setHoveredBooking={setHoveredBooking}
              handleCancel={handleCancel}
              setCurrentProviderId={setCurrentProviderId}
              setSelectedBooking={setSelectedBooking}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      ) : (
        <BookingsEmptyState
          darkMode={darkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
    </motion.div>
  );
}
