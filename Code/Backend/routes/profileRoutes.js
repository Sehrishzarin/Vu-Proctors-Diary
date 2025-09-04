import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, updateProfile);

export default router;
