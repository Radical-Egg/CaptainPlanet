const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChannelType,
} = require("discord.js");

const { createChannel } = require("../controllers/createChannel");

/**
 *
 * This command is just for testing random stuff so I don't need to
 * keep making API calls when testing
 *
 */

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const tradeCateData = {
      body: {
        name: "SLEEPER UPDATES",
        type: ChannelType.GuildCategory,
      },
      reason: "Creating a new category for sleeper API updates",
    };

    const tradeChanData = {
      body: {
        name: "trades",
        type: ChannelType.GuildText,
      },
      reason: "creating a channel for trades",
    };

    const tradeCateChannel = await createChannel(
      interaction.member.guild.channels,
      tradeCateData
    );

    const tradeChannel = await createChannel(
      interaction.member.guild.channels,
      tradeChanData
    );

    tradeChannel.setParent(tradeCateChannel.id);

    await interaction.reply({ content: "Channels created!" });
  },
};
