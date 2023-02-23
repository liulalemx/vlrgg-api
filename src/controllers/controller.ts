import { Response, Request } from "express";

// @desc   GET teams
// @route  GET /api/teams
// @access Public
const getTeams = (req: Request, res: Response) => {
  res.status(200).json({ msg: "teams" });
};

// @desc   GET players
// @route  GET /api/players
// @access Public
const getPlayers = (req: Request, res: Response) => {
  res.status(200).json({ msg: "players" });
};

// @desc   GET events
// @route  GET /api/events
// @access Public
const getEvents = (req: Request, res: Response) => {
  res.status(200).json({ msg: "events" });
};

// @desc   GET event
// @route  GET /api/events/:name
// @access Public
const getEvent = (req: Request, res: Response) => {
  res.status(200).json({ msg: `event ${req.params.name}` });
};

export { getTeams, getPlayers, getEvents, getEvent };
