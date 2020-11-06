const express = require("express");
const router = express.Router();

router.get("/register", async (req, res) => {
  try {
    res.send("register");
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while registering user: ${e}` });
  }
});

router.get("/login", async (req, res) => {
  try {
    res.send("login");
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while logging in: ${e}` });
  }
});

module.exports = router;
