const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
const port = process.env.PORT || 5051;

// const colors = require('colors');
require("./config/db");
// Load env vars
dotenv.config({ path: "./config/config.env" });
// const bootCamp = require("./routes/bootcamp");
// const course = require("./routes/courses");
const auth = require("./routes/auth");
const errorHandler = require("./utils/errorMiddleware");
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());

// app.use("/api", bootCamp);
// app.use("/course", course);
app.use("/auth", auth);
app.get("/m", function (req, res) {
  console.log("process.env.NODE_ENV", process.env.NODE_ENV, port);
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} on localhost:${port}`.green
  );
});
process.on("unhandel", (err, promise) => {
  console.log("err", err);
  app.close(() => process.exit(1));
});
