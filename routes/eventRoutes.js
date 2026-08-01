import express from "express";
import Event from "../models/Event.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Sample seed events if database is empty
const INITIAL_EVENTS = [
  {
    title: "Global 48-Hour Vibe Coding Sprint",
    slug: "vibe-coding-sprint-2026",
    status: "upcoming",
    tagline: "Transform raw ideas into deployed full-stack AI applications in 48 hours.",
    mode: "Global Discord & Campus Lab",
    venue: "Turing Wings Innovation HQ",
    startDate: "2026-08-15",
    endDate: "2026-08-17",
    lead: "Ratnakar & Sahith Akula",
    description: "Build full-stack web applications with Cursor, Claude 3.7 Sonnet, and agent swarms under 48 hours with live mentor assistance.",
    tracks: [
      { title: "Generative UI & Spatial Web", desc: "Build ultra-modern web design systems and glassmorphic dashboards.", prizePool: "$5,000" },
      { title: "Autonomous Agent Swarms", desc: "Orchestrate multi-agent coding teams that auto-test & deploy microservices.", prizePool: "$5,000" },
      { title: "Offensive AI Security Shield", desc: "Audit LLM endpoints, prompt injections, and Zero-Trust firewall rules.", prizePool: "$5,000" }
    ],
    timeline: [
      { time: "Day 1 - 09:00 AM", title: "Kickoff & Track Briefing", desc: "Opening keynote by Lead Mentors." },
      { time: "Day 1 - 12:00 PM", title: "Hacking Begins", desc: "Teams form & start vibe coding sprints." },
      { time: "Day 2 - 06:00 PM", title: "Submission Deadline", desc: "Code freeze & live video demonstrations." }
    ],
    prizes: [
      { place: "1st Grand Winner", amount: "$7,500", perks: "Turing Wings Incubator Grant + Hardware" },
      { place: "2nd Runner Up", amount: "$4,500", perks: "Cloud Credits + Mentorship" },
      { place: "3rd Track Winner", amount: "$3,000", perks: "Specialty Trophy + Swag" }
    ],
    faqs: [
      { question: "Who can participate?", answer: "Open to all student builders, developers, and visionaries." },
      { question: "Is participation free?", answer: "Yes, 100% free entry provided by Turing Wings." }
    ]
  },
  {
    title: "Offensive Cyber Shield Masterclass & Hackathon",
    slug: "cyber-shield-masterclass-2026",
    status: "upcoming",
    tagline: "Penetration testing AI endpoints, auditing prompt vectors, and Zero-Trust firewall design.",
    mode: "Virtual Interactive Lab",
    venue: "Turing Wings Cyber Arena",
    startDate: "2026-09-01",
    endDate: "2026-09-03",
    lead: "Ratnakar — Cybersecurity Lead",
    description: "Hands-on cybersecurity challenge where participants audit and defend AI application infrastructures.",
    tracks: [
      { title: "LLM Red Teaming", desc: "Uncover prompt injection vulnerabilities in production AI agents.", prizePool: "$3,500" },
      { title: "Zero Trust Architecture", desc: "Configure multi-factor security rules and packet inspection engines.", prizePool: "$3,500" }
    ],
    timeline: [
      { time: "Sept 1 - 10:00 AM", title: "Masterclass Live Stream", desc: "Penetration testing fundamentals." },
      { time: "Sept 2 - 02:00 PM", title: "Capture The Flag Arena", desc: "Live attack & defense challenges." }
    ],
    prizes: [
      { place: "Cyber Shield Trophy", amount: "$5,000", perks: "Direct Mentorship & Security Badges" }
    ],
    faqs: [
      { question: "Do I need cybersecurity experience?", answer: "Beginner and advanced tracks are provided." }
    ]
  }
];

// @route   GET /api/events
// @desc    Get all events/buildathons (Public)
router.get("/", async (req, res) => {
  try {
    let events = await Event.find().sort({ createdAt: -1 });
    if (events.length === 0) {
      events = await Event.insertMany(INITIAL_EVENTS);
    }
    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Server error fetching events" });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event details
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching event details" });
  }
});

// @route   POST /api/events
// @desc    Create a new buildathon/event (Admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, tagline, status, mode, venue, startDate, endDate, lead, description, tracks, timeline, prizes, faqs } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Event title is required" });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const newEvent = await Event.create({
      title,
      slug,
      tagline,
      status: status || "upcoming",
      mode: mode || "Hybrid (Discord & Campus Lab)",
      venue: venue || "Turing Wings Innovation HQ",
      startDate,
      endDate,
      lead: lead || req.user.name,
      description,
      tracks: tracks || [],
      timeline: timeline || [],
      prizes: prizes || [],
      faqs: faqs || [],
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Server error creating event" });
  }
});

// @route   PUT /api/events/:id
// @desc    Update buildathon/event (Admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    Object.assign(event, req.body);
    const updated = await event.save();
    res.json(updated);
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ message: "Server error updating event" });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event (Admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ message: "Server error deleting event" });
  }
});

export default router;
