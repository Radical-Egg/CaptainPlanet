const { SlashCommandBuilder } = require("discord.js");
const GuildModel = require("../Models/Guilds");

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
      guildID: interaction.guildId,
      leagueID: interaction.options.getString("league-id"),
    };

    try {
      const guild = new GuildModel();
      register = await guild.create(guild_data);
      await interaction.reply(register);
    } catch (error) {
      await interaction.reply(error);
    }
  },
};
