const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  _id: String,
  guildID: {
    type: String,
    required: true,
  },
  leagueID: String,
});

guildSchema.pre("findOneAndUpdate", function (next) {
  (this.options.runValidators = true), next();
});

module.exports = mongoose.model("Guild", guildSchema);
