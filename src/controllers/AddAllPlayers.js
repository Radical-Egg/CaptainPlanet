const Players = require("../models/Player");
const DB = require("../models/Database");
const axios = require("axios");

GetAllPlayers = async () => {
  try {
    // This API call should be used sparingly - do not use more than once a day :C
    const response = await axios.get(`https://api.sleeper.app/v1/players/nfl`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.status;
  }
};

AddAllPlayers = async () => {
  const PlayerData = await GetAllPlayers();
  var player_map = [];

  Object.keys(PlayerData).map((key) => {
    const pl = PlayerData[key];

    if (pl.player_id !== undefined && pl.full_name != undefined) {
      player_map.push(pl);
    }
  });

  const player_bulkWrite = await Players.bulkWrite(
    player_map.map((pl) => ({
      updateOne: {
        filter: {
          _id: pl.player_id,
          player_id: pl.player_id,
          first_name: pl.first_name,
          last_name: pl.last_name,
          full_name: pl.full_name,
          search_last_name: pl.search_last_name,
          search_first_name: pl.search_first_name,
          active: pl.active,
          injury_status: pl.injury_status,
          injury_start_date: pl.injury_start_date,
          position: pl.position,
          fantasy_data_id: pl.fantasy_data_id,
        },
        update: { $set: pl },
        upsert: true,
      },
    }))
  );

  return player_bulkWrite;
};

module.exports = { AddAllPlayers };
