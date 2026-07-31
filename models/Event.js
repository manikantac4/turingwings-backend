import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, required: true },
    eventType: {
      type: String,
      enum: [
        "Buildathon",
        "Hackathon",
        "Ideathon",
        "AI Challenge",
        "Coding Contest",
        "Designathon",
        "Startup Challenge",
        "Workshop",
        "Bootcamp",
        "Webinar",
        "Custom Event",
      ],
      default: "Buildathon",
    },
    mode: { type: String, enum: ["Online", "Offline", "Hybrid"], default: "Online" },
    status: {
      type: String,
      enum: [
        "Draft",
        "Registration Open",
        "Registration Closed",
        "Live Event",
        "Judging",
        "Results Published",
        "Archived",
      ],
      default: "Registration Open",
    },
    templateId: {
      type: String,
      enum: [
        "ai-future",
        "cyberpunk-neon",
        "space-galaxy",
        "corporate-blue",
        "university-minimal",
        "gaming-rgb",
        "gradient-modern",
        "minimal-white",
        "saas-startup",
        "premium-3d",
      ],
      default: "ai-future",
    },
    backgroundMode: {
      type: String,
      enum: ["Static", "Gradient", "Particles", "Geometric", "Canvas"],
      default: "Gradient",
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    prizePool: { type: String, default: "$10,000 USD" },
    venue: { type: String, default: "Turing Wings Virtual Portal" },
    bannerUrl: { type: String, default: "" },
    description: { type: String, required: true },
    
    // Structured Configurable Sections
    about: { type: String, default: "" },
    benefits: [{ type: String }],
    tracks: [
      {
        id: String,
        title: String,
        description: String,
        prize: String,
      },
    ],
    timeline: [
      {
        id: String,
        stage: String,
        date: String,
        description: String,
      },
    ],
    eligibility: [{ type: String }],
    rules: [{ type: String }],
    judges: [
      {
        name: String,
        role: String,
        company: String,
        avatar: String,
        linkedIn: String,
      },
    ],
    mentors: [
      {
        name: String,
        role: String,
        company: String,
        avatar: String,
        linkedIn: String,
      },
    ],
    sponsors: [
      {
        name: String,
        tier: String,
        logo: String,
        website: String,
      },
    ],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    
    // Registration Rules
    registrationConfig: {
      allowIndividual: { type: Boolean, default: true },
      allowTeam: { type: Boolean, default: true },
      minTeamSize: { type: Number, default: 1 },
      maxTeamSize: { type: Number, default: 4 },
      requireResume: { type: Boolean, default: false },
      requireGitHub: { type: Boolean, default: true },
      requireLinkedIn: { type: Boolean, default: false },
    },
    
    // Participants & Analytics
    participants: [
      {
        name: String,
        email: String,
        role: String,
        teamName: String,
        github: String,
        registeredAt: { type: Date, default: Date.now },
      },
    ],
    analytics: {
      registrationsCount: { type: Number, default: 0 },
      teamsCount: { type: Number, default: 0 },
      viewsCount: { type: Number, default: 0 },
    },
    
    createdBy: { type: String, default: "Lead Mentor Admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
