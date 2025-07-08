import Booking from "../models/Booking.js";
import ServiceProvider from "../models/ServiceProvider.js";

// GET: Total bookings & top providers
export const getAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const topProviders = await ServiceProvider.find()
      .sort({ rating: -1 })
      .limit(5)
      .select("user services rating totalReviews");

    res.status(200).json({
      totalBookings,
      topProviders,
    });
  } catch (err) {
    console.error("Analytics error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
