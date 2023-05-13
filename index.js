const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const userRouter = require("./routes/userRoutes");

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allhotels = await prisma.hotels.findMany();
//   console.log(allhotels, "asdfgh");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

app.use(express.static(path.join(__dirname, "static")));
app.use("/", require(path.join(__dirname, "routes/hotelRoutes.js")));
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Hotel app listening on port http://localhost:${port}`);
});
