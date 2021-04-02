const express = require("express");
const router = express.Router();
const { getById } = require("../controllers/user.controller");

router.get("/:id", getById);

module.exports = router;
