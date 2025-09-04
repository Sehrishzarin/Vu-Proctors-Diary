import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify any logged-in user
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied, no token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log("Decoded user:", req.user);
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Verify admin specifically
export const verifyAdmin = (req, res, next) => {
  if (req.user?.role?.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only route" });
  }
};
