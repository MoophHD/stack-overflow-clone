const auth = require("./auth.route");
const users = require("./users.route");
const express = require("express");
const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);

module.exports = router;
