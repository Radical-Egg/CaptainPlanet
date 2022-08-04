const { SlashCommandBuilder } = require("discord.js");
const GuildModel = require("../Models/Guilds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Update your leauge ID")
    .addStringOption((option) =>
      option
        .setName("league-id")
        .setDescription("Update the League ID for this Server")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const guild = new GuildModel();
      update = await guild.update(interaction.guildId, {
        leagueID: interaction.options.getString("league-id"),
      });
      await interaction.reply(update);
    } catch (error) {
      await interaction.reply(error);
    }
  },
};
