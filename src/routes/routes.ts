import express from "express";

const router = express.Router();

// Get All Teams
router.get("/teams", (req, res) => {
  res.status(200).json({ msg: "teams" });
});

// Get All Players
router.get("/players", (req, res) => {
  res.status(200).json({ msg: "players" });
});

// Get All Events
router.get("/events", (req, res) => {
  res.status(200).json({ msg: "events" });
});

// Get Specific Event
router.get("/events/:name", (req, res) => {
  res.status(200).json({ msg: `event ${req.params.name}` });
});
export default router;
