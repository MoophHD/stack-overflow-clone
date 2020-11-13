const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// it should not require auth, just testing
const auth = require("../middleware/auth.middleware");
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
