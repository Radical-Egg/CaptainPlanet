const axios = require("axios");
const { GetLeagueSportState } = require("./LeagueSportState");

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

module.exports = { GetWeeklyMatchups };
