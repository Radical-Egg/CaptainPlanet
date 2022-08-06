const axios = require("axios");
const Guild = require("../models/Guild");

const GetLeagueUsers = async (guild_id) => {
  // https://api.sleeper.app/v1/league/<league_id>/users
  try {
    const guild = await Guild.findById(guild_id);

    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${guild.leagueID}/users`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { GetLeagueUsers };
