import axios from "axios";
import * as cheerio from "cheerio";

const url =
  "https://www.vlr.gg/167364/zeta-division-vs-leviat-n-champions-tour-2023-lock-in-s-o-paulo-omega-ro16";

const teamsInfo = {
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

const playersInfo = {
  players: [],
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

// scrapePlayers();

export { scrapePlayers };
