const axios = require("axios");
const Guild = require("../models/Guild");

/** // TODO
 *  process matchup data
 * The matchup data returns jsons where each user has a match ID and user ID
 * the two matching matchup ID's are the ones who are facing each other for the week
 * will need to process GetWeeklyMatchup in order to determine who is matching up with who
 *  */

// We can use this function to get the current week or a specific week
const GetWeeklyMatchups = async (week) => {
  // https://api.sleeper.app/v1/league/<league_id>/matchups/<week>

  try {
    const response = axios.get(
      `https://api.sleeper.app/v1/league/<league_id>/matchups/${week}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// https://docs.sleeper.app/#get-nfl-state
// GET https://api.sleeper.app/v1/state/<sport>
const GetLeagueSportState = async () => {
  try {
    const response = await axios.get(`https://api.sleeper.app/v1/state/nfl`);
    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * GET https://api.sleeper.app/v1/league/<league-id>
 * The league ID comes from the Guild model in the database
 */

const GetLeagueInfo = async (guild_id) => {
  try {
    const guild = await Guild.findById(guild_id);

    if (guild.leagueID === undefined) {
      throw "There is no league ID assosciated with this guild. Register before using this command";
    }

    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${guild.leagueID}`
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

module.exports = {
  GetWeeklyMatchups,
  GetLeagueSportState,
  GetLeagueInfo,
  GetLeagueUsers,
};
