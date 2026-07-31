import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

// GET /api/events - Public published events list
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ eventStatus: { $ne: "Archived" } }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching public events" });
  }
});

// GET /api/events/admin/all - All events for Admin Portal
router.get("/admin/all", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin events" });
  }
});

// GET /api/events/admin/:id - Single event details for Admin Management Dashboard
router.get("/admin/:id", async (req, res) => {
  try {
    const eventItem = await Event.findById(req.params.id);
    if (!eventItem) return res.status(404).json({ message: "Event not found" });
    res.json(eventItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event details" });
  }
});

// GET /api/events/:slug - Public single event page view
router.get("/:slug", async (req, res) => {
  try {
    const eventItem = await Event.findOne({ slug: req.params.slug });
    if (!eventItem) return res.status(404).json({ message: "Event not found" });

    // Increment page view count
    eventItem.analytics.viewsCount = (eventItem.analytics.viewsCount || 0) + 1;
    await eventItem.save();

    res.json(eventItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event by slug" });
  }
});

// POST /api/events - Create new event (Admin Event Generator Wizard)
router.post("/", async (req, res) => {
  try {
    const { title, tagline, eventType, templateId, mode, prizePool, venue, shortDescription } = req.body;

    let slug = slugify(title || "Buildathon Event");
    const existing = await Event.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const defaultTracks = [
      { id: "1", name: "AI & Machine Learning Swarms", description: "Build autonomous multi-agent systems and LLM workflows.", prize: "$4,000", problemDomain: "Artificial Intelligence" },
      { id: "2", name: "Full-Stack Web3 & Spatial UI", description: "Create high-performance web applications and glassmorphism systems.", prize: "$3,500", problemDomain: "Web Development" },
      { id: "3", name: "Cybersecurity & Zero-Trust Shield", description: "Offensive security tools and automated vulnerability scanners.", prize: "$2,500", problemDomain: "Cybersecurity" },
    ];

    const defaultTimeline = [
      { id: "1", milestoneName: "Registration Opens", date: "August 25, 2026", time: "09:00 AM", description: "Participant applications and team formation begin.", status: "Completed" },
      { id: "2", milestoneName: "Orientation & Briefing", date: "August 28, 2026", time: "10:00 AM", description: "Live kickoff, mentor introductions, and track briefings.", status: "Upcoming" },
      { id: "3", milestoneName: "Problem Statement Release", date: "August 28, 2026", time: "11:00 AM", description: "Official problem statements unlocked for all teams.", status: "Upcoming" },
      { id: "4", milestoneName: "Final Submission Deadline", date: "August 30, 2026", time: "06:00 PM", description: "GitHub repository and video demo submission.", status: "Upcoming" },
      { id: "5", milestoneName: "Results & Certificate Release", date: "September 02, 2026", time: "05:00 PM", description: "Winner announcement and digital certificate distribution.", status: "Upcoming" },
    ];

    const defaultJudges = [
      { id: "1", name: "Ratnakar Karasala", designation: "Cybersecurity Lead Mentor", organization: "Turing Wings HQ", bio: "Penetration testing & Zero-Trust security lead.", photo: "R" },
      { id: "2", name: "Sahith Akula", designation: "Backend Lead Mentor", organization: "Turing Wings HQ", bio: "Multi-agent systems & microservices architect.", photo: "S" },
      { id: "3", name: "Manoj Kumar Allu", designation: "Growth & Strategy Lead", organization: "Turing Wings HQ", bio: "Product architecture & venture scaling mentor.", photo: "M" },
      { id: "4", name: "Pandu Ranga Tummuri", designation: "Frontend & Spatial UI Lead", organization: "Turing Wings HQ", bio: "60 FPS HTML5 canvas & spatial UX specialist.", photo: "P" },
    ];

    const newEvent = await Event.create({
      title: title || "New Turing Wings Buildathon",
      slug,
      eventType: eventType || "Buildathon",
      templateId: templateId || "ai-future",
      tagline: tagline || "Build, Deploy & Accelerate Velocity with Turing Wings",
      shortDescription: shortDescription || "Join thousands of visionary creators in this high-octane buildathon.",
      mode: mode || "Online",
      prizes: { prizePool: prizePool || "$10,000 USD", winnerPrize: "$5,000", runnerUpPrize: "$3,000", secondRunnerUpPrize: "$2,000" },
      schedule: {
        regStartDate: "August 20, 2026",
        regEndDate: "August 28, 2026",
        eventStartDate: "August 28, 2026",
        eventEndDate: "August 30, 2026",
        submissionDeadline: "August 30, 2026 (06:00 PM)",
        resultsDate: "September 02, 2026",
      },
      tracks: req.body.tracks || defaultTracks,
      timelineMilestones: req.body.timelineMilestones || defaultTimeline,
      judges: defaultJudges,
      mentors: defaultJudges,
      faqs: [
        { id: "1", question: "Who is eligible to participate?", answer: "Students, developers, designers, and creators worldwide can participate individually or in teams." },
        { id: "2", question: "Is there any registration fee?", answer: "No, all Turing Wings Buildathons are 100% free of cost." }
      ],
      createdBy: req.body.createdBy || "Lead Mentor Admin"
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error creating event" });
  }
});

// PUT /api/events/admin/:id - Update all 20 sections of an event
router.put("/admin/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
});

// DELETE /api/events/admin/:id - Delete event
router.delete("/admin/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ status: "DELETED" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
});

// POST /api/events/:slug/register - Register participant/team for event
router.post("/:slug/register", async (req, res) => {
  try {
    const { name, email, phone, college, department, year, github, linkedin, portfolio, teamName, role } = req.body;
    const eventItem = await Event.findOne({ slug: req.params.slug });

    if (!eventItem) return res.status(404).json({ message: "Event not found" });

    eventItem.participants.push({
      name,
      email,
      phone: phone || "",
      college: college || "",
      department: department || "",
      year: year || "",
      github: github || "",
      linkedin: linkedin || "",
      portfolio: portfolio || "",
      teamName: teamName || "Solo Builder",
      role: role || "Developer",
      registeredAt: new Date(),
    });

    eventItem.analytics.registrationsCount = (eventItem.analytics.registrationsCount || 0) + 1;
    if (teamName && teamName !== "Solo Builder") {
      eventItem.analytics.teamsCount = (eventItem.analytics.teamsCount || 0) + 1;
    }

    await eventItem.save();
    res.json({ message: "Registration successful!", event: eventItem });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

export default router;
