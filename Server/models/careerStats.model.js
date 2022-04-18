const mongoose = require("mongoose");
const careerStatsSchema = new mongoose.Schema({
  Email: String,
  Out35b50: Number,
  Out50b100: Number,
  no35: Number,
  no50: Number,
  no100: Number,
  TotalRuns: Number,
  TotalMatches: Number,
  BestScore:Number
});
const CareerStats = mongoose.model("CareerStats", careerStatsSchema);

CareerStats.careerDetails = function (email, callback) {
  CareerStats.findOne({ Email: email }, (err, user) => {
    if (err) {
      console.log(err);
      callback("server error");
    } else if (user == undefined) {
      callback("users career not found");
    } else {
      callback(null, user);
      // res.send({ T20: user });
    }
  });
};

module.exports = CareerStats;
