const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, "static")));
app.use("/", require(path.join(__dirname, "routes/hotel.js")));
app.use("/", require(path.join(__dirname, "routes/user.js")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "home.html"));
// });
// app.get("/about", (req, res) => {
//   //   res.send("Its About!");
//   res.sendFile(path.join(__dirname, "about.html"));
// });
// app.get("/hotel/:slug", (req, res) => {
//   //   res.send("Its Contact!");
//   res.json({
//     hotel_name: req.params.slug,
//     hotel_id: 11,
//     vendor_name: "Krish Nayak",
//   });
// });

app.listen(port, () => {
  console.log(`Hotel app listening on port http://localhost:${port}`);
});
