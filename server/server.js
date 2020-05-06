const express = require("express");
const router = require("./routes/router");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", router);

// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("/client/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build"));
// });

app.listen(process.env.PORT || 5000, () =>
  console.log("token server running on 5000")
);
