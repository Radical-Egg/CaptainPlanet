const { GetLeagueInfo } = require("../controllers/LeagueInfo");

/**
 *
 * Notify when there has been a change to score settings
 * Pin latest score settings when a change occurs
 */

/**
 *
 * TODO
 * - From the list of guilds, get a list of guilds that have been registered in the database
 * - pull the scoring settings and message the channel with just the json for now
 * - create an embed object to use as the view
 */

module.exports = {
  name: "scoreSettings",
  execute(client) {
    const Guilds = client.guilds.cache.map((guild) => guild.id);

    Guilds.forEach(async (guild) => {
      try {
        let g = client.guilds.cache.get(guild);

        const chan = await g.channels.cache.find(
          (channel) => channel.name === "score-settings"
        );

        if (chan) {
          chan.send("test");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  },
};
