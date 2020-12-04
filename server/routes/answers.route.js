const express = require("express");
const router = express.Router();
const Answer = require("../models/answer.model");
const Question = require("../models/question.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

router.get("/count/:question_id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    const count = await Answer.countDocuments({
      _id: { $in: question.answers },
    });

    res.json({ count });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/:question_id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);
    const page = +req.query.page;
    const pageLimit = +req.query.pageLimit;

    const answers = await Answer.find({ _id: { $in: question.answers } })
      .sort([
        ["isBest", -1],
        ["score", -1],
        ["createdAt", -1],
      ])
      .skip((page - 1) * pageLimit)
      .limit(pageLimit)
      .populate({
        path: "author",
        select: "firstName lastName score",
      });
    res.json({ answers });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { questionId, text } = req.body;
    const userId = req.user.id;

    const author = await User.findById(userId, "firstName lastName score");

    const question = await Question.findById(questionId);
    const answer = new Answer({ author, questionId, text });

    if (question.bestAnswer) {
      return res.status(401).json({ message: "Question closed" });
    }

    const savedAnswer = await answer.save();

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
