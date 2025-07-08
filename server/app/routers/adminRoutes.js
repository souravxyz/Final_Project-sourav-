import express from "express";
import {
  renderAdminDashboard,
  renderAdminLogin,
  handleAdminLogin,
  adminLogout,
  renderUserList,
  renderReviewList,
  renderBookingList,
  toggleBlockUser,
  updateBookingStatus,
  deleteReview,
  renderAddUserPage,
  renderUserDetails,
  handleAddUser,
} from "../controllers/adminController.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

// Login Routes
router.get("/login", renderAdminLogin);
router.post("/login", handleAdminLogin);

// Dashboard
router.get("/", Auth.AuthCheck, Auth.roleCheck("admin"), renderAdminDashboard);

// routes/adminRoutes.js
router.get("/users", Auth.AuthCheck, Auth.roleCheck("admin"), renderUserList);
 //block users
router.post(
  "/users/:id/toggle-block",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  toggleBlockUser
);
// ✅ Add User page
router.get(
  "/add-user",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  renderAddUserPage
);
//create user
router.post(
  "/add-user",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  handleAddUser
);

// ✅ Single User Detail page
router.get(
  "/users/:id",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  renderUserDetails
);
// Bookings
router.get(
  "/bookings",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  renderBookingList
);
//update booking
router.post(
  "/bookings/:id/status",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  updateBookingStatus
);

// Reviews
router.get(
  "/reviews",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  renderReviewList
);

//delete review
router.post(
  "/reviews/:id/delete",
  Auth.AuthCheck,
  Auth.roleCheck("admin"),
  deleteReview
);

// Logout
router.get("/logout", adminLogout);

export default router;
