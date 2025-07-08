import User from "../models/User.js";
import Booking from "../models/Booking.js";
import ServiceProvider from "../models/ServiceProvider.js";
import Review from "../models/Review.js";
import jwt from "jsonwebtoken";
import auth from "../middlewares/Auth.js";

// 🔐 Login Pages
export const renderAdminLogin = (req, res) => {
  res.render("login", { error: null });
};

export const handleAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res.render("login", { error: "Invalid credentials" });
    }

    const isMatch = await auth.matchPassword(password, admin.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    req.session.token = token;
    res.redirect("/admin");
  } catch (err) {
    console.error("Admin login error:", err.message);
    res.render("login", { error: "Something went wrong. Try again." });
  }
};

// 🔘 Dashboard
export const renderAdminDashboard = async (req, res) => {
  try {
    const token = req.session.token;
    if (!token) return res.redirect("/admin/login");

    const totalBookings = await Booking.countDocuments();
    const activeUsers = await User.countDocuments({ isBlocked: false });

    const revenueResult = await Booking.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const revenue = revenueResult[0]?.total || 0;

    const topProviders = await ServiceProvider.find()
      .sort({ rating: -1 })
      .limit(5)
      .populate("user", "name email");

    res.render("admin", {
      totalBookings,
      activeUsers,
      revenue,
      topProviders,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err.message);
    res.status(500).send("Server Error");
  }
};

export const adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err.message);
      return res.status(500).send("Logout failed");
    }
    res.redirect("/admin/login");
  });
};

// 🧑‍💼 Users (Customers+providers)
export const renderUserList = async (req, res) => {
  try {
    const { search, role, page = 1 } = req.query;
    const limit = 10;
    const currentPage = parseInt(page) || 1;

    const query = { role: { $ne: "admin" } };

    if (role && role !== "all") {
      query.role = role;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ name: regex }, { email: regex }];
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    users.forEach((u) => {
      u.initial = u.name ? u.name.charAt(0).toUpperCase() : "U";
    });

    const totalPages = Math.ceil(totalUsers / limit);

    res.render("users", {
      users,
      search: search || "",
      selectedRole: role || "all",
      totalUsers,
      totalPages,
      currentPage,
      limit,
    });
  } catch (err) {
    console.error("User fetch error:", err.message);
    res.status(500).send("Server Error");
  }
};

// ✅ Render single user page
export const renderUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean({ virtuals: true });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.profileImage = user.profilePic
      ? `/uploads/profilePics/${user.profilePic}`
      : "/uploads/profilePics/default.png";

    res.render("userDetail", { user });
  } catch (err) {
    console.error("Render user detail error:", err.message);
    res.status(500).send("Server Error");
  }
};

// ✅ Render add user page
export const renderAddUserPage = (req, res) => {
  res.render("addUser", { error: null });
};

// ✅ Handle add user
export const handleAddUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Don’t allow adding admin from this UI
    if (role === "admin") {
      return res.render("addUser", {
        error: "Creating admin accounts is not allowed via this form.",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.render("addUser", { error: "Email already exists." });
    }

    const hashedPassword = await auth.hashedPassword(password);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.redirect("/admin/users");
  } catch (err) {
    console.error("Add user error:", err.message);
    res.render("addUser", { error: "Something went wrong." });
  }
};

// 🔗 Bookings
export const renderBookingList = async (req, res) => {
  try {
    const { search, status } = req.query;
    let bookings = await Booking.find()
      .populate("userId", "name email")
      .populate({
        path: "providerId",
        populate: { path: "user", select: "name email" },
      });

    if (status && status !== "all") {
      bookings = bookings.filter((b) => b.status === status);
    }

    if (search) {
      const regex = new RegExp(search, "i");
      bookings = bookings.filter(
        (b) =>
          regex.test(b.userId?.name) ||
          regex.test(b.userId?.email) ||
          regex.test(b.providerId?.user?.name) ||
          regex.test(b.providerId?.user?.email)
      );
    }

    res.render("booking", {
      bookings,
      search,
      selectedStatus: status || "all",
    });
  } catch (err) {
    console.error("Booking fetch error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).send("Booking not found");

    booking.status = status;
    await booking.save();

    res.redirect("/admin/bookings");
  } catch (err) {
    console.error("Booking status update error:", err.message);
    res.status(500).send("Server Error");
  }
};

// ⭐ Reviews
export const renderReviewList = async (req, res) => {
  try {
    const { search, rating } = req.query;

    let reviews = await Review.find()
      .populate("userId", "name email")
      .populate({
        path: "providerId",
        populate: { path: "user", select: "name email" },
      });

    if (rating && rating !== "all") {
      reviews = reviews.filter((r) => r.rating === parseInt(rating));
    }

    if (search) {
      const regex = new RegExp(search, "i");
      reviews = reviews.filter(
        (r) =>
          regex.test(r.userId?.name) ||
          regex.test(r.userId?.email) ||
          regex.test(r.providerId?.user?.name) ||
          regex.test(r.providerId?.user?.email)
      );
    }

    res.render("review", {
      reviews,
      search,
      selectedRating: rating || "all",
    });
  } catch (err) {
    console.error("Review fetch error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.redirect("/admin/reviews");
  } catch (err) {
    console.error("Review delete error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Toggle user block/unblock
export const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.role === "admin") {
      return res.status(403).send("Admins cannot be blocked.");
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.redirect("/admin/users");
  } catch (err) {
    console.error("Toggle block user error:", err.message);
    res.status(500).send("Server Error");
  }
};
