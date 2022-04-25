const express = require("express");
const router = express.Router();
const Tour = require("../models/tour.model");

router.post("/settours", (req, res) => {
  let tourDetails = req.body;
  console.log(tourDetails);
  let tour = new Tour(tourDetails);
  console.log(tour);
  tour.save((error, tourAdded) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(tourAdded);
    }
  });
});
router.get("/tour", async (req, res) => {
  try {
    const getTour = await Tour.find({});
    console.log(getTour);
    res.send({ Tours: getTour });
  } catch (err) {
    console.log("Something went wrong");
  }
});
module.exports = router;
