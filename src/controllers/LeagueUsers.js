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

module.exports = { GetLeagueUsers };
