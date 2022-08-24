const {
  ActionRowBuilder,
  EmbedBuilder,
  SelectMenuBuilder,
} = require("discord.js");

/**
 * Embed fields can only go up to 25 and max length of a field is 1024
 * split the fields so the max length does not go over 1024
 */

const scoreEmbed = (league_name, scoring_settings) => {
  let fields = [{ name: "Score Settings", value: "" }];
  let pivot = 0;

  // only return settings that are not 0
  for (setting in scoring_settings) {
    if (fields[pivot]["value"].length <= 1000) {
      if (scoring_settings[setting] != 0) {
        fields[pivot]["name"] = "Score Settings";
        fields[pivot]["value"] += `${setting}: ${scoring_settings[
          setting
        ].toString()}\n`;
      }
    } else {
      pivot++;
      fields[pivot] = { name: "Score Settings Continued", value: "" };
    }
  }

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${league_name}`)
    .setDescription(`Scores for ${league_name}`)
    .setThumbnail(
      "https://media3.giphy.com/media/l41K2IFTm55PYLc0E/giphy.gif?cid=ecf05e47uw6u79l03waiaiw9w4bic0nzv2wpzveb9049c9bk&rid=giphy.gif&ct=g"
    )
    .addFields(fields)
    .setTimestamp()
    .setFooter({
      text: "Made with Discord.js",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  return embed;
};

module.exports = { scoreEmbed };
