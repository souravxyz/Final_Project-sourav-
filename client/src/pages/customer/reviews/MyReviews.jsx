// src/pages/customer/MyReviews.jsx
import { useUserProfile } from "../../../hooks/auth/useAuth";
import { useGetUserReviews, useReview } from "../../../hooks/review/useReview";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../../context/DarkModeContext";
import { FiStar, FiEdit2, FiX, FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function MyReviews() {
  const { data: user } = useUserProfile();
  const userId = user?._id || user?.id;
  const { darkMode } = useDarkMode();

  const { data: reviewsData, isLoading, refetch } = useGetUserReviews(userId);
  const reviewMutation = useReview();
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([]);

  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  useEffect(() => {
    if (reviewsData) {
      setReviews(reviewsData);
    }
  }, [reviewsData]);

  useEffect(() => {
    if (searchTerm && reviewsData) {
      const filtered = reviewsData.filter(review => 
        review.providerId?.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setReviews(filtered);
    } else {
      setReviews(reviewsData || []);
    }
  }, [searchTerm, reviewsData]);

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setFormData({ rating: "", comment: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    reviewMutation.mutate(
      {
        userId,
        providerId: editingReview.providerId._id,
        rating: Number(formData.rating),
        comment: formData.comment,
        bookingId: editingReview.bookingId?._id,
      },
      {
        onSuccess: () => {
          toast.success("Review updated successfully!", {
            position: "bottom-center",
            style: {
              background: darkMode ? "#1f2937" : "#fff",
              color: darkMode ? "#fff" : "#1f2937",
            },
          });
          setEditingReview(null);
          setFormData({ rating: "", comment: "" });
          refetch();
        },
        onError: () => {
          toast.error("Failed to update review. Please try again.", {
            position: "bottom-center",
            style: {
              background: darkMode ? "#1f2937" : "#fff",
              color: darkMode ? "#fff" : "#1f2937",
            },
          });
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner darkMode={darkMode} />;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } overflow-hidden relative`}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-3xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          My Reviews
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-8 p-1 rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            </div>
            <input
              type="text"
              placeholder="Search reviews by provider or comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 rounded-md ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiX className={`${darkMode ? "text-gray-400" : "text-gray-500"} hover:text-red-500`} />
              </button>
            )}
          </div>
        </motion.div>

        {reviews?.length > 0 ? (
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {reviews.map((r) => (
              <motion.li 
                key={r._id}
                whileHover={{ scale: 1.01 }}
                className={`p-6 rounded-xl shadow-lg transition-all ${
                  darkMode
                    ? "bg-gray-800/50 backdrop-blur-md border border-gray-700/30 hover:border-gray-600"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold text-lg ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}>
                        {r.providerId?.user?.name}
                      </p>
                      <span className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < r.rating
                              ? darkMode
                                ? "text-yellow-400"
                                : "text-yellow-500"
                              : darkMode
                              ? "text-gray-600"
                              : "text-gray-300"
                          } ${i < r.rating ? "fill-current" : ""}`}
                          size={18}
                        />
                      ))}
                      <span className={`ml-2 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {r.rating}.0
                      </span>
                    </div>
                    <p className={`mt-2 text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {r.comment}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(r)}
                    className={`ml-4 p-2 rounded-full transition-colors ${
                      darkMode
                        ? "hover:bg-gray-700 text-blue-400"
                        : "hover:bg-gray-100 text-blue-600"
                    }`}
                    aria-label="Edit review"
                  >
                    <FiEdit2 size={18} />
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-8 text-center ${
              darkMode
                ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700/30"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className={`text-5xl mb-4 ${
              darkMode ? "text-gray-600" : "text-gray-300"
            }`}>
              <FiStar />
            </div>
            <h3 className={`text-xl font-medium mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}>
              {searchTerm ? "No matching reviews found" : "No reviews yet"}
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {searchTerm 
                ? "Try a different search term"
                : "You haven't written any reviews for your service providers yet."}
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {editingReview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${
                darkMode ? "bg-black/70" : "bg-black/50"
              }`}
            >
              <motion.div
                className={`w-full max-w-md rounded-xl shadow-xl ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className={`flex justify-between items-center p-6 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                  <h2 className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    Edit Review
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className={`p-1 rounded-full ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Rating (1-5)
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({...formData, rating: star})}
                          className={`p-2 rounded-full ${
                            star <= formData.rating
                              ? darkMode
                                ? "text-yellow-400 bg-gray-700"
                                : "text-yellow-500 bg-gray-100"
                              : darkMode
                              ? "text-gray-500 hover:bg-gray-700"
                              : "text-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <FiStar size={20} className={star <= formData.rating ? "fill-current" : ""} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      rows={4}
                      value={formData.comment}
                      onChange={handleChange}
                      className={`mt-1 w-full rounded-lg px-4 py-3 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 px-5 py-3 rounded-lg font-medium ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      Save Changes
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleCancelEdit}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg font-medium ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const LoadingSpinner = ({ darkMode }) => (
  <div
    className={`min-h-screen flex items-center justify-center ${
      darkMode ? "bg-gray-900" : "bg-gray-50"
    }`}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`w-12 h-12 border-4 ${
        darkMode ? "border-blue-500" : "border-blue-600"
      } border-t-transparent rounded-full`}
    />
  </div>
);