const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

async function vote(userId, target, voteValue) {
  const user = await User.findById(userId);
  const existingVote = target.votes.find((v) => v.user._id.equals(userId));

  if (existingVote) {
    target.score -= existingVote.vote;
    user.score -= existingVote.vote;
    if (voteValue == 0) {
      target.votes.pull(existingVote);
    } else {
      existingVote.vote = voteValue;
      target.score += voteValue;
      user.score += voteValue;
    }
  } else if (voteValue != 0) {
    target.votes.push({ user, vote: voteValue });
    target.score += voteValue;
    user.score += voteValue;
  }

  await user.save();

  target.author.score = user.score;

  return await target.save();
}

router.get("/upvote/:question_id/:answer_id?", auth, async (req, res) => {
  try {
    let target;
    if (req.params.answer_id) {
      target = await Answer.findById(req.params.answer_id).populate({
        path: "author",
        select: "score",
      });
    } else {
      target = await Question.findById(req.params.question_id).populate({
        path: "author",
        select: "score",
      });
    }
    const user = req.user.id;
    const result = await vote(user, target, 1);

    return res.json({ result });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/downvote/:question_id/:answer_id?", auth, async (req, res) => {
  try {
    let target;
    if (req.params.answer_id) {
      target = await Answer.findById(req.params.answer_id).populate({
        path: "author",
        select: "score",
      });
    } else {
      target = await Question.findById(req.params.question_id).populate({
        path: "author",
        select: "score",
      });
    }
    const user = req.user.id;
    const result = await vote(user, target, -1);

    return res.json({ result });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/unvote/:question_id/:answer_id?", auth, async (req, res) => {
  try {
    let target;
    if (req.params.answer_id) {
      target = await Answer.findById(req.params.answer_id).populate({
        path: "author",
        select: "score",
      });
    } else {
      target = await Question.findById(req.params.question_id).populate({
        path: "author",
        select: "score",
      });
    }

    const user = req.user.id;
    const result = await vote(user, target, 0);

    return res.json({ result });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
