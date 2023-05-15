const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "usersApi";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).send("User already exist!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email: result.email, id: result.id }, SECRET_KEY);

    res.status(201).json({
      user: result,
      token: token,
    });
  } catch (error) {
    res.status(500).send("Something went wrong! ");
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      return res.status(404).send("User Not Found!");
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Crentials!" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      SECRET_KEY
    );
    res.status(200).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    res.status(500).send("Something went wrong! ");
  }
};

module.exports = { signin, signup };
