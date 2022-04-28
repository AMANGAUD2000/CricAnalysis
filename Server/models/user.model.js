const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "strongestsecretkey";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Username cannot be blank"],
  },
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "Phone number  cannot be blank"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
  profilepic: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  clubName: {
    type: String,
  },
  Nationality: {
    type: String,
  },
});

var User = mongoose.model("User", userSchema);
User.addUser = function (user, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback("server error");
    } else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          callback("server error");
        } else {
          user.password = hash;
          user.save((err, result) => {
            if (err) {
              console.log(err);
              callback(
                "User with this mobile number or email id already exists",
                null
              );
            } else {
              callback(null, "User added");
            }
          });
        }
      });
    }
  });
};

//login

User.login = function (email, password, callback) {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      callback("server error");
    } else if (user == undefined) {
      callback("user not found");
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          callback("server error");
        } else if (isMatch === true) {
          let expiryTime = 600000;
          const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: "5min",
          });

          callback(null, "login successful", token, expiryTime);
        } else {
          callback("login credentials incorrect");
        }
      });
    }
  });
};

module.exports = User;
