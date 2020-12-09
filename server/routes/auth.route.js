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
  userValidationRules,
  validate,
} = require("../middleware/validate.middleware");

router.get("/load-user", auth, loadUser);
router.get("/checkToken/:token", checkToken);
router.get("/refreshToken", refreshToken);
router.post("/login", userValidationRules, validate, login);
router.post("/register", userValidationRules, validate, register);

module.exports = router;
