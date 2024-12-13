const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./users.route"));
router.use("/questions", require("./questions.route"));
router.use("/answers", require("./answers.route"));
router.use("/votes", require("./votes.route"));

module.exports = router;
