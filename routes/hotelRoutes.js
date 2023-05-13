const express = require("express");
const path = require("path");
const router = express.Router();
const hotels = require("../data/hotels");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.use(express.json());

// get all hotels list
router.get("/hotels", async (req, res) => {
  res.json(await prisma.hotels.findMany());
});

//find single hotel
router.get("/hotel_details/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const findedData = await prisma.hotels.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (findedData) {
      res.status(200).send(findedData);
    } else res.status(404).send("Not Found!");
  } else res.status(403).send("Forbidden!");
});

// create new hotel
router.post("/hotel", async (req, res) => {
  const { hotel_name, vendor_name } = req.body;
  if (hotel_name && vendor_name) {
    const data = await prisma.hotels.create({
      data: {
        name: hotel_name,
        slug: hotel_name.toLowerCase().replace(" ", "_"),
        vendor_name: vendor_name,
      },
    });
    res.status(201).json({
      message: "Created Successfully",
      data,
    });
  } else res.status(403).send("Forbidden!!");
});

// update existing hotel
router.put("/hotel/:id", async (req, res) => {
  const { id } = req.params;
  const { hotel_name, vendor_name } = req.body;
  if (id && hotel_name && vendor_name) {
    const data = await prisma.hotels.update({
      where: { id: Number(id) },
      data: {
        name: hotel_name,
        slug: hotel_name.toLowerCase().replace(" ", "_"),
        vendor_name: vendor_name,
      },
    });
    res.status(200).json({
      message: "Updated Successfully",
      data,
    });
  } else
    res.status(403).json({
      message: "Forbidden!!",
    });
});

// delete existing hotel
router.delete("/hotel/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const matchId = await prisma.hotels.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (matchId) {
      await prisma.hotels.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(202).json({
        message: "Deleted Successfully!",
      });
    } else
      res.status(403).json({
        message: "Hotel Not Found!",
      });
  } else
    res.status(403).json({
      message: "Forbidden!!",
    });
});

module.exports = router;
