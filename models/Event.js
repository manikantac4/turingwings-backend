import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  icon: String,
  description: String,
  banner: String,
});

const PrizeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reward: String,
  category: String,
  cashAmount: Number,
  swag: String,
  icon: String,
});

const PersonSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  photo: String,
  company: String,
  designation: String,
  expertise: String,
  bio: String,
  linkedin: String,
});

const SponsorSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  logo: String,
  website: String,
  description: String,
  tier: { type: String, default: "Gold" },
});

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: "General" },
});

const CustomQuestionSchema = new mongoose.Schema({
  id: String,
  question: { type: String, required: true },
  type: { type: String, default: "text" }, // text, textarea, select, checkbox
  options: [String],
  required: { type: Boolean, default: false },
});

const EventRegistrationSchema = new mongoose.Schema({
  userId: String,
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  college: String,
  department: String,
  year: String,
  teamName: String,
  teamMembers: [
    {
      name: String,
      email: String,
      role: String,
    },
  ],
  customAnswers: mongoose.Schema.Types.Mixed,
  registeredAt: { type: Date, default: Date.now },
  status: { type: String, default: "Approved" }, // Pending, Approved, Waitlisted
});

const EventSchema = new mongoose.Schema(
  {
    // 1. Basic Information
    name: { type: String, required: true },
    shortName: String,
    slug: { type: String, required: true, unique: true },
    type: { type: String, default: "Hackathon" }, // Hackathon, Ideathon, Buildathon, Workshop, Bootcamp, Coding Contest, Startup Challenge
    theme: String,
    tagline: String,
    shortDescription: String,
    fullDescription: String,
    objectives: [String],
    vision: String,
    expectedOutcomes: [String],
    status: { type: String, default: "Published" }, // Draft, Published, Archived

    // 2. Branding
    logo: String,
    heroBanner: String,
    heroBackground: String,
    thumbnail: String,
    socialShareImage: String,
    galleryImages: [String],
    introVideo: String,
    promoVideo: String,
    brandColors: {
      primary: { type: String, default: "#d97706" },
      secondary: { type: String, default: "#0f172a" },
      accent: { type: String, default: "#f59e0b" },
    },
    fontSelection: String,

    // 3. Template & Design
    templateId: { type: String, default: "ai-future" }, // ai-future, cyberpunk, space, corporate, premium-3d, minimal
    backgroundStyle: { type: String, default: "particles" }, // static, gradient, particles, threejs, spline
    themeSettings: mongoose.Schema.Types.Mixed,

    // 4. Schedule & Timeline
    schedule: {
      registrationOpen: Date,
      registrationClose: Date,
      teamFormationDeadline: Date,
      orientationDate: Date,
      eventStart: Date,
      problemRevealDate: Date,
      mentorSessionDate: Date,
      midEvalDate: Date,
      submissionDeadline: Date,
      presentationRoundDate: Date,
      winnerAnnouncementDate: Date,
      certificateReleaseDate: Date,
    },

    // 5. Registration Configuration
    registrationConfig: {
      registrationType: { type: String, default: "Team" }, // Individual, Team
      minTeamSize: { type: Number, default: 1 },
      maxTeamSize: { type: Number, default: 4 },
      approvalType: { type: String, default: "Auto" }, // Auto, Manual
      capacity: { type: Number, default: 500 },
      waitlistEnabled: { type: Boolean, default: true },
    },

    // 6. Registration Form Custom Questions
    customQuestions: [CustomQuestionSchema],

    // 7. Eligibility
    eligibility: {
      category: { type: String, default: "Open for All" }, // Student, Professional, Open for All
      collegeRestrictions: String,
      graduationYears: [String],
      ageLimit: String,
    },

    // 8. Tracks
    tracks: [TrackSchema],

    // 9. Rules
    rules: {
      generalRules: [String],
      teamRules: [String],
      submissionRules: [String],
      evaluationRules: [String],
      codeOfConduct: String,
      plagiarismPolicy: String,
      disqualificationRules: [String],
    },

    // 10. Prizes
    prizes: [PrizeSchema],

    // 11. Judges & 12. Mentors
    judges: [PersonSchema],
    mentors: [PersonSchema],

    // 13. Sponsors
    sponsors: [SponsorSchema],

    // 14. FAQs
    faqs: [FAQSchema],

    // 15. Contact
    contact: {
      coordinatorName: String,
      coordinatorEmail: String,
      coordinatorPhone: String,
      supportEmail: String,
      technicalContact: String,
      emergencyContact: String,
      discord: String,
      whatsapp: String,
      telegram: String,
    },

    // 16. Venue
    venue: {
      type: { type: String, default: "Online" }, // Online, Offline, Hybrid
      name: String,
      address: String,
      googleMapsUrl: String,
      hallDetails: String,
    },

    // 17. Live Event Features
    liveSettings: {
      enableLiveDashboard: { type: Boolean, default: true },
      enableLeaderboard: { type: Boolean, default: true },
      enableAnnouncements: { type: Boolean, default: true },
      enableCountdown: { type: Boolean, default: true },
      enableChat: { type: Boolean, default: true },
      enableClarifications: { type: Boolean, default: true },
      enableNotifications: { type: Boolean, default: true },
      enableProblemReveal: { type: Boolean, default: true },
      enableSubmissionPortal: { type: Boolean, default: true },
      enableResults: { type: Boolean, default: true },
    },

    // 18. Submission Settings
    submissionSettings: {
      allowedTypes: { type: [String], default: ["GitHub", "ZIP", "PDF", "Video", "Website URL"] },
      maxFileSizeMb: { type: Number, default: 50 },
      deadline: Date,
      allowResubmission: { type: Boolean, default: true },
      maxAttempts: { type: Number, default: 5 },
    },

    // 19. Evaluation & Criteria
    evaluation: {
      rounds: { type: [String], default: ["Round 1: Screening", "Round 2: Mid-Eval", "Round 3: Grand Finale"] },
      criteria: { type: [String], default: ["Innovation", "Technical Complexity", "UI/UX", "Impact", "Presentation"] },
    },

    // 20. Certificates & 21. Notifications
    certificates: {
      templateId: { type: String, default: "standard_gold" },
      releaseDate: Date,
    },

    // 22. SEO & Visibility
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: String,
      visibility: { type: String, default: "Public" }, // Public, Private, Invite Only
    },

    // Registrations List
    registrations: [EventRegistrationSchema],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
