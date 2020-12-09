const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const { register } = require("../controllers/auth.controller");
const {
  createToken,
  verifyPassword,
  createRefreshToken,
} = require("../utils/authentification");
const {
  userValidationRules,
  validate,
} = require("../middleware/validate.middleware");

router.get("/load-user", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.json({ user });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while loading user: ${e}` });
  }
});

router.get("/checkToken/:token", async (req, res) => {
  try {
    const token = req.params.token;
    jwt.verify(token, process.env.JWT_SECRET);

    res.json({ isValid: true });
  } catch (e) {
    res.json({ isValid: false });
  }
});

router.get("/refreshToken", async (req, res) => {
  try {
    if (req.cookies.refreshToken) {
      const decoded = await jwt.verify(
        req.cookies.refreshToken,
        process.env.JWT_SECRET
      );

      res.json({ token: createToken(decoded) });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while refreshing token: ${e}` });
  }
});

router.post("/login", userValidationRules, validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Incorrect data for login",
    });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(403).json({
        message: "Wrong email or password.",
      });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong email or password." });
    }

    res.cookie("refreshToken", createRefreshToken(user), {
      path: "/api/auth",
      maxAge: process.env.REFRESH_TOKEN_EXPIERY,
      httpOnly: true,
    });

    const token = createToken(user);
    res.status(201).json({ token, userId: user.id });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while logging in: ${e}` });
  }
});

router.post("/register", userValidationRules, validate, register);

module.exports = router;
