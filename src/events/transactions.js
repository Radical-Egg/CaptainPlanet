const Guild = require("../models/Guild");

/**
 *
 * Get all transactions and send adds/drops/trades to the
 * appropriate channels
 */

module.exports = {
  name: "transactions",
  async execute(client) {
    const intervalId = setInterval(async () => {
      const Guilds = client.guilds.cache.map((guild) => guild.id);

      const records = await Guild.find({ _id: { $in: Guilds } });

      console.log(records);
    }, 60 * 60 * 1000);
  },
};
