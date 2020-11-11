const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ createdAt: -1 });
    res.json({ questions });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/:question_id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);
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
