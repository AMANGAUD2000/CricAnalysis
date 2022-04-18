const mongoose = require("mongoose");
const bowlingDetailsSchema = new mongoose.Schema({
  Email: String,
  BowlingStyle: String,
  Economy: Number,
  AverageSpeed: Number,
  TotalWickets: Number,
  T20Wickets: Number,
  OdiWickets: Number,
  TestWickets: Number,
});
const Bowling = mongoose.model("Bowling", bowlingDetailsSchema);
Bowling.BowlingDetails = function (email, callback) {
  Bowling.findOne({ Email: email }, (err, user) => {
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

module.exports = Bowling;
