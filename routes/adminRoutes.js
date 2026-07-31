import express from "express";
import User from "../models/User.js";
import Call from "../models/Call.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Public online status endpoint for real-time presence sync
router.get("/online-mentors", async (req, res) => {
  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    const mentors = await User.find({
      role: "admin",
      lastActive: { $gte: threeMinutesAgo },
    }).select("-password");

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching online presence" });
  }
});

// Pulse heartbeat presence
router.post("/heartbeat", async (req, res) => {
  try {
    const { username } = req.body;
    if (username) {
      await User.findOneAndUpdate(
        { username: username.toLowerCase() },
        { isOnline: true, lastActive: new Date() }
      );
    }
    res.json({ status: "ACK" });
  } catch (error) {
    res.status(500).json({ message: "Heartbeat failure" });
  }
});

// GET active meeting calls for logged-in mentors
router.get("/calls", async (req, res) => {
  try {
    const activeCalls = await Call.find({ active: true }).sort({ createdAt: -1 });
    res.json(activeCalls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active calls" });
  }
});

// POST start active meeting call
router.post("/calls", async (req, res) => {
  try {
    const { hostName, hostUsername, roomId } = req.body;
    // Deactivate previous calls by host
    await Call.updateMany({ hostUsername }, { active: false });

    const newCall = await Call.create({ hostName, hostUsername, roomId, active: true });
    res.json(newCall);
  } catch (error) {
    res.status(500).json({ message: "Error starting call" });
  }
});

// POST end active meeting call
router.post("/calls/end", async (req, res) => {
  try {
    const { hostUsername, roomId } = req.body;
    await Call.updateMany({ $or: [{ hostUsername }, { roomId }] }, { active: false });
    res.json({ status: "ENDED" });
  } catch (error) {
    res.status(500).json({ message: "Error ending call" });
  }
});

// Apply protect & adminOnly middleware to secure admin routes below
router.use(protect);
router.use(adminOnly);

// @route   GET /api/admin/users
// @desc    Get list of all registered users
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
