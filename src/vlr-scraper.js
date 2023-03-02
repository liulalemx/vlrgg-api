import axios from "axios";
import * as cheerio from "cheerio";
import { time } from "console";

const url =
  "https://www.vlr.gg/167364/zeta-division-vs-leviat-n-champions-tour-2023-lock-in-s-o-paulo-omega-ro16";

const teamsInfo = {
  teams: [],
};

const playersInfo = {
  players: [],
};

const eventsInfo = {
  events: [],
};

const eventInfo = {
  event_name: "",
  event_logo: "",
  event_url: "",
  description: "",
  dates: "",
  prize_pool: "",
  location: "",
  teams: [],
  upcoming_matches: [],
  latest_results: [],
};

const upcomingMatches = {
  matches: [],
};

const matchResults = {
  matches: [],
};

const matchInfo = {
  tournament_name: "",
  tournament_logo: "",
  match_url: "",
  match_day: "",
  team_one_name: "",
  team_one_logo: "",
  team_one_score: "",
  team_two_name: "",
  team_two_logo: "",
  team_two_score: "",
  team_one_players: [],
  team_two_players: [],
};

async function scrapePlayers() {
  // Fetch the data
  const { data } = await axios.get("https://www.vlr.gg/stats");

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find("#wrapper > div.col-container > div > div > div > table > tbody > tr")
    .each((index, element) => {
      const tds = $(element).find("td ");
      playersInfo.players.push({
        player_name: $(tds[0]).find("div > div").eq(0).text().trim(),
        player_link: `www.vlr.gg` + $(tds[0]).find("a").attr("href"),
        player_team_initials: $(tds[0]).find("div > div").eq(1).text().trim(),
        player_country_initials: $(tds[0]).find("i").attr("class").slice(-2),
        rounds_played: $(tds[2]).text().trim(),
        rating: $(tds[3]).text().trim(),
        average_combat_score: $(tds[4]).text().trim(),
        kills_deaths: $(tds[5]).text().trim(),
        kill_assist_trade_survive_percentage: $(tds[6]).text().trim(),
        average_damage_per_round: $(tds[7]).text().trim(),
        kills_per_round: $(tds[8]).text().trim(),
        assists_per_round: $(tds[9]).text().trim(),
        first_kills_per_round: $(tds[10]).text().trim(),
        first_deaths_per_round: $(tds[11]).text().trim(),
        headshot_percentage: $(tds[12]).text().trim(),
        clutch_success_percentage: $(tds[13]).text().trim(),
        max_kills_in_single_map: $(tds[15]).text().trim(),
        kills: $(tds[16]).text().trim(),
        deaths: $(tds[17]).text().trim(),
      });
    });

  return playersInfo;
}

async function scrapeTeams(region) {
  // Fetch the data
  const { data } = await axios.get(`https://www.vlr.gg/rankings/${region}`);

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find("#wrapper > div.col-container > div > div.mod-scroll > div.wf-card")
    .each((index, element) => {
      teamsInfo.teams.push({
        team_name: $(element).find("a.rank-item-team").attr("data-sort-value"),
        team_logo: $(element).find("a.rank-item-team img").attr("src"),
        team_url:
          `www.vlr.gg` + $(element).find("a.rank-item-team").attr("href"),
        team_rank: $(element).find("div.rank-item-rank-num").text().trim(),
        rating_score: $(element)
          .find("div.rank-item-rating")
          .eq(0)
          .text()
          .trim(),
        recent_match: {
          match_url:
            `www.vlr.gg` + $(element).find("a.rank-item-last").attr("href"),
          match_time: $(element)
            .find("a.rank-item-last div")
            .eq(0)
            .text()
            .trim(),
          opponent_team_name: $(element)
            .find("a.rank-item-last div span")
            .eq(1)
            .text()
            .trim(),
          opponent_team_logo_url: $(element)
            .find("a.rank-item-last div img")
            .attr("src"),
        },
        win_streak: $(element).find("div.rank-item-streak span").text().trim(),
        record: $(element).find("div.rank-item-record").eq(0).text().trim(),
        total_winnings: $(element).find("div.rank-item-earnings").text().trim(),
      });
    });

  if (teamsInfo.teams.length > 0) {
    return teamsInfo;
  } else {
    return "Data scrape taking too long";
  }
}

async function scrapeEvents() {
  // Fetch the data
  const { data } = await axios.get(`https://www.vlr.gg/events`);

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find(
      "#wrapper > div.col-container > div > div.events-container > div:nth-child(1) > a"
    )
    .each((index, element) => {
      eventsInfo.events.push({
        event_name: $(element).find("div.event-item-title").text().trim(),
        event_logo: $(element).find("div.event-item-thumb img").attr("src"),
        event_url: "www.vlr.gg" + $(element).attr("href"),
        prize_pool: $(element)
          .find("div.mod-prize")
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .trim(),
        dates: $(element)
          .find("div.mod-dates")
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .trim(),
        region: $(element).find("div.mod-location i").attr("class").slice(-2),
      });
    });

  if (eventsInfo.events.length > 0) {
    return eventsInfo;
  } else {
    return "Data scrape taking too long";
  }
}

async function scrapeEvent(event_url) {
  // Fetch the data
  const { data } = await axios.get(`${event_url}`);

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  eventInfo.event_name = $(item)
    .find(
      "#wrapper > div.col-container > div > div.wf-card.mod-event.mod-header.mod-full > div.event-header > div.event-desc > div > h1"
    )
    .text()
    .trim();
  eventInfo.event_url = event_url;
  eventInfo.event_logo = $(item)
    .find(
      "#wrapper > div.col-container > div > div.wf-card.mod-event.mod-header.mod-full > div.event-header > div.wf-avatar.event-header-thumb > div > img"
    )
    .attr("src");
  eventInfo.description = $(item)
    .find(
      "#wrapper > div.col-container > div > div.wf-card.mod-event.mod-header.mod-full > div.event-header > div.event-desc > div > h2"
    )
    .text()
    .trim();
  eventInfo.dates = $(item)
    .find(
      "#wrapper > div.col-container > div > div.wf-card.mod-event.mod-header.mod-full > div.event-header > div.event-desc > div > div.event-desc-items > div:nth-child(1) > div.event-desc-item-value"
    )
    .text()
    .trim();
  eventInfo.prize_pool = $(item)
    .find(
      "#wrapper > div.col-container > div > div.wf-card.mod-event.mod-header.mod-full > div.event-header > div.event-desc > div > div.event-desc-items > div:nth-child(2) > div.event-desc-item-value"
    )
    .text()
    .trim();
  eventInfo.location = $(item)
    .find(
      "#wrapper > div.col-container > div > div.wf-card.mod-event.mod-header.mod-full > div.event-header > div.event-desc > div > div.event-desc-items > div.event-desc-item.mod-last > div.event-desc-item-value"
    )
    .text()
    .trim();

  // populate teams
  $(item)
    .find(
      "#wrapper > div.col-container > div > div.event-container > div.event-content > div.event-teams-container div.event-team"
    )
    .each((index, element) => {
      eventInfo.teams.push({
        team_name: $(element).find("a.event-team-name").text().trim(),
        team_logo_url: $(element)
          .find("div.event-team-players img")
          .attr("src"),
      });
    });

  // Populate upsoming matches
  $(item)
    .find(
      "#wrapper > div.col-container > div > div.event-container > div.event-sidebar > div > div:nth-child(2) > a"
    )
    .each((index, element) => {
      eventInfo.upcoming_matches.push({
        team_one_name: $(element)
          .find("div.event-sidebar-matches-team div.name span")
          .eq(0)
          .text()
          .trim(),
        team_two_name: $(element)
          .find("div.event-sidebar-matches-team div.name span")
          .eq(1)
          .text()
          .trim(),
        ETA: $(element).find("div.eta").text().trim(),
      });
    });

  // Populate latest results
  $(item)
    .find(
      "#wrapper > div.col-container > div > div.event-container > div.event-sidebar > div > div:nth-child(5) > a"
    )
    .each((index, element) => {
      eventInfo.latest_results.push({
        team_one_name: $(element)
          .find("div.event-sidebar-matches-team div.name span")
          .eq(0)
          .text()
          .trim(),
        team_one_score: $(element)
          .find("div.event-sidebar-matches-team div.score")
          .eq(0)
          .text()
          .trim(),
        team_two_name: $(element)
          .find("div.event-sidebar-matches-team div.name span")
          .eq(1)
          .text()
          .trim(),
        team_two_score: $(element)
          .find("div.event-sidebar-matches-team div.score")
          .eq(1)
          .text()
          .trim(),
        ETA: $(element).find("div.eta").text().trim(),
      });
    });

  return eventInfo;
}

async function scrapeUpcomingMatches() {
  // Fetch the data
  const { data } = await axios.get("https://www.vlr.gg/matches");

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find("#wrapper > div.col-container div div.wf-card")
    .each((index, element) => {
      $(element)
        .find("a.match-item")
        .each((ind, ele) => {
          upcomingMatches.matches.push({
            team_one_name: $(ele)
              .find("div.match-item-vs-team-name")
              .eq(0)
              .text()
              .trim(),
            team_two_name: $(ele)
              .find("div.match-item-vs-team-name")
              .eq(1)
              .text()
              .trim(),
            match_url: `www.vlr.gg` + $(ele).attr("href"),
            event_name: $(ele)
              .find("div.match-item-event")
              .clone()
              .children()
              .remove()
              .end()
              .text()
              .trim(),
            event_icon_url: $(ele).find("div.match-item-icon img").attr("src"),
            match_time: $(ele).find("div.match-item-time").text().trim(),
            eta: $(ele).find("div.ml-eta").text().trim(),
          });
        });
    });

  return upcomingMatches;
}

async function scrapeMatchResults() {
  // Fetch the data
  const { data } = await axios.get("https://www.vlr.gg/matches/results");

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find("#wrapper > div.col-container div div.wf-card")
    .each((index, element) => {
      $(element)
        .find("a.match-item")
        .each((ind, ele) => {
          matchResults.matches.push({
            team_one_name: $(ele)
              .find("div.match-item-vs-team-name")
              .eq(0)
              .text()
              .trim(),
            team_two_name: $(ele)
              .find("div.match-item-vs-team-name")
              .eq(1)
              .text()
              .trim(),
            team_one_score: $(ele)
              .find("div.match-item-vs-team-score")
              .eq(0)
              .text()
              .trim(),
            team_two_score: $(ele)
              .find("div.match-item-vs-team-score")
              .eq(1)
              .text()
              .trim(),
            match_url: `www.vlr.gg` + $(ele).attr("href"),
            event_name: $(ele)
              .find("div.match-item-event")
              .clone()
              .children()
              .remove()
              .end()
              .text()
              .trim(),
            event_icon_url: $(ele).find("div.match-item-icon img").attr("src"),
            match_time: $(ele).find("div.match-item-time").text().trim(),
            eta: $(ele).find("div.ml-eta").text().trim(),
          });
        });
    });

  return matchResults;
}

async function scrapeMatch(match_url) {
  // Fetch the data
  const { data } = await axios.get(`${match_url}`);

  // Load up the html
  const $ = cheerio.load(data);
  const item = $("div#wrapper");

  // Extract the data that we need

  matchInfo.tournament_name = $(item)
    .find("a.match-header-event  div div")
    .eq(0)
    .text()
    .trim();
  matchInfo.tournament_logo = $(item)
    .find("a.match-header-event  img")
    .attr("src");
  matchInfo.match_url = match_url;
  matchInfo.match_day = $(item)
    .find("div.moment-tz-convert")
    .eq(0)
    .text()
    .trim();
  matchInfo.team_one_name = $(item)
    .find("a.mod-1 div.wf-title-med")
    .text()
    .trim();
  matchInfo.team_one_logo = $(item).find("a.mod-1 img").attr("src");
  matchInfo.team_one_score = $(item)
    .find("div.match-header-vs-score div span")
    .eq(0)
    .text()
    .trim();
  matchInfo.team_two_name = $(item)
    .find("a.mod-2 div.wf-title-med")
    .text()
    .trim();
  matchInfo.team_two_logo = $(item).find("a.mod-2 img").attr("src");
  matchInfo.team_two_score = $(item)
    .find("div.match-header-vs-score div span")
    .eq(2)
    .text()
    .trim();

  //   Team one Players
  $(item)
    .find(
      "#wrapper > div.col-container > div.col.mod-3 > div:nth-child(6) > div > div.vm-stats-container > div.vm-stats-game.mod-active > div:nth-child(2) > div:nth-child(1) > table > tbody > tr"
    )
    .each((index, element) => {
      const tds = $(element).find("td ");
      matchInfo.team_one_players.push({
        player_name: $(tds[0]).find("div.text-of").eq(0).text().trim(),
        player_link: `www.vlr.gg` + $(tds[0]).find("a").attr("href"),
        player_team_initials: $(tds[0]).find("div.ge-text-light").text().trim(),
        player_country_initials: $(tds[0]).find("i").attr("class").slice(-2),
        rating: $(tds[2]).find("span span").eq(0).text().trim(),
        average_combat_score: $(tds[3]).find("span span").eq(0).text().trim(),
        kills: $(tds[4]).find("span span").eq(0).text().trim(),
        deaths: $(tds[5]).find("span span.mod-both").eq(0).text().trim(),
        assists: $(tds[6]).find("span span").eq(0).text().trim(),
        kills_deaths: $(tds[7]).find("span span").eq(0).text().trim(),
        kill_assist_trade_survive_percentage: $(tds[8])
          .find("span span")
          .eq(0)
          .text()
          .trim(),
        average_damage_per_round: $(tds[9])
          .find("span span")
          .eq(0)
          .text()
          .trim(),
        headshot_percentage: $(tds[10]).find("span span").eq(0).text().trim(),
        first_kills: $(tds[11]).find("span span").eq(0).text().trim(),
        first_deaths: $(tds[12]).find("span span").eq(0).text().trim(),
        first_kills_first_deaths: $(tds[13])
          .find("span span")
          .eq(0)
          .text()
          .trim(),
      });
    });

  //   Team two Players
  $(item)
    .find(
      "#wrapper > div.col-container > div.col.mod-3 > div:nth-child(6) > div > div.vm-stats-container > div.vm-stats-game.mod-active > div:nth-child(2) > div:nth-child(2) > table > tbody > tr"
    )
    .each((index, element) => {
      const tds = $(element).find("td ");
      matchInfo.team_two_players.push({
        player_name: $(tds[0]).find("div.text-of").eq(0).text().trim(),
        player_link: `www.vlr.gg` + $(tds[0]).find("a").attr("href"),
        player_team_initials: $(tds[0]).find("div.ge-text-light").text().trim(),
        player_country_initials: $(tds[0]).find("i").attr("class").slice(-2),
        rating: $(tds[2]).find("span span").eq(0).text().trim(),
        average_combat_score: $(tds[3]).find("span span").eq(0).text().trim(),
        kills: $(tds[4]).find("span span").eq(0).text().trim(),
        deaths: $(tds[5]).find("span span.mod-both").eq(0).text().trim(),
        assists: $(tds[6]).find("span span").eq(0).text().trim(),
        kills_deaths: $(tds[7]).find("span span").eq(0).text().trim(),
        kill_assist_trade_survive_percentage: $(tds[8])
          .find("span span")
          .eq(0)
          .text()
          .trim(),
        average_damage_per_round: $(tds[9])
          .find("span span")
          .eq(0)
          .text()
          .trim(),
        headshot_percentage: $(tds[10]).find("span span").eq(0).text().trim(),
        first_kills: $(tds[11]).find("span span").eq(0).text().trim(),
        first_deaths: $(tds[12]).find("span span").eq(0).text().trim(),
        first_kills_first_deaths: $(tds[13])
          .find("span span")
          .eq(0)
          .text()
          .trim(),
      });
    });

  return matchInfo;
}

export {
  scrapePlayers,
  scrapeTeams,
  scrapeEvents,
  scrapeEvent,
  scrapeUpcomingMatches,
  scrapeMatchResults,
  scrapeMatch,
};
