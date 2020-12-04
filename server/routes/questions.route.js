const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

const buildQuestionQuery = (query) => {
  const tags = query.tags;
  const title = query.title;

  const questionQuery = {};

  if (title) {
    const titleWords = title.split("+");

    if (titleWords.length > 0) {
      questionQuery.$text = {
        $search: titleWords.map((w) => `"${w}"`).join(" "),
      };
    }
  }

  if (tags) {
    const tagWords = tags.split("+");
    if (tagWords.length > 0) {
      questionQuery.tags = { $all: tagWords };
    }
  }

  return questionQuery;
};

router.get("/count", async (req, res) => {
  try {
    const count = await Question.countDocuments(buildQuestionQuery(req.query));

    res.json({ count });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page;
    const pageLimit = +req.query.pageLimit;

    const questionQuery = buildQuestionQuery(req.query);
    const questions = await Question.find(questionQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageLimit)
      .limit(pageLimit)
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
    const answer = await Answer.findById(req.params.answer_id).populate({
      path: "author",
      select: "score",
    });

    if (question.author.toString() !== user) {
      return res.status(401).json({ message: "Not author of the question" });
    }

    question.bestAnswer = answer.id;
    await question.save();

    answer.isBest = true;
    await answer.save();

    res.json({ answer });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const author = req.user.id;
    const { title, text, tags } = req.body;
    const question = new Question({ author, title, text, tags });
    await question.save();

    const user = await User.findById(author);
    user.questions.push(question.id);
    await user.save();

    res.json({ question });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
