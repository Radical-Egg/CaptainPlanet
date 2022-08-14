const axios = require("axios");
const Guild = require("../models/Guild");

/**
 * GET https://api.sleeper.app/v1/league/<league-id>
 * The league ID comes from the Guild model in the database
 */

const GetLeagueInfo = async (league_id) => {
  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}`
    );

    if (response.data === null) {
      throw "This league does not exist! Please check your leagueID";
    }

    return response.data;
  } catch (error) {
    console.log(`Unable to get League Info ${error}`);
    throw error.response.status;
  }
};

module.exports = { GetLeagueInfo };
