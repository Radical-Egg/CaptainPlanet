const axios = require("axios");

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

module.exports = { GetLeagueInfo };
