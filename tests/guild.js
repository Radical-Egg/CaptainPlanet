const { GUILD_ID, LEAGUE_ID } = require("../config.json");
const MongoDB = require("../src/models/Database");
const { register } = require("../src/controllers/LeagueRegisterController");
const axios = require("axios");

MongoDB.init();
jest.mock("axios");

describe("Create or Update guild document", () => {
  it("returns guild._update if success", async () => {
    axios.get.mockResolvedValue({
      data: {
        _id: GUILD_ID[0],
        guildID: GUILD_ID,
        leagueID: LEAGUE_ID,
      },
    });
    const guild_data = {
      _id: GUILD_ID[0],
      guildID: GUILD_ID[0],
      leagueID: LEAGUE_ID,
    };
    const guild = await register(guild_data);
    expect(guild.guildID).toEqual(GUILD_ID[0]);
    //expect(guild.leagueID).toEqual(LEAGUE_ID);
  });
});

describe("Close database connection", () => {
  it("Returns true is DB closes sucessfully", async () => {
    const close_db = await MongoDB.close();
    expect(close_db).toEqual(true);
  });
});
