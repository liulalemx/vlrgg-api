import express from "express";
import {
  getEvent,
  getEvents,
  getPlayers,
  getTeams,
} from "../controllers/controller.js";

const router = express.Router();

// Get All Teams
router.get("/teams", getTeams);

// Get All Players
router.get("/players", getPlayers);

// Get All Events
router.get("/events", getEvents);

// Get Specific Event
router.get("/events/:name", getEvent);
export default router;
