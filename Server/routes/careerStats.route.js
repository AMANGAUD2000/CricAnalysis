const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const CareerStats = require("../models/careerStats.model");

router.post("/careerstats", (req, res) => {
  let careerstats = req.body;
  console.log(careerstats);
  let career = new CareerStats(careerstats);
  console.log(career);
  User.findOne({ email: careerstats.Email }, (err, founduser) => {
    if (err) {
      console.log(error);
    } else {
      if (founduser) {
        CareerStats.findOne(
          { Email: careerstats.Email },
          (err, founddetails) => {
            if (err) {
              console.log(err);
            }
            if (founddetails) {
              console.log("Details Already Exists");
              res.status(200).send("Details Already Exists");
            } else {
              career.save((error, careerupdated) => {
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).send(careerupdated);
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
router.post("/career", async (req, res) => {
  CareerStats.careerDetails(req.body.email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.send({ Career: result });
  });
});
module.exports = router;
