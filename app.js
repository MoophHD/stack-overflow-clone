require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const index = require("./server/routes/index.route");
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

const PORT = process.env.PORT || 3000;
(async function () {
  try {
    const isTestRun = process.env.NODE_ENV === "test";
    const mongodbURI = isTestRun
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI;

    await mongoose.connect(
      mongodbURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => {
        if (isTestRun) {
          mongoose.connection.db.dropDatabase();
        }
      }
    );

    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (e) {
    console.log(`Server error, message: ${e}`);
    process.exit(1);
  }
})();

module.exports.app = app;
