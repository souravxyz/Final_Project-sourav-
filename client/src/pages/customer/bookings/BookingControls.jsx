// components/MyBookings/BookingsControls.jsx
import { motion } from "framer-motion";
import { FiSearch, FiDownload, FiRefreshCw } from "react-icons/fi";

export default function BookingsControls({
  darkMode,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  refetch,
  handleExport,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700"
          : "bg-white shadow-md"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["all", "upcoming", "past"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tab
                  ? darkMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : darkMode
                  ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch
              className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>
          <input
            type="text"
            placeholder="Search by provider, service or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 rounded-full border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"
            } focus:border-transparent`}
          />
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Refresh"
          >
            <FiRefreshCw />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Export"
          >
            <FiDownload />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
