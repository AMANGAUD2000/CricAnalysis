const express = require("express");
const router = express.Router();
var User = require("../models/user.model");
var ShotStats = require("../models/legOffStats.model");

router.post("/shotstats", (req, res) => {
  let shotstats = req.body;
  console.log(shotstats);
  let shots = new ShotStats(shotstats);
  console.log(shots);
  User.findOne({ email: shotstats.Email }, (err, founduser) => {
    if (err) {
      console.log(error);
    } else {
      if (founduser) {
        ShotStats.findOne({ Email: shotstats.Email }, (err, founddetails) => {
          if (err) {
            console.log(err);
          }
          if (founddetails) {
            console.log("Details Already Exists");
            res.status(200).send("Details Already Exists");
          } else {
            shots.save((error, performanceupdated) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).send(performanceupdated);
              }
            });
          }
        });
      } else {
        res.status(401).send("Please register");
      }
    }
  });
});

router.post("/shotstatsdetails", (req, res) => {
  ShotStats.shotsStatics(req.body.email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.send({ ShotsStats: result });
  });
});

module.exports = router;
