const express = require("express");
const path = require("path");
const router = express.Router();
const users = require("../data/users");

router.use(express.json());
// router.use(express.urlencoded({ extended: false }));

router.get("/user", (req, res) => {
  const { authorization } = req.headers;
  if (authorization) res.status(200).json(users);
  else res.status(400).send("Error!");
});
router.post("/user", (req, res) => {
  if (!req.body.name || !req.body.age) {
    res.status(403).send("Forbidden!");
  } else {
    users.push(req.body);
    res.status(201).send("User Created");
  }
});

module.exports = router;
