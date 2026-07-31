import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    hostName: { type: String, required: true },
    hostUsername: { type: String, required: true },
    roomId: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Call", callSchema);
