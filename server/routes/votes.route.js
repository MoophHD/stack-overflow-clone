const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

function addVote(target, voteObj) {
  target.score += voteObj.vote;
  target.author.score += voteObj.vote;

  target.votes.push(voteObj);
}

function removeVote(target, voteObj) {
  target.score -= voteObj.vote;
  target.author.score -= voteObj.vote;

  target.votes.pull(voteObj);
}

async function vote(target, voteValue, voterId) {
  const existingVote = target.votes.find((v) => v.user._id.equals(voterId));
  const sameVote = existingVote && existingVote.vote === voteValue;

  // cancel vote
  if (sameVote) {
    removeVote(target, existingVote);
  } else if (existingVote) {
    removeVote(target, existingVote);
    addVote(target, { user: voterId, vote: voteValue });
  } else {
    addVote(target, { user: voterId, vote: voteValue });
  }
}

async function buildVote(req, res, voteValue) {
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

  const voter = req.user.id;

  await vote(target, voteValue, voter);
  await target.save();

  res.json({ target });
}

router.get("/upvote/:question_id/:answer_id?", auth, async (req, res) => {
  try {
    await buildVote(req, res, 1);
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

router.get("/downvote/:question_id/:answer_id?", auth, async (req, res) => {
  try {
    await buildVote(req, res, -1);
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong: ${e}` });
  }
});

module.exports = router;
