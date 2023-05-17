const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const notesRouter = require("./routes/notesRoute");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "static")));
app.use("/", require(path.join(__dirname, "routes/hotelRoutes.js")));
app.use("/user", userRouter);
app.use("/notes", notesRouter);
app.use(cors());

app.listen(port, () => {
  console.log(`Hotel app listening on port http://localhost:${port}`);
});
