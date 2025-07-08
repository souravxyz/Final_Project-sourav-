import Booking from "../models/Booking.js";
import ServiceProvider from "../models/ServiceProvider.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import {
  customerBookingEmail,
  providerBookingEmail,
} from "../utils/templates/bookingEmails.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, providerId, service, date, time } = req.body;

    // Check for time-slot clash
    const exists = await Booking.findOne({
      providerId,
      date,
      time,
      status: { $ne: "cancelled" },
    });

    if (exists) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // Get provider info
    const provider = await ServiceProvider.findById(providerId).populate(
      "user",
      "name email"
    );
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const price = provider.charges;

    // Create booking
    const booking = await Booking.create({
      userId,
      providerId,
      service,
      date,
      time,
      price,
    });

    // Get customer info
    const customer = await User.findById(userId);

    // Send confirmation email to customer
    await sendEmail({
      to: customer.email,
      subject: "Booking Confirmed – ServeHub",
      html: customerBookingEmail({
        name: customer.name,
        service,
        date,
        time,
        providerName: provider.user.name,
      }),
    });

    // Send notification email to provider
    await sendEmail({
      to: provider.user.email,
      subject: "New Booking Request – ServeHub",
      html: providerBookingEmail({
        name: provider.user.name,
        service,
        date,
        time,
        customerName: customer.name,
      }),
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Select booked slots for a provider on a specific date
export const getBookedSlots = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const bookings = await Booking.find({
      providerId,
      date,
      status: { $ne: "cancelled" },
    });

    const bookedSlots = bookings.map((b) => b.time);

    res.status(200).json({ bookedSlots });
  } catch (err) {
    console.error("Error fetching booked slots:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get all bookings by a customer (user)
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0; // 0 = no limit

    const query = Booking.find({ userId })
      .sort({ date: -1, time: -1 })
      // Alternative if you prefer createdAt:
      // .sort({ createdAt: -1 })
      .populate({
        path: "providerId",
        select: "user services location charges",
        populate: {
          path: "user",
          select: "name profilePic",
        },
      });

    if (limit > 0) {
      query.skip((page - 1) * limit).limit(limit);
    }

    const bookings = await query;

    res.status(200).json(bookings);
  } catch (err) {
    console.error("User Booking Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get all bookings for a provider
export const getBookingsByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;

    const query = Booking.find({ providerId })
      .sort({ date: -1, time: -1 })
      // Alternative if you prefer createdAt:
      // .sort({ createdAt: -1 })
      .populate("userId", "name profilePic");

    if (limit > 0) {
      query.skip((page - 1) * limit).limit(limit);
    }

    const bookings = await query;

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Provider Booking Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update booking status (confirm, cancel, complete)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const validStatuses = ["confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: `Booking marked as ${status}`, updated });
  } catch (err) {
    console.error("Booking status update error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
