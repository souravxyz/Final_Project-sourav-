import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import AvailabilityField from "./AvailabilityField";
import { getImageUrl } from "../../../utils/getImageUrl";
import { FiX, FiCamera, FiSave } from "react-icons/fi";

export default function EditProfileModal({
  showEditModal,
  setShowEditModal,
  user,
  myProfile,
  register,
  handleSubmit,
  profileMutation,
  control,
  fields,
  setValue,
  append,
  remove,
  darkMode = false,
}) {
  return (
    showEditModal && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-2xl border shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
        >
          <div
            className={`sticky top-0 ${
              darkMode
                ? "bg-gray-800/90 border-gray-700"
                : "bg-white/90 border-gray-200"
            } backdrop-blur-sm p-4 border-b flex justify-between items-center z-10`}
          >
            <h3
              className={`text-xl font-semibold ${
                darkMode ? "text-purple-300" : "text-purple-600"
              }`}
            >
              Edit Profile
            </h3>
            <button
              onClick={() => setShowEditModal(false)}
              className={
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <img
                  src={getImageUrl(
                    myProfile?.user?.profilePic || user?.profilePic
                  )}
                  alt={myProfile?.user?.name || user?.name}
                  className={`w-24 h-24 rounded-full object-cover border-2 ${
                    darkMode ? "border-purple-500" : "border-purple-400"
                  } shadow-lg`}
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                <label
                  htmlFor="profilePic"
                  className={`absolute bottom-0 right-0 ${
                    darkMode
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-purple-500 hover:bg-purple-600"
                  } rounded-full p-2 shadow-md text-white cursor-pointer`}
                >
                  <FiCamera size={18} />
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Handle file upload here
                        const file = e.target.files[0];
                        // You'll need to implement the upload logic
                      }
                    }}
                  />
                </label>
              </div>
              <h4
                className={`text-lg font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user?.name}
              </h4>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-purple-300" : "text-purple-600"
                  } mb-2`}
                >
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  defaultValue={myProfile?.bio}
                  placeholder="Tell clients about yourself and your services"
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-purple-300" : "text-purple-600"
                    } mb-2`}
                  >
                    Location
                  </label>
                  <input
                    {...register("location")}
                    defaultValue={myProfile?.location}
                    placeholder="Your service area or city"
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-purple-300" : "text-purple-600"
                    } mb-2`}
                  >
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    {...register("charges", { valueAsNumber: true })}
                    defaultValue={myProfile?.charges || 0}
                    placeholder="Your hourly rate"
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-purple-300" : "text-purple-600"
                  } mb-2`}
                >
                  Services
                </label>
                <input
                  {...register("services")}
                  defaultValue={myProfile?.services?.join(", ")}
                  placeholder="Plumber, Electrician, Carpenter, etc. (comma separated)"
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Separate multiple services with commas
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-purple-300" : "text-purple-600"
                  } mb-2`}
                >
                  Availability
                </label>
                <AvailabilityField
                  fields={fields}
                  register={register}
                  remove={remove}
                  append={append}
                  control={control}
                  setValue={setValue}
                  darkMode={darkMode}
                  defaultAvailability={myProfile?.availability}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className={`px-6 py-3 rounded-lg font-medium ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={profileMutation.isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  profileMutation.isLoading
                    ? darkMode
                      ? "bg-purple-800"
                      : "bg-purple-400"
                    : darkMode
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-purple-500 hover:bg-purple-600"
                } text-white shadow-lg flex items-center gap-2`}
              >
                {profileMutation.isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  );
}
