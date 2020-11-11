const express = require("express");
const router = express.Router();
const Answer = require("../models/answer.model");
const Question = require("../models/question.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

router.get("/:question_id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    const answers = await Answer.find({ _id: { $in: question.answers } });
    res.json({ answers });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { questionId, text } = req.body;
    const userId = req.user.id;
    const answer = new Answer({ author: userId, questionId, text });
    const savedAnswer = await answer.save();

    const question = await Question.findById(questionId);
    question.answers.push(savedAnswer.id);
    await question.save();

    const user = await User.findById(userId);
    user.answers.push(savedAnswer.id);
    await user.save();

    res.json({ answer: savedAnswer });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
