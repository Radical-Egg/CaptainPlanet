const axios = require("axios");
const GuildModel = require("../models/Guilds");

const GetLeagueInfo = async (guild_id) => {
  //https://api.sleeper.app/v1/league/<league-id>
  try {
    const guild = new GuildModel();

    let league_data = await guild.retrieve(guild_id);
    let league_id = league_data.get("leagueID");

    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}`
    );
    return response.data;
  } catch (error) {
    console.log(`Unable to get League Info ${error}`);
    return error;
  }
};

module.exports = { GetLeagueInfo };
