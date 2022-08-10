const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  _id: String,
  player_id: String,
  injury_start_date: String,
  height: String,
  search_last_name: String,
  search_first_name: String,
  full_name: String,
  last_name: String,
  first_name: String,
  position: String,
  fantasy_data_id: Number,
  injury_status: String,
  active: Boolean,
});

playerSchema.pre("findOneAndUpdate", function (next) {
  (this.options.runValidators = true), next();
});

module.exports = mongoose.model("Player", playerSchema);
