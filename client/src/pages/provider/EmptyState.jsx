import { FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

export default function EmptyState({ darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-center p-8 rounded-xl shadow-sm ${
        darkMode
          ? "bg-gray-800 text-gray-300 border border-gray-700"
          : "bg-white text-gray-600 border border-gray-100"
      }`}
    >
      <FiCalendar className="mx-auto mb-3 text-purple-500" size={32} />
      <p className="font-medium">No bookings found.</p>
      <p className="text-sm mt-1">Your upcoming bookings will appear here.</p>
    </motion.div>
  );
}
