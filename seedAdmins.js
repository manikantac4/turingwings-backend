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

    const adminAccounts = [
      {
        name: "Ratnakar",
        username: "ratnakar",
        email: "ratnakar@turingwings.org",
        password: "Ratnakar@2026",
        role: "admin",
      },
      {
        name: "Sahith Akula",
        username: "sahith",
        email: "sahith.akula@turingwings.org",
        password: "Sahith@2026",
        role: "admin",
      },
      {
        name: "Manoj Kumar",
        username: "manoj",
        email: "manoj.kumar@turingwings.org",
        password: "Manoj@2026",
        role: "admin",
      },
      {
        name: "Pandu Ranga",
        username: "panduranga",
        email: "pandu.ranga@turingwings.org",
        password: "Pandu@2026",
        role: "admin",
      },
    ];

    for (const admin of adminAccounts) {
      const existingUser = await User.findOne({
        $or: [{ username: admin.username }, { email: admin.email }],
      });

      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin.password, salt);

        await User.create({
          ...admin,
          password: hashedPassword,
        });
        console.log(`✅ Admin account created for ${admin.name} (${admin.username})`);
      } else {
        console.log(`ℹ️ Admin account already exists for ${admin.name} (${admin.username})`);
      }
    }

    console.log("🎉 Admin seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin accounts:", error);
    process.exit(1);
  }
};

seedAdmins();
