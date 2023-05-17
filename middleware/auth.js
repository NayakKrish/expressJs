const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthoried user!" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthoried user!" });
  }
};

module.exports = auth;
