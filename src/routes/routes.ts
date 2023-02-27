import express from "express";
import {
  getEvent,
  getEvents,
  getPlayers,
  getRankings,
  getMatches,
} from "../controllers/controller.js";

const router = express.Router();

// Get Team Rankings
router.get("/rankings/:region", getRankings);

// Get All Players
router.get("/players", getPlayers);

// Get All Ongoing Events
router.get("/events", getEvents);

// Get Specific Event
router.get("/events/:name", getEvent);

// Get Completed Match Results
router.get("/matches", getMatches);

export default router;
