const { GUILD_ID, LEAGUE_ID } = require("../config.json");
const MongoDB = require("../src/models/Database");
const { register } = require("../src/controllers/AddAllPlayers");
const Players = require("../src/models/Player");
const PlayerData = require("../src/utils/player_data.json");
const axios = require("axios");

jest.mock("axios");

describe("Fetch all players from sleeper API", () => {
  it("If there are no write errors return success", async () => {
    axios.get.mockResolvedValue({
      data: [PlayerData],
    });

    const bulkWrite = await GetAllPlayers();
    expect(len(bulkWrite.result.writeErrors)).toEqual(0);
  });
});
