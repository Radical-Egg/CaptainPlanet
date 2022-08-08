const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GetLeagueInfo } = require(`../controllers/LeagueInfo`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leagueinfo")
    .setDescription("Information about the league"),
  async execute(interaction) {
    try {
      const league = await GetLeagueInfo(interaction.guildId);
      const infoEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(league.name)
        .setURL("https://discord.js.org/")
        .setDescription(`${interaction.member} Please stop smoking mids`)
        .setThumbnail("https://i.imgur.com/AfFp7pu.png")
        .addFields(
          { name: "League Status", value: league.status, inline: true },
          { name: "Season Type", value: league.season_type, inline: true },
          {
            name: "Total Roster Size",
            value: String(league.total_rosters),
            inline: true,
          }
        )
        .addFields({ name: "Season", value: league.season })
        .setImage("https://i.imgur.com/AfFp7pu.png")
        .setTimestamp()
        .setFooter({
          text: "Smoke me up",
          iconURL: "https://i.imgur.com/AfFp7pu.png",
        });

      await interaction.reply({ embeds: [infoEmbed] });
    } catch (error) {
      var err_response;
      switch (error) {
        case 404:
          err_response =
            "This league does not exist! Please check your leagueID";
          break;
        default:
          err_response =
            "Unable to get League Info - Make sure your league is registered. See /help";
          break;
      }
      await interaction.reply(err_response);
    }
  },
};
