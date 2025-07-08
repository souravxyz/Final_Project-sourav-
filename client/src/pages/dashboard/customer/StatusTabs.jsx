import { motion } from "framer-motion";

export const StatusTabs = ({ activeTab, setActiveTab, darkMode }) => {
  const statusColors = darkMode
    ? {
        completed: "from-emerald-500 to-teal-600",
        cancelled: "from-red-500 to-rose-600",
        pending: "from-amber-500 to-yellow-600",
        confirmed: "from-blue-500 to-indigo-600",
        in_progress: "from-purple-500 to-fuchsia-600",
        default: "from-gray-600 to-gray-700",
      }
    : {
        completed: "from-emerald-400 to-teal-500",
        cancelled: "from-red-400 to-rose-500",
        pending: "from-amber-400 to-yellow-500",
        confirmed: "from-blue-400 to-indigo-500",
        in_progress: "from-purple-400 to-fuchsia-500",
        default: "from-gray-500 to-gray-600",
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {["all", "pending", "confirmed", "cancelled"].map((tab) => (
        <motion.button
          key={tab}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab
              ? `bg-gradient-to-r ${
                  statusColors[tab] || statusColors.default
                } text-white shadow-md`
              : darkMode
              ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.replace("_", " ")}
        </motion.button>
      ))}
    </motion.div>
  );
};
