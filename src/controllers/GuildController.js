const { isEqual } = require("lodash");
const { GetLeagueInfo } = require("./LeagueController");
const Guild = require("../models/Guild");

/**
 *
 * Register leagueID with the guild the message is coming from
 * This will allow the bot to handle multiple discord servers
 * The register command will create the DB entry if it does not exist
 * If it does exist it will update it
 *
 * This function actually is just going to be used to find and update the guild model, possibly
 * need to rename
 */

const CreateGuild = async (req) => {
  try {
    const guild = await new Guild(req, (err, resp) => {
      if (err) {
        console.log("Something went wrong");
        console.log(err);
        return err;
      }
    });

    await guild.save();

    return guild;
  } catch (error) {
    throw error;
  }
};

const CreateOrUpdateGuild = async (req) => {
  try {
    const options = { upsert: true, new: true };
    const guild = Guild.findByIdAndUpdate(
      req._id,
      req,
      options,
      (err, resp) => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
    return guild._update;
  } catch (error) {
    throw error.code;
  }
};
const DeleteById = async (req) => {
  try {
    const deleteCount = Guild.deleteOne({ _id: req });

    return deleteCount;
  } catch (error) {
    throw error;
  }
};

const FindById = async (req) => {
  try {
    const find = await Guild.findById(req).exec();

    return find;
  } catch (error) {
    throw error;
  }
};

const UpdateScoringSettings = async (guild_record, currentScoreSettings) => {
  let recordScoreSettings = guild_record.league.scoring_settings;
  if (isEqual(currentScoreSettings, recordScoreSettings)) {
    return false;
  } else {
    recordScoreSettings = currentScoreSettings;
    guild_record.league.scoring_settings = currentScoreSettings;

    await guild_record.save();
    return guild_record;
  }
};

module.exports = {
  CreateGuild,
  CreateOrUpdateGuild,
  DeleteById,
  UpdateScoringSettings,
  FindById,
};
