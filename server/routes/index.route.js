const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./users.route"));
router.use("/questions", require("./questions.route"));
router.use("/answers", require("./answers.route"));

module.exports = router;
