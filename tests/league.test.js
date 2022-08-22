const { GUILD_ID, LEAGUE_ID } = require("../config.json");
const MockLeagueData = require("./mock_data/league.json");

const {
  GetLeagueUsers,
  GetLeagueInfo,
} = require("../src/controllers/LeagueController");

const axios = require("axios");

jest.mock("axios");

describe("Get League Info from Sleeper API", () => {
  it("Returns response.data if successful", async () => {
    axios.get.mockResolvedValue({
      data: MockLeagueData["leagueInfo"],
    });

    const leagueInfo = await GetLeagueInfo(LEAGUE_ID);
    expect(leagueInfo.name).toEqual(MockLeagueData["leagueInfo"].name);
  });
});

describe("Get league users from sleeper API", () => {
  it("returns response.data if successful", async () => {
    axios.get.mockResolvedValue({
      data: MockLeagueData["leagueUsers"],
    });

    const users = await GetLeagueUsers(LEAGUE_ID);

    users.forEach((user) => {
      expect(user.display_name).toEqual(user.display_name);
    });
  });
});
