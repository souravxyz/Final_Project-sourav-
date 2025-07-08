import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiXCircle } from "react-icons/fi";

export const SummaryCard = ({
  title,
  value,
  icon,
  color,
  delay = 0.3,
  darkMode,
}) => {
  const icons = {
    calendar: (
      <FiCalendar className={darkMode ? "text-blue-400" : "text-blue-600"} />
    ),
    clock: (
      <FiClock className={darkMode ? "text-purple-400" : "text-purple-600"} />
    ),
    cancel: (
      <FiXCircle className={darkMode ? "text-red-400" : "text-red-600"} />
    ),
  };

  const cardStyles = darkMode
    ? {
        background: "bg-gradient-to-br from-gray-800/50 to-gray-900/70",
        border: "border-gray-700/30",
        text: {
          primary: "text-white",
          secondary: "text-gray-400",
        },
      }
    : {
        background: "bg-gradient-to-br from-white/90 to-gray-100/90",
        border: "border-gray-200/50",
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-600",
        },
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`${cardStyles.background} backdrop-blur-lg rounded-2xl p-6 ${cardStyles.border} shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`${cardStyles.text.secondary} text-sm`}>{title}</p>
          <h3 className={`text-3xl font-bold ${cardStyles.text.primary} mt-1`}>
            {value}
          </h3>
        </div>
        <div
          className={`p-3 rounded-full ${
            darkMode ? `bg-${color}-500/10` : `bg-${color}-500/20`
          }`}
        >
          {icons[icon]}
        </div>
      </div>
    </motion.div>
  );
};
