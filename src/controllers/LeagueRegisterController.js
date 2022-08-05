const Guild = require("../models/Guild");

/**
 *
 * Register leagueID with the guild the message is coming from
 * This will allow the bot to handle multiple discord servers
 * The register command will create the DB entry if it does not exist
 * If it does exist it will update it
 */

const register = async (guild_data) => {
  try {
    const options = { upsert: true, new: true };
    const guild = Guild.findByIdAndUpdate(
      guild_data._id,
      guild_data,
      options,
      (err, resp) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          console.log("Updated Guild Entry ", resp);
        }
      }
    );

    return guild._update;
  } catch (error) {
    throw error;
  }
};

module.exports = { register };
