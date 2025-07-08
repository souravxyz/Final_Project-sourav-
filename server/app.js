//swagger
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));

//other imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import flash from "connect-flash";
import authRoutes from "./app/routers/authRoutes.js";
import providerRoutes from "./app/routers/providerRoutes.js";
import bookingRoutes from "./app/routers/bookingRoutes.js";
import reviewRoutes from "./app/routers/reviewRoutes.js";
import analyticsRoutes from "./app/routers/analyticsRoutes.js";
import adminRoutes from "./app/routers/adminRoutes.js";

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files (for profile pictures, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import session from "express-session";
import attachAdmin from "./app/middlewares/attachAdmin.js";
app.use(attachAdmin);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "adminSecret",
    resave: false,
    saveUninitialized: false,
  })
);
// Flash messages middleware
app.use(flash());

// 🔥 Make flash messages available in all EJS templates
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
app.set("view engine", "ejs");
app.set("views", "views");
//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/analytics", analyticsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
