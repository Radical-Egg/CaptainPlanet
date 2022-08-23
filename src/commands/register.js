const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { CreateOrUpdateGuild } = require("../controllers/GuildController");
const { GetLeagueInfo } = require("../controllers/LeagueController");
const { scoreEmbed } = require("../embeds/Scoring");
const {
  CreateInitialChannels,
  UpdateChannelWithEmbed,
} = require("../controllers/CreateChannel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register your league")
    .addStringOption((option) =>
      option
        .setName("league-id")
        .setDescription("Register the League ID with this Server")
        .setRequired(true)
    ),

  async execute(interaction) {
    guild_data = {
      _id: interaction.guildId,
      guildID: interaction.guildId,
      leagueID: interaction.options.getString("league-id"),
    };

    try {
      const league = await GetLeagueInfo(guild_data.leagueID);

      guild_data["league"] = {
        _id: `${guild_data.leagueID}`,
        scoring_settings: league.scoring_settings,
      };

      const response = await CreateOrUpdateGuild(guild_data);

      await CreateInitialChannels(interaction);
      await UpdateChannelWithEmbed(
        interaction,
        "score-settings",
        scoreEmbed(league.name, league.scoring_settings)
      );

      await interaction.reply(`${league.name} has been registered!`);
      return;
    } catch (error) {
      var response;
      switch (error) {
        case "ERR_BAD_REQUEST":
          response =
            "This League does not exist, please check your league ID and try registering again.";
          break;
        case 11000:
          response =
            "There is already a leagueID associated with this server. Run the /update command if you need to change it.";
          break;
        case 404:
          response =
            "Unable to retrieve league information from the sleeper API. Check your LeagueID and try again";
          break;
        default:
          response = "An Error has occurred when executing this command";
          console.log(error);
          break;
      }

      await interaction.reply(response);
    }
  },
};
