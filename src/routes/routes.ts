import express from "express";
import {
  getEvent,
  getEvents,
  getMatchResults,
  getPlayers,
  getRankings,
  getUpcomingMatches,
} from "../controllers/controller.js";

const router = express.Router();

// Get Team Rankings
router.get("/rankings/:region", getRankings);

// Get All Players
router.get("/players", getPlayers);

// Get All Ongoing Events
router.get("/events", getEvents);

// Get Specific Event
router.get("/events/:url", getEvent);

// Get Upcoming matches
router.get("/matches/upcoming", getUpcomingMatches);

// Get Completed Match Results
router.get("/matches/results", getMatchResults);

export default router;
