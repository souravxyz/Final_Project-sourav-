import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authHelper from "../middlewares/Auth.js";
import welcomeEmail from "../utils/templates/welcomeEmail.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import forgotPasswordEmail from "../utils/templates/forgotPasswordEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const profilePic = req.file?.filename;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPass = await authHelper.hashedPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      role,
      profilePic,
    });
    // 📧 Send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to ServeHub 🎉",
      html: welcomeEmail(name),
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await authHelper.matchPassword(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 👤 Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// edit profile
export const editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const profilePic = req.file?.filename;

    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(profilePic && { profilePic }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// reset pass
export const resetPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await authHelper.matchPassword(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    const hashedPassword = await authHelper.hashedPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// forget pass
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found in our system" });
    }

    // 1. Generate a random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 2. Hash the token to store in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 3. Save token and expiry to user document
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // 4. Build reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 5. Send email
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password - ServeHub",
      html: forgotPasswordEmail(user.name, resetLink),
    });

    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (err) {
    console.error("Forget password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//reset with token
export const resetPasswordWithToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token is invalid or has expired.",
      });
    }

    user.password = await authHelper.hashedPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully. You can now log in.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
