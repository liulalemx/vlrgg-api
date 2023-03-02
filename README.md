<h1 align="center">VLR.GG API</h1>
<p align="center">
  <strong>Unofficial REST API for vlr.gg</strong>
</p>

---

This API is currently hosted on a free cyclic server, please host it on your own server for prodcution use

## Endpoints

For more detailed documentation, check the [docs](https://documenter.getpostman.com/view/21591099/2s93CUHVaw).

- All responses are cached for 24hrs

### `/api/rankings/:region`

- Method: `GET`
- Response:

  ```js
  {
  "teams": [
    {
      "team_name": str,
      "team_logo": str,
      "team_url": str,
      "team_rank": str,
      "rating_score": str,
      "recent_match": {
        "match_url": str,
        "match_time": str,
        "opponent_team_name": str,
        "opponent_team_logo_url": str
      },
      "win_streak": str,
      "record": str,
      "total_winnings": str
    },
    ...
    ]
    }
  ```

### `/api/players`

- Method: `GET`
- Response:

  ```js
  {
  "players": [
    {
      "player_name": str,
      "player_link": str,
      "player_team_initials": str,
      "player_country_initials": str,
      "rounds_played": st,
      "rating": str,
      "average_combat_score": str,
      "kills_deaths": str,
      "kill_assist_trade_survive_percentage": str,
      "average_damage_per_round": str,
      "kills_per_round": str,
      "assists_per_round": str,
      "first_kills_per_round": str,
      "first_deaths_per_round": str,
      "headshot_percentage": str,
      "clutch_success_percentage": str,
      "max_kills_in_single_map": str,
      "kills": str,
      "deaths": str
    },
    ...
    ]
    }
  ```

### `/api/events`

- Method: `GET`
- Response:
  ```js
  {
  "events": [
    {
      "event_name": str,
      "event_logo": str,
      "event_url": str,
      "prize_pool": str,
      "dates": str,
      "region": str
    },
    ...
    ]
    }
  ```

### `/api/matches/upcoming`

- Method: `GET`
- Response:
  ```js
  {
  "matches": [
    {
      "team_one_name": str,
      "team_two_name": str,
      "match_url": str,
      "event_name": str,
      "event_icon_url": str,
      "match_time": str,
      "eta": str
    },
    ...
    ]
    }
  ```

### `/api/matches/results`

- Method: `GET`
- Response:
  ```js
  {
  "matches": [
    {
      "team_one_name": str,
      "team_two_name": str,
      "team_one_score": str,
      "team_two_score": str,
      "match_url": str,
      "event_name": str,
      "event_icon_url": str,
      "match_time": str,
      "eta": str
    },
    ...
    ]
    }
  ```

## How to run locally

### Prerequisites

- [nodejs](https://nodejs.org/en/)

1. Clone the repository
1. Run `yarn install`
1. Run `yarn build` on the root directory
1. Run `npm dev`
