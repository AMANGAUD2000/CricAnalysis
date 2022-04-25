const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Test = require("../models/test.model");

router.post("/testperformance", (req, res) => {
  let testperformance = req.body;
  console.log(testperformance);
  let test = new Test(testperformance);
  console.log(test);
  User.findOne({ email: testperformance.Email }, (err, founduser) => {
    if (err) {
      console.log(err);
    } else {
      if (founduser) {
        Test.findOne({ Email: testperformance.Email }, (err, founddetails) => {
          if (err) {
            console.log(err);
          }
          if (founddetails) {
            console.log("Details Already Exists");
            res.status(200).send("Details Already Exists");
          } else {
            test.save((error, performanceupdated) => {
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
// router.post("/test", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     const getTestData = await Test.find({ email: req.body.email });
//     console.log(getTestData);
//     res.send({ Test: getTestData });
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });
router.post("/test", (req, res) => {
  Test.testp(req.body.email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.send({ TEST: result });
  });
});
module.exports = router;

// router.post("/test", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     // const getOdiData = await Odi.findOne({ email: req.body.email });
//     Test.findOne({ Email: req.body.email }, (err, user) => {
//       if (err) {
//         console.log(err);
//         callback("server error");
//       } else if (user == undefined) {
//         callback("user not found");
//       } else {
//         res.send({ TEST: user });
//       }
//     });
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });
