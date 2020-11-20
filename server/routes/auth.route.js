const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

const {
  createToken,
  verifyPassword,
  hashPassword,
  createRefreshToken,
} = require("../utils/authentification");

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

router.post(
  "/login",
  [
    check("email", "Enter correct email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email correct Email"),
    check("password", "Enter correct password")
      .isLength({ min: 6, max: 48 })
      .withMessage("Password must be >= 6 & <= 48")
      .matches(/(?=.*\d).+/)
      .withMessage("Password must contain a digit"),
  ],
  async (req, res) => {
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
      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: `Something went wrong while logging in: ${e}` });
    }
  }
);

router.post(
  "/register",
  [
    check("email", "Enter correct email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email correct Email"),
    check("password", "Enter correct password")
      .isLength({ min: 6, max: 48 })
      .withMessage("Password must be >= 6 & <= 48")
      .matches(/(?=.*\d).+/)
      .withMessage("Password must contain a digit"),
    check("firstName", "Enter correct first name").matches(/^[A-Za-z]+$/),
    check("lastName", "Enter correct last name").matches(/^[A-Za-z]+$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data for registration",
      });
    }

    try {
      const {
        email,
        password,
        firstName,
        lastName,
        jobPosition,
        jobExperience,
        techStack,
      } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: `User already exists` });
        return;
      }

      const hashedPassword = await hashPassword(password);
      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        jobPosition,
        jobExperience,
        techStack,
      });
      const savedUser = await user.save();
      const token = createToken(savedUser);

      res.cookie("refreshToken", createRefreshToken(user), {
        path: "/api/auth",
        maxAge: process.env.REFRESH_TOKEN_EXPIERY,
        httpOnly: true,
      });

      res.status(201).json({ userId: savedUser.id, token });
    } catch (e) {
      res
        .status(500)
        .json({ message: `Something went wrong while registering user: ${e}` });
    }
  }
);

module.exports = router;
