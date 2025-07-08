import { motion } from "framer-motion";
import { getImageUrl } from "../../../utils/getImageUrl";
import { FiShare2, FiCalendar, FiDollarSign } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function DashboardHeader({
  user,
  myProfile,
  reviews = [],
  darkMode,
  toggleDarkMode,
  setShowEditModal,
  isProfileIncomplete,
}) {
  const averageRating =
    reviews?.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : myProfile?.createdAt
    ? new Date(myProfile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-4">
      {isProfileIncomplete ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-col items-center justify-center gap-6 p-8 rounded-2xl ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <h2
            className={`text-xl md:text-2xl font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your provider profile is not set up yet.
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            } shadow-lg`}
            onClick={() => setShowEditModal(true)}
          >
            Set Up Profile
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border`}
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={getImageUrl(
                    myProfile?.user?.profilePic || user?.profilePic
                  )}
                  alt={myProfile?.user?.name || user?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                  onError={(e) => (e.target.src = "/default-profile.png")}
                />
                <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-purple-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <h1
                  className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  Welcome, {user?.name || "User"}
                </h1>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) =>
                    i < Math.floor(averageRating) ? (
                      <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                    ) : (
                      <FaRegStar
                        key={i}
                        className={
                          darkMode
                            ? "text-gray-500 w-5 h-5"
                            : "text-gray-300 w-5 h-5"
                        }
                      />
                    )
                  )}
                  <span
                    className={`ml-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {reviews?.length > 0
                      ? `${averageRating.toFixed(1)} (${
                          reviews.length
                        } reviews)`
                      : "No reviews yet"}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  toast.success("Profile Link Copied");
                }}
              >
                <FiShare2 size={18} />
                <span className="hidden sm:inline">Share</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                } shadow-lg`}
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <StatCard
              icon={<FaStar className="text-yellow-400" />}
              value={averageRating.toFixed(1)}
              label="Avg Rating"
              darkMode={darkMode}
              loading={!reviews}
            />
            <StatCard
              icon={<FiDollarSign className="text-green-400" />}
              value={
                myProfile?.charges ? `$${myProfile.charges}/hr` : "Not set"
              }
              label="Hourly Rate"
              darkMode={darkMode}
            />
            <StatCard
              icon={<FiCalendar className="text-purple-400" />}
              value={memberSince}
              label="Member Since"
              darkMode={darkMode}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, darkMode, loading = false }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`p-4 rounded-xl flex items-center gap-3 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div
        className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          ) : (
            value
          )}
        </div>
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}
