const axios = require("axios");

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

module.exports = { GetLeagueSportState };
