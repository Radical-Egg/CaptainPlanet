const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  _id: String,
  guildID: String,
  leagueID: String,
});

module.exports = mongoose.model("Guild", guildSchema);
