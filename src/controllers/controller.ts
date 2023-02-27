import { Response, Request } from "express";
import { scrapeEvents, scrapePlayers, scrapeTeams } from "../vlr-scraper.js";

// @desc   GET rankings
// @route  GET /api/rankings/:region
// @access Public
const getRankings = async (req: Request, res: Response) => {
  const rankings = await scrapeTeams(req.params.region);
  res.status(200).json(rankings);
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
  const events = await scrapeEvents();
  res.status(200).json(events);
};

// @desc   GET event
// @route  GET /api/events/:name
// @access Public
const getEvent = async (req: Request, res: Response) => {
  res.status(200).json({ msg: `event ${req.params.name}` });
};

// @desc   GET matches
// @route  GET /api/matches
// @access Public
const getMatches = async (req: Request, res: Response) => {};

export { getRankings, getPlayers, getEvents, getEvent, getMatches };
