const express = require("express");
const path = require("path");
const router = express.Router();
const hotels = require("../data/hotels");

router.use(express.json());

router.get("/hotels", (req, res) => {
  // res.sendFile(path.join(__dirname, "../templates/about.html"));
  res.json(hotels);
});
router.get("/hotel_details/:slug", (req, res) => {
  const { slug } = req.params.slug;
  const data = hotels.find((el) => el.slug === slug);
  if (data) res.status(200).json(data);
  else res.status(404).send("Not Found!");
});

router.put("/hotel/:id", (req, res) => {
  const { id } = req.params;
  const { hotel_name, vendor_name } = req.body;
  const data = hotels.find((el) => el.hotel_id == id);
  if (id && (hotel_name, vendor_name, data)) {
    const data = hotels.find((el) => el.hotel_id == id);
    const index = hotels.findIndex(
      (obj) =>
        obj.hotel_name === data.hotel_name &&
        obj.slug === data.slug &&
        obj.hotel_id === data.hotel_id &&
        obj.vendor_name === data.vendor_name
    );
    hotels[index].hotel_name = hotel_name;
    hotels[index].slug = hotel_name.toLowerCase().replace(" ", "_");
    hotels[index].vendor_name = vendor_name;

    res.status(200).send(data);
  } else res.status(403).send("Forbidden!!");
});

router.delete("/hotel/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const data = hotels.find((el) => el.hotel_id == id);
    const index = hotels.findIndex(
      (obj) =>
        obj.hotel_name === data.hotel_name &&
        obj.slug === data.slug &&
        obj.hotel_id === data.hotel_id &&
        obj.vendor_name === data.vendor_name
    );
    hotels.splice(index, 1);
    res.status(202).send("Deleted Success!");
  } else res.status(403).send("Forbidden!!");
});

module.exports = router;
