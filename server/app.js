const express = require("express");
const cookieParser = require("cookie-parser");
const index = require("./routes/index.route");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", index);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "/client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
