const express = require("express");
const mongoose = require("mongoose");
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
const userRoute = require("./routes/user.route");
const odiPerformanceRoute = require("./routes/odiPerformance.route");
const t20PerformanceRoute = require("./routes/t20Performance.route");
const testPerformanceRoute = require("./routes/testPerformance.route");
const careerStatsRoute = require("./routes/careerStats.route");
const bowlingDetailsRoute = require("./routes/bowlingDetails.route");
const shotsStatsRoute = require("./routes/legOffStats.route");
const tourRoute = require("./routes/tour.route");
const User = require("./models/user.model");
const cors = require("cors");
app.use(cors());
let gfs;
// connect to mongoDB
mongoose
  .connect(config.dbUrl, { useUnifiedTopology: true })
  .then(() => {
    console.log("Connection to Database successful");
  })
  .catch((err) => console.log("Connection Error: " + err));
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});
app.use("/file", upload);

app.get("file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

app.use(bodyParser.json());
app.use("/users", userRoute);
app.use("/api", odiPerformanceRoute);
app.use("/api", t20PerformanceRoute);
app.use("/api", testPerformanceRoute);
app.use("/api", careerStatsRoute);
app.use("/api", bowlingDetailsRoute);
app.use("/api", tourRoute);
app.use("/api", shotsStatsRoute);

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
