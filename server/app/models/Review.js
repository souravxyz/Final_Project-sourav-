import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer between 1 and 5",
      },
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, "Comment cannot be longer than 500 characters"],
    },
    isDeleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
