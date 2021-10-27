const express = require("express");
const router = express.Router();
const Answer = require("../models/answer.model");
const Question = require("../models/question.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");
const { getAnswerPage, countAnswers, createAnswer } = require("../controllers/answer.controller");

router.get("/count/:question_id", countAnswers);

router.get("/:question_id", getAnswerPage);

router.post("/", auth, createAnswer);

module.exports = router;
