import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    // 1. Basic Information
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    eventType: {
      type: String,
      enum: [
        "Buildathon", "Hackathon", "Ideathon", "AI Challenge", "Coding Contest",
        "Designathon", "Startup Challenge", "Workshop", "Bootcamp", "Webinar",
        "Masterclass", "Conference", "Custom Event"
      ],
      default: "Buildathon",
    },
    theme: { type: String, default: "Artificial Intelligence & Spatial Systems" },
    tagline: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, default: "" },
    eventObjectives: [{ type: String }],
    eventHighlights: [{ type: String }],
    eventStatus: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Published",
    },

    // Selected Presentation Template Theme
    templateId: {
      type: String,
      enum: [
        "ai-future", "cyberpunk-neon", "space-odyssey", "corporate-pro",
        "university-campus", "gaming-arena", "modern-saas", "minimal-premium",
        "creative-innovation", "premium-3d"
      ],
      default: "ai-future",
    },

    // 2. Event Schedule
    schedule: {
      regStartDate: { type: String, default: "" },
      regEndDate: { type: String, default: "" },
      eventStartDate: { type: String, default: "" },
      eventEndDate: { type: String, default: "" },
      orientationDate: { type: String, default: "" },
      problemReleaseTime: { type: String, default: "" },
      submissionDeadline: { type: String, default: "" },
      evaluationPeriod: { type: String, default: "" },
      resultsDate: { type: String, default: "" },
      certificateReleaseDate: { type: String, default: "" },
    },

    // 3. Registration Details
    registrationDetails: {
      registrationType: { type: String, enum: ["Individual", "Team", "Both"], default: "Both" },
      minTeamSize: { type: Number, default: 1 },
      maxTeamSize: { type: Number, default: 4 },
      maxParticipants: { type: Number, default: 1000 },
      approvalType: { type: String, enum: ["Automatic", "Manual"], default: "Automatic" },
      registrationFee: { type: String, default: "Free" },
      waitlistEnabled: { type: Boolean, default: true },
      eligibilityCriteria: [{ type: String }],
    },

    // 4. Registration Form Fields Config
    formFieldsConfig: {
      requirePhone: { type: Boolean, default: true },
      requireCollege: { type: Boolean, default: true },
      requireDept: { type: Boolean, default: true },
      requireYear: { type: Boolean, default: border => true },
      requireGithub: { type: Boolean, default: true },
      requireLinkedin: { type: Boolean, default: false },
      requirePortfolio: { type: Boolean, default: false },
      requireResume: { type: Boolean, default: false },
      customQuestions: [{ type: String }],
    },

    // 5. Event Mode & Location
    mode: { type: String, enum: ["Online", "Offline", "Hybrid"], default: "Online" },
    offlineVenue: {
      venueName: { type: String, default: "" },
      address: { type: String, default: "" },
      googleMapsUrl: { type: String, default: "" },
    },
    onlineDetails: {
      meetingPlatform: { type: String, default: "Turing Wings Virtual Portal & Discord" },
      meetingLink: { type: String, default: "" },
      accessInstructions: { type: String, default: "Check dashboard post-registration" },
    },

    // 6. Tracks / Categories
    tracks: [
      {
        id: String,
        name: String,
        description: String,
        problemDomain: String,
        prize: String,
      },
    ],

    // 7. Rules & Guidelines
    rules: {
      generalRules: [{ type: String }],
      teamRules: [{ type: String }],
      submissionRules: [{ type: String }],
      codeOfConduct: { type: String, default: "Standard Turing Wings Code of Conduct applies." },
      plagiarismPolicy: { type: String, default: "Zero tolerance for plagiarized codebase submissions." },
      disqualificationCriteria: [{ type: String }],
    },

    // 8. Event Timeline Milestones
    timelineMilestones: [
      {
        id: String,
        milestoneName: String,
        date: String,
        time: String,
        description: String,
        status: { type: String, enum: ["Upcoming", "Active", "Completed"], default: "Upcoming" },
      },
    ],

    // 9. Problem Statements
    problemStatements: [
      {
        id: String,
        title: String,
        description: String,
        category: String,
        difficulty: { type: String, enum: ["Easy", "Medium", "Hard", "Expert"], default: "Hard" },
        attachmentUrl: String,
        releaseTime: String,
        visibility: { type: String, enum: ["Public", "Hidden until release"], default: "Public" },
      },
    ],

    // 10. Prizes & Rewards
    prizes: {
      prizePool: { type: String, default: "$10,000 USD" },
      winnerPrize: { type: String, default: "$5,000" },
      runnerUpPrize: { type: String, default: "$3,000" },
      secondRunnerUpPrize: { type: String, default: "$2,000" },
      trackAwards: [{ type: String }],
      specialAwards: [{ type: String }],
      perks: [{ type: String }],
    },

    // 11. Judges
    judges: [
      {
        id: String,
        name: String,
        designation: String,
        organization: String,
        bio: String,
        photo: String,
        linkedIn: String,
      },
    ],

    // 12. Mentors
    mentors: [
      {
        id: String,
        name: String,
        expertise: String,
        organization: String,
        bio: String,
        photo: String,
        contact: String,
      },
    ],

    // 13. Sponsors & Partners
    sponsors: [
      {
        id: String,
        name: String,
        tier: { type: String, enum: ["Title", "Gold", "Silver", "Bronze", "Community"], default: "Gold" },
        description: String,
        website: String,
        logo: String,
      },
    ],

    // 14. FAQs
    faqs: [
      {
        id: String,
        question: String,
        answer: String,
      },
    ],

    // 15. Contact Information
    contactInfo: {
      coordinatorName: { type: String, default: "Ratnakar Karasala & Lead Mentors" },
      email: { type: String, default: "buildathons@turingwings.org" },
      phone: { type: String, default: "+91 98765 43210" },
      techSupportContact: { type: String, default: "support@turingwings.org" },
      whatsAppUrl: { type: String, default: "" },
      discordUrl: { type: String, default: "https://discord.gg/turingwings" },
    },

    // 16. Submission Settings
    submissionSettings: {
      submissionTypes: [{ type: String }], // GitHub, ZIP, PDF, PPT, Video, URL, APK
      maxFileSizeMb: { type: Number, default: 50 },
      allowMultipleSubmissions: { type: Boolean, default: true },
      maxAttempts: { type: Number, default: 5 },
      lateSubmissionPolicy: { type: String, default: "No late submissions accepted after deadline" },
    },

    // 17. Evaluation
    evaluation: {
      roundsCount: { type: Number, default: 2 },
      criteria: [
        { name: String, weightage: Number, description: String }
      ],
      passingScore: { type: Number, default: 70 },
    },

    // 18. Announcements
    announcements: [
      {
        id: String,
        title: String,
        content: String,
        date: { type: Date, default: Date.now },
        category: { type: String, enum: ["General", "Reminder", "Schedule Update", "Important"], default: "General" }
      }
    ],

    // 19. Certificates
    certificateConfig: {
      available: { type: Boolean, default: true },
      types: [{ type: String }], // Participant, Winner, Mentor, Judge
      releaseDate: { type: String, default: "Post-event verification" }
    },

    // 20. Lifecycle & Visibility Access
    visibilityAccess: {
      accessType: { type: String, enum: ["Public", "Private", "Invite Only"], default: "Public" },
      registrationStatus: { type: String, enum: ["Open", "Closed"], default: "Open" },
      lifecycleState: {
        type: String,
        enum: ["Draft", "Registration Open", "Registration Closed", "Live Event", "Judging", "Results Published", "Archived"],
        default: "Registration Open"
      }
    },

    // Applicants & Submissions Storage
    participants: [
      {
        name: String,
        email: String,
        phone: String,
        college: String,
        department: String,
        year: String,
        github: String,
        linkedin: String,
        portfolio: String,
        teamName: String,
        role: String,
        registeredAt: { type: Date, default: Date.now }
      }
    ],

    submissions: [
      {
        teamName: String,
        projectName: String,
        githubUrl: String,
        demoVideoUrl: String,
        description: String,
        submittedAt: { type: Date, default: Date.now }
      }
    ],

    analytics: {
      registrationsCount: { type: Number, default: 0 },
      teamsCount: { type: Number, default: 0 },
      viewsCount: { type: Number, default: 0 }
    },

    createdBy: { type: String, default: "Lead Mentor Admin" }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
