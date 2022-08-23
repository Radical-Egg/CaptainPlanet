const ChannelData = require("../lib/channel_data.json");

// TODO change namespacing of this file to Channel.js
/**
 *
 * Change namespacing of this file to Channel.js
 * This file will be controller logic for channels
 */

const createChannel = async (interaction, request) => {
  const ChannelManager = interaction.member.guild.channels;
  const everyone = interaction.member.guild.roles.everyone.id;

  request.body.permissionsOverwrites = [
    {
      id: everyone,
      deny: ["VIEW_CHANNEL"],
    },
  ];

  try {
    const findChannel = await ChannelManager.cache.find(
      (channel) =>
        channel.type === request.body.type && channel.name === request.body.name
    );

    if (!findChannel) {
      const createChannel = await ChannelManager.create(
        request.body,
        request.reason
      );
      return createChannel;
    }

    return findChannel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CreateInitialChannels = async (interaction) => {
  try {
    const tradeCateChannel = await createChannel(
      interaction,
      ChannelData["TradesCategory"]
    );

    ChannelData["TradesCategory"]["Channels"].forEach(async (channel) => {
      let chan = await createChannel(interaction, channel);
      chan.setParent(tradeCateChannel.id);
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// TODO add options object
/**
 *
 * Add options object for functionality like pin/unpin
 */
const UpdateChannelWithEmbed = async (guild, channel_name, embed) => {
  const allChannels = await guild.channels.fetch(null, {
    force: true,
    cache: false,
  });

  const findChannel = await allChannels.find(
    (channel) => channel.name === channel_name
  );

  if (findChannel) {
    const pinned = await findChannel.messages.fetchPinned();
    pinned.forEach((msg) => msg.unpin());

    await findChannel
      .send({
        embeds: [embed],
      })
      .then((msg) => msg.pin());
  }
};

module.exports = {
  createChannel,
  CreateInitialChannels,
  UpdateChannelWithEmbed,
};
