import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Apply protect & adminOnly middleware to all admin routes
router.use(protect);
router.use(adminOnly);

// @route   GET /api/admin/users
// @desc    Get list of all registered users
// @access  Private/Admin
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching user database" });
  }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics for admin mentors
// @access  Private/Admin
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    res.json({
      totalUsers,
      totalAdmins,
      regularUsers,
      mentors: [
        "Ratnakar (Cybersecurity Lead)",
        "Sahith Akula (Backend Lead)",
        "Manoj Kumar (Backend & Marketing Lead)",
        "Pandu Ranga (Frontend & UI Lead)"
      ],
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

export default router;
