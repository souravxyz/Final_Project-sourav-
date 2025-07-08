import express from "express";
import {
  editProfile,
  forgetPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  resetPasswordWithToken,
} from "../controllers/authController.js";
import upload from "../middlewares/upload.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);
router.get("/logout", logout); // optional
router.get("/profile", Auth.AuthCheck, getProfile);

router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPasswordWithToken);

router.patch("/reset-password", Auth.AuthCheck, resetPassword);

router.patch(
  "/profile",
  Auth.AuthCheck,
  upload.single("profilePic"),
  editProfile
);
export default router;
