const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Odi = require("../models/odi.model");

router.post("/odiperformance", (req, res) => {
  let odiperformance = req.body;
  console.log(odiperformance);
  let odi = new Odi(odiperformance);
  console.log(odi);
  User.findOne({ email: odiperformance.Email }, (err, founduser) => {
    if (err) {
      console.log(error);
    } else {
      if (founduser) {
        Odi.findOne({ Email: odiperformance.Email }, (err, founddetails) => {
          if (err) {
            console.log(err);
          }
          if (founddetails) {
            console.log("Details Already Exists");
            res.status(200).send("Details Already Exists");
          } else {
            odi.save((error, performanceupdated) => {
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
// router.post("/odi", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     const getOdiData = await Odi.find({ email: req.body.email });
//     console.log(getOdiData);
//     res.send({ ODI: getOdiData });
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });
router.post("/odi", (req, res) => {
  Odi.odip(req.body.email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.send({ ODI: result });
  });
});
module.exports = router;

// router.post("/odi", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     // const getOdiData = await Odi.findOne({ email: req.body.email });
//     Odi.findOne({ Email: req.body.email }, (err, user) => {
//       if (err) {
//         console.log(err);
//         callback("server error");
//       } else if (user == undefined) {
//         callback("user not found");
//       } else {
//         res.send({ ODI: user });
//       }
//     });
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });
