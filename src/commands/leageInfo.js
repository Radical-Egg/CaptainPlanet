const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GetLeagueInfo } = require(`../controllers/LeagueInfo`);
const { LEAGUE_ID } = require(`../../config.json`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leagueinfo")
    .setDescription("Information about the league"),
  async execute(interaction) {
    const league = await GetLeagueInfo(LEAGUE_ID);

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
  },
};
