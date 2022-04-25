const mongoose = require("mongoose");
const shotsStatsSchema = new mongoose.Schema({
  Email: String,
  LegSide: Number,
  OffSide: Number,
});
const ShotsStats = mongoose.model("ShotsStats", shotsStatsSchema);

ShotsStats.shotsStatics = function (email, callback) {
    ShotsStats.findOne({ Email: email }, (err, user) => {
      if (err) {
        console.log(err);
        callback("server error");
      } else if (user == undefined) {
        callback("users performance not found");
      } else {
        callback(null, user);
        // res.send({ T20: user });
      }
    });
  };



module.exports = ShotsStats;
