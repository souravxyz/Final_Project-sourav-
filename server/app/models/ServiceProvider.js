import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    services: [String], // e.g., ["plumber", "electrician"]
    location: {
      type: String,
      required: true,
    },
    availability: [
      {
        day: String, // e.g., "Monday"
        slots: [{ from: String, to: String }],
      },
    ],
    bio: String,
    rating: {
      type: Number,
      default: 0,
    },
    charges: {
      type: Number,
      required: true,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);
export default ServiceProvider;
