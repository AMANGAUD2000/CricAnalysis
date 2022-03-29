const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
const userRoute = require("./routes/user.route");
const User = require("./models/user.model");
// connect to mongoDB
mongoose
  .connect(config.dbUrl, { useUnifiedTopology: true })
  .then(() => {
    console.log("Connection to Database successful");
  })
  .catch((err) => console.log("Connection Error: " + err));

app.use(bodyParser.json());
app.use("/users", userRoute);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.get("/users", async (req, res) => {
  const getUser = await User.find({});
  console.warn(getUser);
  res.send(getUser);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(5000, () => {
  console.log("Serving your app");
});
