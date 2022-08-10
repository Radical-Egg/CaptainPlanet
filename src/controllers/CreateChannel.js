/**
 *
 * request = {
 *  body: {
 *    name: <some name>,
 *    type: channelType enum,
 *  },
 *  reason: some reason for creating a channel or cate
 * }
 */

const createChannel = async (ChannelManager, request) => {
  try {
    const findChannel = await ChannelManager.cache.find(
      (channel) =>
        channel.type == request.body.type && channel.name == request.body.name
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

module.exports = { createChannel };
