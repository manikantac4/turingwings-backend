import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Helper: Slugify title
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

// GET /api/events - Public published events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ status: { $ne: "Archived" } }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
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

// POST /api/events - Create new event (Admin Event Generation Wizard)
router.post("/", async (req, res) => {
  try {
    const { title, tagline, eventType, templateId, mode, startDate, endDate, prizePool, venue, description } = req.body;

    let slug = slugify(title);
    const existing = await Event.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const defaultTracks = [
      { id: "1", title: "AI & Machine Learning Swarms", description: "Build autonomous multi-agent systems and LLM workflows.", prize: "$4,000" },
      { id: "2", title: "Full-Stack Web3 & Spatial UI", description: "Create high-performance web applications and glassmorphism systems.", prize: "$3,500" },
      { id: "3", title: "Cybersecurity & Zero-Trust Defense", description: "Offensive security tools and automated vulnerability scanners.", prize: "$2,500" },
    ];

    const defaultTimeline = [
      { id: "1", stage: "Registration Opens", date: startDate || "Immediate", description: "Participant applications and team formation begin." },
      { id: "2", stage: "Orientation & Mentor Session", date: "Day 1", description: "Live kickoff, mentor introductions, and track briefings." },
      { id: "3", stage: "Hacking & Build Sprint", date: "Day 2", description: "Build sprint with continuous mentor assistance." },
      { id: "4", stage: "Final Submission & Demo Day", date: endDate || "Final Day", description: "Project submission, live video presentations, and judge review." },
      { id: "5", stage: "Results & Certificate Release", date: "Post Event", description: "Winner announcement and digital certificate distribution." },
    ];

    const defaultJudges = [
      { name: "Ratnakar Karasala", role: "Cybersecurity Lead Mentor", company: "Turing Wings HQ", avatar: "R" },
      { name: "Sahith Akula", role: "Backend Lead Mentor", company: "Turing Wings HQ", avatar: "S" },
      { name: "Manoj Kumar Allu", role: "Growth & Strategy Lead", company: "Turing Wings HQ", avatar: "M" },
      { name: "Pandu Ranga Tummuri", role: "Frontend & Spatial UI Lead", company: "Turing Wings HQ", avatar: "P" },
    ];

    const defaultFaqs = [
      { question: "Who is eligible to participate?", answer: "Students, developers, designers, and creators worldwide can participate individually or in teams." },
      { question: "Is there any registration fee?", answer: "No, all Turing Wings Buildathons and Hackathons are 100% free of cost." },
      { question: "Can I form a team with members from different colleges?", answer: "Yes, cross-institution and global team formations are fully permitted." },
    ];

    const newEvent = await Event.create({
      title,
      slug,
      tagline: tagline || "Accelerate your build velocity with Turing Wings",
      eventType: eventType || "Buildathon",
      mode: mode || "Online",
      status: "Registration Open",
      templateId: templateId || "ai-future",
      startDate: startDate || "August 2026",
      endDate: endDate || "September 2026",
      prizePool: prizePool || "$10,000 USD",
      venue: venue || "Turing Wings Virtual Portal",
      description: description || "Join thousands of creators in this high-octane buildathon.",
      tracks: req.body.tracks || defaultTracks,
      timeline: req.body.timeline || defaultTimeline,
      judges: req.body.judges || defaultJudges,
      mentors: req.body.mentors || defaultJudges,
      faqs: req.body.faqs || defaultFaqs,
      registrationConfig: req.body.registrationConfig || {
        allowIndividual: true,
        allowTeam: true,
        minTeamSize: 1,
        maxTeamSize: 4,
        requireGitHub: true,
      },
      createdBy: req.body.createdBy || "Lead Mentor Admin",
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error creating event" });
  }
});

// PUT /api/events/admin/:id - Update event details, template, or lifecycle status
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

// POST /api/events/:slug/register - Register for event
router.post("/:slug/register", async (req, res) => {
  try {
    const { name, email, role, teamName, github } = req.body;
    const eventItem = await Event.findOne({ slug: req.params.slug });

    if (!eventItem) return res.status(404).json({ message: "Event not found" });
    if (eventItem.status === "Registration Closed") {
      return res.status(400).json({ message: "Registration for this event is closed." });
    }

    eventItem.participants.push({
      name,
      email,
      role: role || "Developer",
      teamName: teamName || "Solo Builder",
      github: github || "",
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
