const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  register,
  login,
  refreshToken,
  checkToken,
  loadUser,
} = require("../controllers/auth.controller");
const {
  validate,
} = require("../middleware/validate.middleware");

router.get("/load-user", auth, loadUser);
router.get("/checkToken/:token", checkToken);
router.get("/refreshToken", refreshToken);
router.post("/login", validate, login);
router.post("/register", validate, register);

module.exports = router;
