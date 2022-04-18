const mongoose = require("mongoose");
const t20PerformanceSchema = new mongoose.Schema({
  Email: String,
  year1: Number,
  run1: Number,
  year2: Number,
  run2: Number,
  year3: Number,
  run3: Number,
  year4: Number,
  run4: Number,
  year5: Number,
  run5: Number,
});
var T20 = mongoose.model("T20", t20PerformanceSchema);

T20.t20p = function (email, callback) {
  T20.findOne({ Email: email }, (err, user) => {
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

module.exports = T20;
