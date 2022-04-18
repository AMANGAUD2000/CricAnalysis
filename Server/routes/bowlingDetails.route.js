const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Bowling = require("../models/bowling.model");

router.post("/bowlingperformance", (req, res) => {
  let bowlingperformance = req.body;
  console.log(bowlingperformance);
  let bowling = new Bowling(bowlingperformance);
  console.log(bowling);
  User.findOne({ email: bowlingperformance.Email }, (err, founduser) => {
    if (err) {
      console.log(err);
    } else {
      if (founduser) {
        Bowling.findOne(
          { Email: bowlingperformance.Email },
          (err, founddetails) => {
            if (err) {
              console.log(err);
            }
            if (founddetails) {
              console.log("Details Already Exists");
              res.status(200).send("Details Already Exists");
            } else {
              bowling.save((error, performanceupdated) => {
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).send(performanceupdated);
                }
              });
            }
          }
        );
      } else {
        res.status(401).send("Please register");
      }
    }
  });
});
router.post("/bowlingdetails", async (req, res) => {
  Bowling.BowlingDetails(req.body.email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.send({ Bowling: result });
  });
});
module.exports = router;
