import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

// Provider dashboard analytics
router.get("/", auth.AuthCheck, auth.roleCheck("provider"), getAnalytics);

export default router;
