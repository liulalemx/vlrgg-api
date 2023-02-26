import express from "express";
import {
  getEvent,
  getEvents,
  getPlayers,
  getRankings,
} from "../controllers/controller.js";

const router = express.Router();

// Get Team Rankings
router.get("/rankings/:region", getRankings);

// Get All Players
router.get("/players", getPlayers);

// Get All Events
router.get("/events", getEvents);

// Get Specific Event
router.get("/events/:name", getEvent);
export default router;
