const mongoose = require("mongoose");

const leagueScehma = new mongoose.Schema({
  _id: String,
  scoring_settings: Object,
});

leagueScehma.pre("findOneAndUpdate", function (next) {
  (this.options.runValidators = true), next();
});

module.exports = { leagueScehma };
