import mongoose from "mongoose";
import Review from "../models/Review.js";
import ServiceProvider from "../models/ServiceProvider.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

import { reviewNotificationEmail } from "../utils/templates/reviewEmails.js";
import sendEmail from "../utils/sendEmail.js";
// create and update review(user)
export const createOrUpdateReview = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user
    const { providerId, rating, comment } = req.body;

    // ✅ 1. Check if user had a confirmed booking with this provider
    const hasBooked = await Booking.findOne({
      userId,
      providerId,
      status: "completed",
    });

    if (!hasBooked) {
      return res.status(403).json({
        message: "You can only review providers you've booked",
      });
    }

    // ✅ 2. Check if the user already reviewed this provider
    let review = await Review.findOne({ userId, providerId });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      review = await Review.create({ userId, providerId, rating, comment });
    }

    // ✅ 3. Recalculate average rating and total reviews
    const result = await Review.aggregate([
      // 1. Match only reviews for this provider
      { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },

      // 2. Group them to calculate average & count
      {
        $group: {
          _id: null, // Group all documents together
          averageRating: { $avg: "$rating" }, // MongoDB calculates average
          totalReviews: { $sum: 1 }, // MongoDB counts documents
        },
      },
    ]);

    // Destructure results (with defaults if no reviews exist)
    const { averageRating = 0, totalReviews = 0 } = result[0] || {};

    // Update provider (same as before)
    await ServiceProvider.findByIdAndUpdate(providerId, {
      rating: Math.round(averageRating * 10) / 10,
      totalReviews,
    });

    // ✅ 4. Email notification to provider
    const provider = await ServiceProvider.findById(providerId).populate(
      "user"
    );
    const customer = await User.findById(userId);

    await sendEmail({
      to: provider.user.email,
      subject: "New Review Received on ServeHub",
      html: reviewNotificationEmail({
        providerName: provider.user.name,
        customerName: customer.name,
        rating,
        comment,
      }),
    });

    res.status(review ? 200 : 201).json({
      message: review ? "Review updated" : "Review submitted",
      review,
    });
  } catch (err) {
    console.error("Review error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
// provider's review
export const getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;

    const reviews = await Review.find({ providerId })
      .sort({ createdAt: -1 })
      .populate("userId", "name profilePic");

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
//get users review
export const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .populate("providerId", "services location rating totalReviews")
      .populate({
        path: "providerId",
        populate: {
          path: "user",
          select: "name profilePic",
        },
      });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching user reviews:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
