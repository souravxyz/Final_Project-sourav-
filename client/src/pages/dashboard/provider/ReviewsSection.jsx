import { motion } from "framer-motion";
import { getImageUrl } from "../../../utils/getImageUrl";
import {
  FiStar,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";

export default function ReviewsSection({
  reviews = [],
  darkMode = false,
  providerId,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Calculate average rating safely
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  // Pagination logic
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const goToPreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border transition-all duration-300`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className={`text-xl font-semibold flex items-center gap-2 ${
              darkMode ? "text-purple-300" : "text-purple-600"
            }`}
          >
            <FiMessageSquare className="text-purple-500" />
            Customer Reviews
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <FiStar className="text-amber-400 mr-1" />
                <span
                  className={`font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {averageRating}
                </span>
              </div>
              <span
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {paginatedReviews.map((review) => (
            <motion.div
              key={review._id}
              whileHover={{ y: -2 }}
              className={`group p-4 rounded-lg border transition-all ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700 border-gray-600"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={
                      getImageUrl(review.userId?.profilePic) ||
                      "/default-profile.png"
                    }
                    alt={review.userId?.name || "Anonymous"}
                    className="w-10 h-10 rounded-full object-cover border border-purple-500/50 group-hover:border-purple-500 transition-colors"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-medium truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {review.userId?.name || "Anonymous"}
                    </h3>
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : darkMode
                            ? "text-gray-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`mt-2 text-sm line-clamp-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {review.comment || "No comment provided"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              className={`flex justify-between items-center mt-6 pt-4 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-1 rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                }`}
              >
                <FiChevronLeft /> Previous
              </button>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-1 rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                }`}
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className={`text-center py-8 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-50"
          }`}
        >
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 mb-3">
            <FiMessageSquare size={24} />
          </div>
          <h3
            className={`font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No reviews yet
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Your customer reviews will appear here
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
