import express from "express";
import {
  createOrUpdateProviderProfile,
  getAllProviders,
  getProviderById,
  getProviderByUserId,
} from "../controllers/providerController.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

router.get("/", getAllProviders); // GET /api/providers
router.get("/user/:userId", getProviderByUserId);

router.get("/:id", getProviderById);

router.post(
  "/",
  Auth.AuthCheck,
  Auth.roleCheck("provider"),
  createOrUpdateProviderProfile
);

export default router;
