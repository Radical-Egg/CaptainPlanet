const axios = require("axios");
const Guild = require("../models/Guild");

/**
 * GET https://api.sleeper.app/v1/league/<league-id>
 * The league ID comes from the Guild model in the database
 */

const GetLeagueInfo = async (guild_id) => {
  try {
    const guild = await Guild.findById(guild_id);

    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${guild.leagueID}`
    );

    if (response.data === null) {
      throw "This league does not exist! Please check your leagueID";
    }

    return response.data;
  } catch (error) {
    console.log(`Unable to get League Info ${error}`);
    throw "Unable to retrieve league information - Make sure your league is registered. See /help command";
  }
};

module.exports = { GetLeagueInfo };
