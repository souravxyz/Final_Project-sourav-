import express from "express";
import {
  createOrUpdateReview,
  getProviderReviews,
  getUserReviews,
} from "../controllers/reviewController.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

// POST: Write or update a review (customer only)
router.post(
  "/",
  auth.AuthCheck,
  auth.roleCheck("customer"),
  createOrUpdateReview
);

// user review
router.get("/user/:userId", auth.AuthCheck, getUserReviews);
// GET: All reviews for a provider (public)
router.get("/:providerId", getProviderReviews);

export default router;
