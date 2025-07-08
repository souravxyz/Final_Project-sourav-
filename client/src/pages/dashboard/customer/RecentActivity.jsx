import { motion } from "framer-motion";
import { getStatusIcon } from "../../../utils/getStatusIcon";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export const RecentActivity = ({ activities, darkMode }) => {
  const activityColors = darkMode
    ? {
        cancelled: "bg-red-500/10 border-red-500/20",
        pending: "bg-amber-500/10 border-amber-500/20",
        confirmed: "bg-blue-500/10 border-blue-500/20",
        default: "bg-gray-800/50 border-gray-700/50",
      }
    : {
        cancelled: "bg-red-100/80 border-red-200",
        pending: "bg-amber-100/80 border-amber-200",
        confirmed: "bg-blue-100/80 border-blue-200",
        default: "bg-gray-100/80 border-gray-200",
      };

  const cardStyles = darkMode
    ? {
        background: "bg-gray-900/50",
        border: "border-gray-700/30",
        text: {
          primary: "text-gray-100",
          secondary: "text-gray-400",
          tertiary: "text-gray-500",
        },
      }
    : {
        background: "bg-white/90",
        border: "border-gray-200/50",
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-600",
          tertiary: "text-gray-400",
        },
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${cardStyles.background} backdrop-blur-sm rounded-xl ${cardStyles.border} shadow-lg lg:col-span-2 overflow-hidden`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3
            className={`text-lg font-semibold ${cardStyles.text.primary} tracking-tight`}
          >
            Recent Activity
          </h3>
          <div
            className={`flex items-center gap-1 text-xs ${cardStyles.text.secondary}`}
          >
            <FiClock
              className={darkMode ? "text-blue-400/80" : "text-blue-600/90"}
            />
            <span>Last updated</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {activities.map((activity) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 3 }}
              className={`p-3 rounded-lg border ${
                activityColors[activity.status] || activityColors.default
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getStatusIcon(activity.status, darkMode)}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${cardStyles.text.primary} capitalize`}
                  >
                    {activity.status.replace("_", " ")} booking for{" "}
                    <span className={darkMode ? "text-white" : "text-gray-900"}>
                      {activity.service}
                    </span>
                  </p>
                  <p
                    className={`text-xs ${cardStyles.text.secondary} mt-1 flex items-center gap-1.5`}
                  >
                    <span>
                      {new Date(activity.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(activity.updatedAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {activities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 text-center"
            >
              <p className={`text-sm ${cardStyles.text.secondary}`}>
                No recent activity found
              </p>
              <p className={`text-xs ${cardStyles.text.tertiary} mt-1`}>
                Your completed bookings will appear here
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/my-bookings"
            className={`flex items-center justify-end gap-1.5 text-sm ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            } transition-colors`}
          >
            View all bookings
            <FiArrowRight className="text-sm" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
