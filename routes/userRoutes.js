const express = require("express");
const userRouter = express.Router();
const { signup, signin } = require("../controller/userController");
const auth = require("../middleware/auth");

userRouter.use(express.json());
// userRouter.use(express.urlencoded({ extended: false }));

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = userRouter;
