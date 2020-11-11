require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const index = require("./server/routes/index.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", index);

const PORT = process.env.PORT || 3000;
(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (e) {
    console.log(`Server error, message: ${e}`);
    process.exit(1);
  }
})();
