import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    role: { type: String, default: "Lead Mentor" },
    text: { type: String, default: "" },
    sticker: { type: String, default: "" },
    fileName: { type: String, default: "" },
    fileSize: { type: String, default: "" },
    fileType: { type: String, default: "" },
    fileData: { type: String, default: "" },
    type: { type: String, default: "text" }, // text, sticker, image, document
    isMe: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    time: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
