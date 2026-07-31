import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// GET all chat messages from MongoDB Atlas
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chat messages", error: err.message });
  }
});

// POST new chat message to MongoDB Atlas
router.post("/", async (req, res) => {
  try {
    const newMessage = new Message({
      sender: req.body.sender || "Lead Mentor",
      role: req.body.role || "Lead Mentor",
      text: req.body.text || "",
      sticker: req.body.sticker || "",
      fileName: req.body.fileName || "",
      fileSize: req.body.fileSize || "",
      fileType: req.body.fileType || "",
      fileData: req.body.fileData || "",
      type: req.body.type || "text",
      isMe: req.body.isMe ?? true,
      read: req.body.read ?? false,
      time: req.body.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save message", error: err.message });
  }
});

// Mark all messages as read
router.post("/read", async (req, res) => {
  try {
    await Message.updateMany({ read: false }, { read: true });
    res.json({ message: "All messages marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark read", error: err.message });
  }
});

export default router;
