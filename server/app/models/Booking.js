import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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
    service: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
