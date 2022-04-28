var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "strongsecretkey";

var User = require("../models/user.model");
router.post("/register", (req, res) => {
  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    profilepic: req.body.profilepic,
    DOB: req.body.DOB,
    clubName: req.body.clubName,
    Nationality: req.body.Nationality,
  });

  User.addUser(user, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.json({ success: true, message: result });
  });
});

router.post("/login", (req, res) => {
  User.login(
    req.body.email,
    req.body.password,
    (err, result, token, expiryTime) => {
      if (err) {
        return res.json({ success: false, message: err });
      }

      return res.json({
        success: true,
        message: result,
        token: token,
        expiryTime: expiryTime,
      });
    }
  );
});

router.post("/profile", async (req, res) => {
  try {
    console.log(req.body.email);
    const getUser = await User.find({ email: req.body.email });
    console.log(getUser);
    res.send({ User: getUser });
  } catch (err) {
    console.log("Something went wrong");
  }
});

module.exports = router;
