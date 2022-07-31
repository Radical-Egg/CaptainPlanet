const axios = require("axios");

class SleeperController {
  constructor(id, season, sport) {
    this.id = id;
    this.season = season;
    this.sport = sport;
  }
  GetLeagueUsers() {
    console.log("GetLeagueUsers");
  }
  GetLeague = async () => {
    //https://api.sleeper.app/v1/league/<league-id>
    try {
      const response = await axios.get(
        `https://api.sleeper.app/v1/league/${this.id}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };
  GetWeeklyMatchups() {
    console.log("GetWeeklyMatchups");
  }
}

module.exports = SleeperController;
