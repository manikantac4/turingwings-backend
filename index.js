import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://panduranga1797_db_user:rr2tjNoUlwPwDi3r@cluster0.elmfhz5.mongodb.net/turingwings?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "ONLINE",
    message: "Turing Wings Node.js + Express API Server",
    database: "MongoDB Atlas Connected",
  });
});

// Auto-seed Mentor Admins on server boot if missing
const autoSeedAdmins = async () => {
  try {
    const adminAccounts = [
      { name: "Ratnakar", username: "ratnakar", email: "ratnakar@turingwings.org", password: "Ratnakar@2026" },
      { name: "Sahith Akula", username: "sahith", email: "sahith.akula@turingwings.org", password: "Sahith@2026" },
      { name: "Manoj Kumar", username: "manoj", email: "manoj.kumar@turingwings.org", password: "Manoj@2026" },
      { name: "Pandu Ranga", username: "panduranga", email: "pandu.ranga@turingwings.org", password: "Pandu@2026" },
    ];

    for (const admin of adminAccounts) {
      const existing = await User.findOne({ username: admin.username });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin.password, salt);
        await User.create({
          name: admin.name,
          username: admin.username,
          email: admin.email,
          password: hashedPassword,
          role: "admin",
        });
        console.log(`✅ Auto-seeded Admin: ${admin.name} (${admin.username})`);
      }
    }
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
};

// Connect to MongoDB Atlas & start Express Server
const mongooseOptions = {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 15000,
};

mongoose
  .connect(MONGO_URI, mongooseOptions)
  .then(async () => {
    console.log("==========================================");
    console.log("🌿 Connected to MongoDB Atlas Successfully");
    console.log("==========================================");
    await autoSeedAdmins();
    app.listen(PORT, () => {
      console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failure:", err.message);
    console.log("⚠️ Starting Express Server on http://localhost:5000 (Check MongoDB Atlas IP Whitelist '0.0.0.0/0')");
    app.listen(PORT, () => {
      console.log(`🚀 Express Server running in standalone mode on http://localhost:${PORT}`);
    });
  });
