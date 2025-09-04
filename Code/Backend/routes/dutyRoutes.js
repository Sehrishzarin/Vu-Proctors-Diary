import express from "express";
import { assignDuty, getMyDuties } from "../controllers/dutyController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin can assign duty
router.post("/", verifyToken, verifyAdmin, assignDuty);

// Logged-in users (superintendent/invigilator) view their own duties
router.get("/me", verifyToken, getMyDuties);

export default router;
