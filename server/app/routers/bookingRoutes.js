import express from "express";
import {
  createBooking,
  getBookedSlots,
  getBookingsByUser,
  getBookingsByProvider,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import auth from "../middlewares/Auth.js";
const router = express.Router();

// Create a booking (only customers)
router.post("/", auth.AuthCheck, auth.roleCheck("customer"), createBooking);

// Get booked slots for a provider (any logged-in user)
router.get("/provider/:providerId", auth.AuthCheck, getBookedSlots);

// User bookings (only that customer can access their bookings)
router.get(
  "/user/:userId",
  auth.AuthCheck,
  auth.roleCheck("customer"),
  getBookingsByUser
);

// Provider’s bookings (only provider can access their own data)
router.get(
  "/provider/:providerId/all",
  auth.AuthCheck,
  auth.roleCheck("provider"),
  getBookingsByProvider
);

// Provider updates booking status (like confirm/cancel)
router.patch(
  "/status/:bookingId",
  auth.AuthCheck,
  auth.roleCheck(["provider", "customer"]), 
  updateBookingStatus
);


export default router;
