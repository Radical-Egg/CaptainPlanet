const axios = require("axios");

const GetLeagueUsers = async (league_id) => {
  // https://api.sleeper.app/v1/league/<league_id>/users
  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}/users`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetLeagueInfo = async (league_id) => {
  //https://api.sleeper.app/v1/league/<league-id>
  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}`
    );
    return response.data;
  } catch (error) {
    console.log(`Unable to get League Info ${error}`);
    return error;
  }
};
function GetWeeklyMatchups() {
  console.log("GetWeeklyMatchups");
}

module.exports = { GetLeagueUsers, GetLeagueInfo, GetWeeklyMatchups };
