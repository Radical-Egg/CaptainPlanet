const { GUILD_ID, LEAGUE_ID } = require("../config.json");
const MongoDB = require("../src/models/Database");
const { CreateOrUpdateGuild } = require("../src/controllers/GuildController");
const axios = require("axios");

MongoDB.init();
jest.mock("axios");

describe("Create or Update guild document", () => {
  it("returns guild._update if success", async () => {
    GUILD_ID.forEach(async (element) => {
      const guild_data = {
        _id: element,
        guildID: element,
        leagueID: LEAGUE_ID,
      };

      axios.get.mockResolvedValue({
        data: guild_data,
      });

      const guild = await CreateOrUpdateGuild(guild_data);
      expect(guild.guildID).toEqual(element);
    });
  });
});

describe("Close database connection", () => {
  it("Returns true is DB closes sucessfully", async () => {
    const close_db = await MongoDB.close();
    expect(close_db).toEqual(true);
  });
});
