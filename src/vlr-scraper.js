import axios from "axios";
import * as cheerio from "cheerio";

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
  tournament_name: "",
  tournament_logo: "",
  match_url: "",
  match_day: "",
  team_one_name: "",
  team_one_logo: "",
  team_two_name: "",
  team_two_logo: "",
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
        event_url: `www.vlr.gg` + $(element).attr("href"),
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

export { scrapePlayers, scrapeTeams, scrapeEvents };
