import { motion } from "framer-motion";

export const DashboardHeader = ({ user, bookings, darkMode }) => {
  const name = user?.name || "User";
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 mb-10 relative backdrop-blur-xl
        ${
          darkMode
            ? "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/30"
            : "bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200/50"
        }`}
    >
      <div
        className={`absolute inset-0 opacity-10 ${
          darkMode
            ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNNDAgMEgwVjQwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=")]'
            : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNNDAgMEgwVjQwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=")]'
        }`}
      ></div>

      <div className="relative z-10 flex items-center gap-5">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-semibold
            ${
              darkMode
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-700"
            }
          `}
        >
          {initials}
        </motion.div>

        {/* Welcome text */}
        <div className="flex flex-col overflow-hidden">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Welcome back,
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text truncate max-w-[280px] ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 to-purple-500"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            }`}
            title={name}
          >
            {name}
          </motion.h1>
        </div>
      </div>

      {/* Booking message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-4 text-sm md:text-base ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {bookings.length > 0
          ? `You have ${bookings.length} ${
              bookings.length === 1 ? "booking" : "bookings"
            } in your history`
          : "Your booking history is currently empty"}
      </motion.p>
    </motion.div>
  );
};
