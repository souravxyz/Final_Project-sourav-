import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },
    profilePic: { type: String, default: "" },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    // 🔐 Password Reset Token Fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },

  { timestamps: true }
);

// ✅ Virtual for initial
userSchema.virtual("initial").get(function () {
  return this.name ? this.name.charAt(0).toUpperCase() : "U";
});

const User = mongoose.model("User", userSchema);
export default User;
