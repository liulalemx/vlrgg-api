import { Response, Request } from "express";
import {
  scrapeEvent,
  scrapeEvents,
  scrapeMatchResults,
  scrapePlayers,
  scrapeTeams,
  scrapeUpcomingMatches,
} from "../vlr-scraper.js";

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
// @route  GET /api/events/:url
// @access Public
const getEvent = async (req: Request, res: Response) => {
  const event = await scrapeEvent(req.params.url);
  res.status(200).json(event);
};

// @desc   GET upcoming matches
// @route  GET /api/matches/upcoming
// @access Public
const getUpcomingMatches = async (req: Request, res: Response) => {
  const upcomingMatches = await scrapeUpcomingMatches();
  res.status(200).json(upcomingMatches);
};

// @desc   GET match results
// @route  GET /api/matches/results
// @access Public
const getMatchResults = async (req: Request, res: Response) => {
  const upcomingMatches = await scrapeMatchResults();
  res.status(200).json(upcomingMatches);
};

export {
  getRankings,
  getPlayers,
  getEvents,
  getEvent,
  getUpcomingMatches,
  getMatchResults,
};
