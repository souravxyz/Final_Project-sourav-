// middlewares/auth.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async (password, existingPass) => {
  return await bcrypt.compare(password, existingPass);
};

// 🛡️ Token Verification Middleware
const AuthCheck = (req, res, next) => {
  let token;

  // Check for Bearer token or session token
  const header = req.headers["authorization"];
  if (header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  } else if (req.session?.token) {
    token = req.session.token;
  }

  if (!token) {
    // If EJS admin route, redirect
    if (req.originalUrl.startsWith("/admin")) {
      return res.redirect("/admin/login");
    }

    return res.status(401).json({
      status: false,
      message: "Unauthorized: Token required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);

    // If EJS admin route, redirect
    if (req.originalUrl.startsWith("/admin")) {
      return res.redirect("/admin/login");
    }

    return res.status(401).json({ status: false, message: "Invalid Token" });
  }
};

// 🎭 Role-based Access Control
const roleCheck = (roles = []) => {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      // Handle admin view separately
      if (req.originalUrl.startsWith("/admin")) {
        return res.redirect("/admin/login");
      }

      return res
        .status(403)
        .json({ status: false, message: "Access Denied: Role mismatch" });
    }
    next();
  };
};

export default { hashedPassword, matchPassword, AuthCheck, roleCheck };
