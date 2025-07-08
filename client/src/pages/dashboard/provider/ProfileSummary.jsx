import { motion } from "framer-motion";
import { getImageUrl } from "../../../utils/getImageUrl";
import { FiClock, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ProfileSummary({ myProfile, darkMode }) {
  const navigate = useNavigate();

  if (!myProfile) return null;

  // Group time slots by day for better display
  const availabilityByDay = myProfile.availability?.reduce((acc, curr) => {
    if (curr.day && curr.slots?.length > 0) {
      acc[curr.day] = curr.slots;
    }
    return acc;
  }, {});

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border transition-all duration-300`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="flex-shrink-0 relative">
          <motion.div whileHover={{ scale: 1.02 }}>
            <img
              src={getImageUrl(myProfile?.user?.profilePic)}
              alt={myProfile?.user?.name}
              className="w-32 h-32 rounded-xl object-cover border-2 border-purple-500/50 shadow-lg"
              onError={(e) => (e.target.src = "/default-profile.png")}
            />
          </motion.div>
        </div>

        {/* Profile Content Section */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-purple-300" : "text-purple-600"
              }`}
            >
              Profile Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Services Card */}
            <div
              className={`p-4 rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-700/90"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              } border`}
            >
              <h3
                className={`text-sm font-medium ${
                  darkMode ? "text-purple-300" : "text-purple-600"
                } mb-2`}
              >
                Services Offered
              </h3>
              {myProfile.services?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {myProfile.services.map((service, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode
                          ? "bg-purple-900/50 text-purple-100"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {service}
                    </motion.span>
                  ))}
                </div>
              ) : (
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No services added
                </p>
              )}
            </div>

            {/* Location Card */}
            <div
              className={`p-4 rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-700/90"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              } border`}
            >
              <h3
                className={`text-sm font-medium ${
                  darkMode ? "text-purple-300" : "text-purple-600"
                } mb-2`}
              >
                Location
              </h3>
              {myProfile.location ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    {myProfile.location}
                  </p>
                </div>
              ) : (
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Location not specified
                </p>
              )}
            </div>
            <div
              className={`p-4 rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-700/90"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              } border`}
            >
              <h3
                className={`text-sm font-medium ${
                  darkMode ? "text-purple-300" : "text-purple-600"
                } mb-2`}
              >
                Hourly Rate
              </h3>
              {myProfile.charges ? (
                <div className="flex items-center gap-2">
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    ${myProfile.charges.toFixed(2)}/hour
                  </span>
                </div>
              ) : (
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Rate not specified
                </p>
              )}
            </div>
            {/* Availability Schedule */}
            <div
              className={`md:col-span-2 p-4 rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-700/90"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              } border`}
            >
              <h3
                className={`text-sm font-medium ${
                  darkMode ? "text-purple-300" : "text-purple-600"
                } mb-3`}
              >
                Availability Schedule
              </h3>

              {myProfile.availability?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="mb-2">
                      <h4
                        className={`text-xs font-medium mb-1 ${
                          availabilityByDay?.[day]
                            ? darkMode
                              ? "text-green-400"
                              : "text-green-600"
                            : darkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </h4>
                      <div className="space-y-1">
                        {availabilityByDay?.[day] ? (
                          availabilityByDay[day].map((slot, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ x: 2 }}
                              className={`text-xs px-2 py-1 rounded ${
                                darkMode
                                  ? "bg-gray-600 text-gray-200"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                <FiClock size={10} />
                                {slot.from} - {slot.to}
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div
                            className={`text-xs px-2 py-1 rounded ${
                              darkMode
                                ? "bg-gray-800/50 text-gray-500"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            Not available
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No availability set
                </p>
              )}
            </div>

            {/* About Card */}
            <div
              className={`md:col-span-2 p-4 rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-700/90"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              } border`}
            >
              <h3
                className={`text-sm font-medium ${
                  darkMode ? "text-purple-300" : "text-purple-600"
                } mb-2`}
              >
                About
              </h3>
              <p
                className={`whitespace-pre-line ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {myProfile.bio || "No bio provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
