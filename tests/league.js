const { GUILD_ID, LEAGUE_ID } = require("../config.json");
const MongoDB = require("../src/models/Database");
const { GetLeagueUsers } = require("../src/controllers/LeagueUsers");
const axios = require("axios");

jest.mock("axios");

describe("Get league users from sleeper API", () => {
  it("returns response.data if successful", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          user_id: "1237478223",
          is_bot: false,
          display_name: "RadicalEgg",
        },
        {
          user_id: "1235443234",
          is_bot: true,
          display_name: "bot_dude",
        },
      ],
    });

    const users = await GetLeagueUsers(GUILD_ID[1]);
    expect(users[0].display_name).toEqual("RadicalEgg");
  });
});
