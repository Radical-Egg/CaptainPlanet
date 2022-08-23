const { GetLeagueInfo } = require("../controllers/LeagueController");
const { UpdateScoringSettings } = require("../controllers/GuildController");
const Guild = require("../models/Guild");
const { isEqual } = require("lodash");

/**
 * Score settings event
 * Check the current score settings against the database
 * If there is a change this event will update the database and send
 * an embed to the score-settings channel with the new score settings
 */

module.exports = {
  name: "scoreSettings",
  async execute(client) {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    const GuildRecords = await Guild.find({ _id: { $in: Guilds } });

    GuildRecords.forEach(async (guild) => {
      let leagueInfo = await GetLeagueInfo(guild.leagueID);
      let currentScoreSettings = leagueInfo["scoring_settings"];

      let updateScores = await UpdateScoringSettings(
        guild,
        currentScoreSettings
      );

      if (!updateScores) {
        console.log("No score changes have been made. Returning");
        return;
      }

      let g = client.guilds.cache.get(guild.guildID);

      const chan = await g.channels.cache.find(
        (channel) => channel.name === "score-settings"
      );

      if (chan) {
        chan.send("There has been a change to the scores!");
        const scoringEmbed = await scoreEmbed(
          leagueInfo.name,
          currentScoreSettings
        );
        chan.send({ embeds: [scoringEmbed] });
      }
    });
  },
};
