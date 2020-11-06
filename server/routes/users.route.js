const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    res.send(`user, id:${req.params.id}`);
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
