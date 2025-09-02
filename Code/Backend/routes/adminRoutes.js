// routes/adminRoutes.js
import express from "express";
import { getPendingUsers, approveUser, rejectUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/pending", getPendingUsers);      // GET all users waiting for approval
router.patch("/approve/:id", approveUser);    // PATCH approve user
router.delete("/reject/:id", rejectUser);     // DELETE reject user

export default router;
