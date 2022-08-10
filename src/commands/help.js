const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Available commands and usage for this bot"),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Captain Planet Bot")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "Captain Planet Bot",
        iconURL: "https://c.tenor.com/uhVmSda0bSAAAAAd/nfl-squidward.gif",
        url: "https://github.com/Radical-Egg/CaptainPlanet",
      })
      .setDescription(
        `Captain Planet bot has some commands to check your Sleeper Fantasy football league.

        This bot can only handle one league per server, use the register command to switch between leauges as needed.`
      )
      .setThumbnail("https://c.tenor.com/uhVmSda0bSAAAAAd/nfl-squidward.gif")
      .addFields(
        {
          name: "/register",
          value:
            "Register your league with the discord server.\n\n Usage: /register <league-id>",
        },
        {
          name: "League Info",
          value: "General information about your league\n\n Usage: /leagueinfo",
        },
        {
          name: "Get the current weeks matchups",
          value: "Weekly matchups\n\n Usage: /weeklymatchups",
        },
        {
          name: "Score settings",
          value:
            "Check current score settings for the leauge\n\n Usage: /scoresettings",
        }
      )
      //.setImage("https://c.tenor.com/uhVmSda0bSAAAAAd/nfl-squidward.gif")
      .setTimestamp()
      .setFooter({
        text: "\u3000".repeat(20 /*any big number works too*/) + "|",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
