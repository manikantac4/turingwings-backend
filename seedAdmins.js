import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedAdmins = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 15000,
    });
    console.log("Connected to MongoDB successfully!");

    // Delete old admin accounts to ensure clean professional usernames
    await User.deleteMany({ role: "admin" });
    console.log("🧹 Deleted old admin accounts from MongoDB.");

    const adminAccounts = [
      {
        name: "Ratnakar Karasala",
        username: "ratnakar.karasala",
        email: "ratnakar.karasala@turingwings.org",
        password: "Ratnakar@2026",
        role: "admin",
      },
      {
        name: "Sahith Akula",
        username: "sahith.akula",
        email: "sahith.akula@turingwings.org",
        password: "Sahith@2026",
        role: "admin",
      },
      {
        name: "Manoj Kumar Allu",
        username: "manoj.allu",
        email: "manoj.allu@turingwings.org",
        password: "Manoj@2026",
        role: "admin",
      },
      {
        name: "Pandu Ranga Tummuri",
        username: "pandu.tummuri",
        email: "pandu.tummuri@turingwings.org",
        password: "Pandu@2026",
        role: "admin",
      },
    ];

    for (const admin of adminAccounts) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);

      await User.create({
        ...admin,
        password: hashedPassword,
      });
      console.log(`✅ Professional Admin Account Created: ${admin.name} (Username: ${admin.username})`);
    }

    console.log("🎉 Professional Admin Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin accounts:", error);
    process.exit(1);
  }
};

seedAdmins();
