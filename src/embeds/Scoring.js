const { EmbedBuilder } = require("discord.js");

// TODO add scoring data to this embed
/**
 *
 * Review the scoring_settings and update this embed
 */
const scoreEmbed = (league_name, scoring_settings) => {
  let fields = [
    { name: "test", value: "some other test" },
    { name: "ok sure", value: "yeah np" },
  ];

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${league_name}`)
    .setDescription(`Scores for ${league_name}`)
    .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .addFields(fields)
    .setImage("https://i.imgur.com/AfFp7pu.png")
    .setTimestamp()
    .setFooter({
      text: "Smoke me up",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  return embed;
};

module.exports = { scoreEmbed };
