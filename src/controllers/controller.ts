import { Response, Request } from "express";
import { scrapePlayers } from "../vlr-scraper.js";

// @desc   GET teams
// @route  GET /api/teams
// @access Public
const getTeams = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "teams" });
};

// @desc   GET players
// @route  GET /api/players
// @access Public
const getPlayers = async (req: Request, res: Response) => {
  const players = await scrapePlayers();
  res.status(200).json(players);
};

// @desc   GET events
// @route  GET /api/events
// @access Public
const getEvents = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "events" });
};

// @desc   GET event
// @route  GET /api/events/:name
// @access Public
const getEvent = async (req: Request, res: Response) => {
  res.status(200).json({ msg: `event ${req.params.name}` });
};

export { getTeams, getPlayers, getEvents, getEvent };
