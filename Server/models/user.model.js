const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  no35: {
    type: Number,
  },
  no50: {
    type: Number,
  },
  no100: {
    type: Number,
  },
  clubName: {
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
          callback(null, "login successful");
        } else {
          callback("login credentials incorrect");
        }
      });
    }
  });
};

module.exports = User;
