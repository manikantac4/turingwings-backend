import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Seed initial default Turing Wings Buildathon Event if database is empty
const seedDefaultEvent = async () => {
  try {
    const count = await Event.countDocuments();
    if (count === 0) {
      await Event.create({
        name: "Turing Wings AI Buildathon 2026",
        shortName: "TW-Buildathon-26",
        slug: "tw-buildathon-2026",
        type: "Buildathon",
        theme: "Autonomous AI Swarms & Spatial Systems",
        tagline: "Build Next-Gen AI Applications & Spatial UI Systems in 48 Hours",
        shortDescription: "Join top creators, AI researchers, and developers worldwide to construct groundbreaking AI agents, spatial canvases, and zero-trust web applications.",
        fullDescription: "The Turing Wings Global Buildathon is an immersive 48-hour online hackathon where visionary engineers gather to solve real-world industry challenges. Gain 1-on-1 mentorship from lead tech mentors, showcase your project to elite tech leaders, and compete for $15,000+ in prizes, swag, and career fast-tracks.",
        objectives: [
          "Demonstrate 12x development speed using modern AI agents",
          "Build production-grade web applications with React 19 and Tailwind",
          "Collaborate with international builder squads"
        ],
        vision: "Empowering every creator to turn ideas into digital reality.",
        expectedOutcomes: ["Full working project repository", "Live deployed web application", "Video walkthrough pitch"],
        status: "Published",

        logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
        heroBanner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        heroBackground: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
        thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        
        templateId: "ai-future",
        backgroundStyle: "particles",

        schedule: {
          registrationOpen: new Date("2026-07-01"),
          registrationClose: new Date("2026-08-15"),
          teamFormationDeadline: new Date("2026-08-18"),
          orientationDate: new Date("2026-08-20"),
          eventStart: new Date("2026-08-22"),
          problemRevealDate: new Date("2026-08-22"),
          mentorSessionDate: new Date("2026-08-23"),
          midEvalDate: new Date("2026-08-23"),
          submissionDeadline: new Date("2026-08-24"),
          presentationRoundDate: new Date("2026-08-25"),
          winnerAnnouncementDate: new Date("2026-08-26"),
          certificateReleaseDate: new Date("2026-08-27")
        },

        registrationConfig: {
          registrationType: "Team",
          minTeamSize: 1,
          maxTeamSize: 4,
          approvalType: "Auto",
          capacity: 1000,
          waitlistEnabled: true
        },

        customQuestions: [
          { id: "q1", question: "Why do you want to participate in Turing Wings Buildathon?", type: "text", required: true },
          { id: "q2", question: "What technologies or AI tools are you comfortable using?", type: "text", required: false }
        ],

        eligibility: {
          category: "Open for All",
          collegeRestrictions: "None",
          graduationYears: ["2024", "2025", "2026", "2027", "2028"],
          ageLimit: "16+"
        },

        tracks: [
          { id: "t1", name: "AI Agent Swarms & Autonomy", icon: "Bot", description: "Build autonomous multi-agent systems using Sonnet, GPT-4, or Cursor agents." },
          { id: "t2", name: "Spatial UI & Glassmorphism Canvas", icon: "Layout", description: "Design ultra-smooth, 60 FPS HTML5 canvas overlays and spatial interface systems." },
          { id: "t3", name: "Zero-Trust Cybersecurity Shield", icon: "Shield", description: "Deploy quantum-resistant threat scanning and packet auditing microservices." }
        ],

        prizes: [
          { title: "Grand Champion (1st Place)", reward: "$7,000 Cash + Incubator Fast-Track", category: "Overall", cashAmount: 7000, swag: "Exclusive Trophy + Swag Box", icon: "Trophy" },
          { title: "Runner Up (2nd Place)", reward: "$4,000 Cash + Mentorship Pass", category: "Runner Up", cashAmount: 4000, swag: "Custom Turing Wings Hoodie", icon: "Award" },
          { title: "Best AI Innovation Track", reward: "$2,500 Cash + Cloud Credits", category: "Track Winner", cashAmount: 2500, swag: "AI Hardware Kit", icon: "Zap" }
        ],

        judges: [
          { id: "j1", name: "Ratnakar Karasala", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", company: "Turing Wings HQ", designation: "Cybersecurity Lead Mentor", bio: "Leading zero-trust architecture and threat shielding research.", linkedin: "https://linkedin.com" },
          { id: "j2", name: "Sahith Akula", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80", company: "Turing Wings HQ", designation: "Backend Lead Mentor", bio: "Architect of high-throughput agent swarm microservices.", linkedin: "https://linkedin.com" }
        ],

        mentors: [
          { id: "m1", name: "Pandu Ranga Tummuri", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", company: "Turing Wings HQ", designation: "UI/UX & Spatial Lead", bio: "Specializes in 60 FPS spatial animations and design systems.", linkedin: "https://linkedin.com" }
        ],

        sponsors: [
          { id: "s1", name: "Turing Wings Global", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80", website: "https://turingwings.com", description: "Title Sponsor & Innovation Ecosystem", tier: "Title" }
        ],

        faqs: [
          { question: "Is participation free?", answer: "Yes! All Turing Wings hackathons and buildathons are 100% free of charge for students and developers worldwide.", category: "General" },
          { question: "Who can apply?", answer: "Any passionate builder, student, developer, or designer above 16 years of age can register individually or as a team.", category: "Eligibility" },
          { question: "Can I participate individually?", answer: "Yes, you can register individually or form a team of up to 4 members before the team formation deadline.", category: "Teams" }
        ],

        contact: {
          coordinatorName: "Manoj Kumar Allu",
          coordinatorEmail: "contact@turingwings.com",
          coordinatorPhone: "+91 9876543210",
          supportEmail: "support@turingwings.com",
          discord: "https://discord.gg/turingwings",
          whatsapp: "https://chat.whatsapp.com/turingwings"
        },

        venue: {
          type: "Online",
          name: "Turing Wings Spatial Virtual Arena",
          address: "Online Global Portal"
        },

        seo: {
          metaTitle: "Turing Wings AI Buildathon 2026 — 48-Hour Innovation Hackathon",
          metaDescription: "Register now for the global AI Buildathon. Build AI agents, spatial UI, and cyber shields.",
          keywords: "hackathon, buildathon, ai, react, turing wings, coding contest",
          visibility: "Public"
        }
      });
      console.log("✅ Seeded default Turing Wings Buildathon Event into MongoDB Atlas");
    }
  } catch (err) {
    console.error("Error seeding default event:", err);
  }
};

seedDefaultEvent();

// @route   GET /api/events
// @desc    Get all published events for public site
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ status: "Published" }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// @route   GET /api/events/all
// @desc    Get all events including drafts & archived for Admin Dashboard
// @access  Public (or Admin Protected)
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching all admin events:", error);
    res.status(500).json({ message: "Failed to fetch admin events" });
  }
});

// @route   GET /api/events/:identifier
// @desc    Get single event by ID or Slug
// @access  Public
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    let event;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      event = await Event.findById(identifier);
    }
    if (!event) {
      event = await Event.findOne({ slug: identifier });
    }

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event details" });
  }
});

// @route   POST /api/events
// @desc    Create new event via 23-Phase Multi-Step Wizard
// @access  Public/Admin
router.post("/", async (req, res) => {
  try {
    const eventData = req.body;

    if (!eventData.name) {
      return res.status(400).json({ message: "Event name is required" });
    }

    // Auto generate slug if missing
    if (!eventData.slug) {
      eventData.slug = eventData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Check slug uniqueness
    const existing = await Event.findOne({ slug: eventData.slug });
    if (existing) {
      eventData.slug = `${eventData.slug}-${Date.now().toString().slice(-4)}`;
    }

    const newEvent = await Event.create(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: error.message || "Failed to create event" });
  }
});

// @route   PUT /api/events/:id
// @desc    Update existing event by ID
// @access  Public/Admin
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event by ID
// @access  Public/Admin
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully", _id: req.params.id });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register a participant or team for an event
// @access  Public
router.post("/:id/register", async (req, res) => {
  try {
    const { fullName, email, phone, college, department, year, teamName, teamMembers, customAnswers } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: "Full Name and Email are required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if already registered
    const alreadyRegistered = event.registrations.some((r) => r.email.toLowerCase() === email.toLowerCase());
    if (alreadyRegistered) {
      return res.status(400).json({ message: "You are already registered for this event!" });
    }

    const registrationData = {
      fullName,
      email: email.toLowerCase(),
      phone,
      college,
      department,
      year,
      teamName,
      teamMembers: teamMembers || [],
      customAnswers: customAnswers || {},
      registeredAt: new Date(),
      status: event.registrationConfig?.approvalType === "Manual" ? "Pending" : "Approved",
    };

    event.registrations.push(registrationData);
    await event.save();

    res.status(201).json({
      message: "Registration successful!",
      registration: registrationData,
      eventSlug: event.slug,
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ message: "Server error during event registration" });
  }
});

export default router;
