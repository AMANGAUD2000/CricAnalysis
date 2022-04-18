const express = require("express");
const router = express.Router();
var User = require("../models/user.model");
var T20 = require("../models/t20.model");

router.post("/t20performance", (req, res) => {
  let t20performance = req.body;
  console.log(t20performance);
  let t20 = new T20(t20performance);
  console.log(t20);
  User.findOne({ email: t20performance.Email }, (err, founduser) => {
    if (err) {
      console.log(error);
    } else {
      if (founduser) {
        T20.findOne(
          { Email: t20performance.Email },
          (err, founddetails) => {
            if (err) {
              console.log(err);
            }
            if (founddetails) {
              console.log("Details Already Exists");
              res.status(200).send("Details Already Exists");
            } else {
              t20.save((error, performanceupdated) => {
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

router.post("/t20", (req, res) => {
  T20.t20p(req.body.email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.send({ T20: result });
  });
});

module.exports = router;

// router.post("/t20", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     // const getOdiData = await Odi.findOne({ email: req.body.email });
//     T20.findOne({ Email: req.body.email }, (err, user) => {
//       if (err) {
//         console.log(err);
//         callback("server error");
//       } else if (user == undefined) {
//         callback("user not found");
//       } else {
//         res.send({ T20: user });
//       }
//     });
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });
