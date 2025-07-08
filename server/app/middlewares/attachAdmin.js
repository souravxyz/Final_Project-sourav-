import jwt from "jsonwebtoken";
import User from "../models/User.js";


const attachAdmin = async (req, res, next) => {
  try {
    const token = req.session?.token;
    if (!token) {
      res.locals.admin = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await User.findById(decoded.id).select("name email profilePic role");

    if (admin && admin.role === "admin") {
      res.locals.admin = admin; // 🎯 Now available in all EJS views
    } else {
      res.locals.admin = null;
    }

    next();
  } catch (err) {
    console.error("AttachAdmin middleware error:", err.message);
    res.locals.admin = null;
    next();
  }
};

export default attachAdmin;
