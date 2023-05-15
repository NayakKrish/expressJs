const express = require("express");
// const path = require("path");
const userRouter = express.Router();
// const users = require("../data/users");
const { signup, signin } = require("../controller/userController");

userRouter.use(express.json());
// userRouter.use(express.urlencoded({ extended: false }));

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

// userRouter.delete("/user/:id", (req, res) => {});

// userRouter.get("/user", (req, res) => {
//   const { authorization } = req.headers;
//   if (authorization) res.status(200).json(users);
//   else res.status(400).send("Error!");
// });
// userRouter.post("/user", (req, res) => {
//   const { name, age } = req.body;
//   if (name && age) {
//     users.push(req.body);
//     res.status(201).send("User Created");
//   } else {
//     res.status(403).send("Forbidden!");
//   }
// });

module.exports = userRouter;
