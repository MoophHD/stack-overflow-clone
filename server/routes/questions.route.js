const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

router.get("/search/:title", async (req, res) => {
  try {
    const questions = await Question.find({
      title: new RegExp(req.params.title, "i"),
    })
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("answers");

    res.json({ questions });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find({})
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("answers");

    res.json({ questions });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/:question_id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id)
      .populate({ path: "author", select: "score firstName lastName" })
      .populate({
        path: "answers",
        select: "score isBest author text createdAt votes",
        populate: { path: "author", select: "firstName lastName score" },
      });
    res.json({ question });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/pick-answer/:question_id/:answer_id", auth, async (req, res) => {
  try {
    const user = req.user.id;
    const question = await Question.findById(req.params.question_id);
    const answer = await Answer.findById(req.params.answer_id);

    if (question.author.toString() !== user) {
      return res.status(401).json({ message: "Not author of the question" });
    }

    question.bestAnswer = answer.id;
    await question.save();

    answer.isBest = true;
    await answer.save();

    res.json({ question });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const author = req.user.id;
    const { title, text } = req.body;
    const question = new Question({ author, title, text });
    const savedQuestion = await question.save();

    const user = await User.findById(author);
    user.questions.push(savedQuestion.id);
    await user.save();

    res.json({ id: savedQuestion.id });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
