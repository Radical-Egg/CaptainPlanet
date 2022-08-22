const { close, connect, dropCollections } = require("./db");
const mongoose = require("mongoose");
const Guild = require("../src/models/Guild");
const MockGuild = require("./mock_data/guild.json");
const GuildController = require("../src/controllers/GuildController");

/**
 * Connect to a new in-memory database before running any tests.
 */

beforeAll(async () => await connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dropCollections());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await close());

describe("Guild document CRUD Operations", () => {
  it("Succeed when Guild document is created", async () => {
    let mg = MockGuild.MockGuild;
    let guild = await GuildController.CreateGuild(mg);

    await expect(guild).toBeDefined();
    await expect(guild._id).toBe(mg._id);
    await expect(guild.guildID).toBe(mg.guildID);
    await expect(guild.leagueID).toBe(mg.leagueID);
  });

  it("Fail when bad data is used to create", async () => {
    try {
      let mg = MockGuild.BadMockData;
      let guild = await GuildController.CreateGuild(mg);
    } catch (error) {
      expect(error._message).toBe("Guild validation failed");
      expect(error).toBeDefined();
    }
  });

  it("Create or update existing guild by ID", async () => {
    try {
      let newGuildID = "9876543";
      let mg = MockGuild.MockGuild;
      let guild = await GuildController.CreateOrUpdateGuild(mg);

      guild.guildID = newGuildID;

      guild = await GuildController.CreateOrUpdateGuild(guild);

      await expect(guild).toBeDefined();
      await expect(guild.guildID).toBe(newGuildID);
    } catch (error) {
      console.log(error);
      await expect(error).toBe(null);
    }
  });
  it("Delete guild by ID", async () => {
    try {
      let mg = MockGuild.MockGuild;
      guild = await GuildController.CreateGuild(mg);
      deleteGuild = await GuildController.DeleteById(guild._id);

      await expect(deleteGuild.deletedCount).toBe(1);
      await expect(deleteGuild.acknowledged).toBe(true);
    } catch (error) {
      console.log(error);
      await expect(error).toBe(null);
    }
  });
  it("Find guild by ID", async () => {
    try {
      let mg = MockGuild.MockGuild;
      guild = await GuildController.CreateGuild(mg);
      find = await GuildController.FindById(mg._id);

      await expect(find._id).toBe(guild._id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});

describe("Update Scoring setting operations", () => {
  it("Succeed if score settings can be updated when not matching", async () => {
    try {
      let mg = MockGuild.MockGuild;
      let newScores = MockGuild.MockGuildScoring.league.scoring_settings;

      let createGuild = await GuildController.CreateGuild(mg);
      let guild = await GuildController.FindById(createGuild.id);

      let updateGuild = await GuildController.UpdateScoringSettings(
        guild,
        newScores
      );
      await expect(updateGuild.league.scoring_settings).toBe(newScores);
    } catch (error) {
      throw error;
    }
  });
  it("Succeed and not update if scoring settings do match", async () => {
    try {
      let mg = MockGuild.MockGuild;
      let newScores = MockGuild.MockGuildScoring.league.scoring_settings;

      let createGuild = await GuildController.CreateGuild(mg);
      let guild = await GuildController.FindById(createGuild.id);

      let updateGuild = await GuildController.UpdateScoringSettings(
        guild,
        guild.league.scoring_settings
      );
      expect(updateGuild).toBe(true);
    } catch (error) {
      throw error;
    }
  });
});
