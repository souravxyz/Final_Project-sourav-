// components/MyBookings/ReviewModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar } from "react-icons/fi";

export default function ReviewModal({
  showModal,
  setShowModal,
  darkMode,
  selectedBooking,
  handleSubmit,
  register,
  errors,
  reviewMutation,
}) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`relative rounded-2xl p-6 w-full max-w-md ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}
          >
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <FiX className="text-lg" />
            </button>

            <h3
              className={`text-xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Leave a Review
            </h3>

            <div className="mb-4">
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Service: {selectedBooking?.service}
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Provider: {selectedBooking?.providerId?.user?.name}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Rating (1-5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        type="radio"
                        id={`star-${star}`}
                        value={star}
                        {...register("rating", {
                          required: "Rating is required",
                        })}
                        className="hidden"
                      />
                      <label
                        htmlFor={`star-${star}`}
                        className={`text-2xl cursor-pointer ${
                          darkMode
                            ? "text-gray-600 hover:text-yellow-400"
                            : "text-gray-300 hover:text-yellow-500"
                        }`}
                      >
                        <FiStar />
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Comments
                </label>
                <textarea
                  {...register("comment")}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  rows="4"
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                disabled={reviewMutation.isLoading}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                }`}
              >
                {reviewMutation.isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
