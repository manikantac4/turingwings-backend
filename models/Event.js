import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    status: { type: String, enum: ["upcoming", "live", "completed"], default: "upcoming" },
    tagline: { type: String },
    mode: { type: String, default: "Hybrid (Discord & Campus Lab)" },
    venue: { type: String, default: "Turing Wings Innovation HQ" },
    startDate: { type: String },
    endDate: { type: String },
    lead: { type: String, default: "Turing Wings Team" },
    description: { type: String },
    
    tracks: [
      {
        title: String,
        desc: String,
        icon: String,
        prizePool: String,
        tags: [String],
      },
    ],

    timeline: [
      {
        time: String,
        title: String,
        desc: String,
        isMilestone: Boolean,
      },
    ],

    prizes: [
      {
        place: String,
        amount: String,
        perks: String,
      },
    ],

    mentors: [
      {
        name: String,
        role: String,
        company: String,
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    registrationUrl: { type: String, default: "/register" },
    liveStreamUrl: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
