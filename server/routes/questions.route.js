const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

router.get("/tag/:name", async (req, res) => {
  try {
    const questions = await Question.find({
      tags: req.params.name,
    })
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("answers");

    res.json({ questions });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/search", async (req, res) => {
  try {
    const tags = req.query.tags;
    const title = req.query.title;
    const page = req.query.page;
    const pageLimit = req.query.pageLimit;

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

    // const questions = await Question.find(questionQuery)
    //     .sort({ createdAt: -1 })
    //     .populate("author")
    //     .populate("answers");

    
    let questions;
    if (page) {
      questions = await Question.find(questionQuery)
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("answers")
        .skip((page - 1) * pageLimit)
        .limit(page * pageLimit);
    } else {
      questions = await Question.find(questionQuery)
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("answers");
    }

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
