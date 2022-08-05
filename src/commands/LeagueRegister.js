const { SlashCommandBuilder } = require("discord.js");
const { register } = require("../controllers/LeagueRegisterController");
const { GetLeagueInfo } = require("../controllers/LeagueInfoController");

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
      const response = await register(guild_data);
      const league = await GetLeagueInfo(response.guildID);
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
          break;
      }

      await interaction.reply(response);
    }
  },
};
