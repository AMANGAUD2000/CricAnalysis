const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  TournamentName: String,
  Opponent: String,
  Location: String,
  Date: Date,
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
