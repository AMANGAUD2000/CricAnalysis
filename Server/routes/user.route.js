var express = require("express");
var router = express.Router();

var User = require("../models/user.model");
router.post("/register", (req, res) => {
  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    profilepic: "",
    no35: "",
    no50: "",
    no100: "",
    clubName: "",
  });

  User.addUser(user, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.json({ success: true, message: result });
  });
});

router.post("/login", (req, res) => {
  User.login(req.body.email, req.body.password, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err });
    }
    return res.json({ success: true, message: result });
  });
});

module.exports = router;
