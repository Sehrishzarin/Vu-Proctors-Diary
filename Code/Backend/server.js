import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());                        // <--- THIS LINE IS KEY
app.use(express.urlencoded({ extended: true }));// <--- helps with form-data

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
