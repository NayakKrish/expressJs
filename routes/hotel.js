const express = require("express");
const path = require("path");
const router = express.Router();
const hotels = require("../data/hotels");

router.get("/hotels", (req, res) => {
  // res.sendFile(path.join(__dirname, "../templates/about.html"));
  res.json(hotels);
});
router.get("/hotel_details/:slug", (req, res) => {
  const { slug } = req.params;
  const data = hotels.find((el) => el.slug === slug);
  if (data) res.status(200).json(data);
  else res.status(404).send("Not Found!");
});

module.exports = router;
