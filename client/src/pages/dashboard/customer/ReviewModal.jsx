import { useState } from "react";
import { toast } from "react-hot-toast";
import { useReview } from "../../../hooks/review/useReview";
import { FiStar, FiX } from "react-icons/fi";

export default function ReviewModal({ booking, onClose, darkMode }) {
  const [rating, setRating] = useState(booking?.review?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(booking?.review?.comment || "");

  const reviewMutation = useReview();

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    reviewMutation.mutate(
      {
        providerId: booking.providerId._id,
        bookingId: booking._id,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully!");
          onClose();
        },
        onError: () => {
          toast.error("Failed to submit review. Please try again.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-xl p-6 w-full max-w-md relative transition-all duration-300 ${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-900 border-gray-200"
        } border shadow-xl`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <FiX className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-1">Share Your Experience</h2>
        <p
          className={`text-sm mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          How was your service with {booking?.providerId?.name}?
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Your Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`text-2xl transition-colors ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              >
                <FiStar className="w-8 h-8" />
              </button>
            ))}
            <span className="ml-2 text-sm font-medium">
              {rating > 0
                ? `${rating} star${rating !== 1 ? "s" : ""}`
                : "Not rated"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium mb-3">
            Your Review (Optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            rows={4}
            placeholder="Share details about your experience..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={reviewMutation.isLoading || rating === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {reviewMutation.isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
