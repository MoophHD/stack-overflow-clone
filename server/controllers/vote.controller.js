const VoteService = require("../services/vote.service");

const upvote = async (req, res) => await vote(req, res, 1);

const downvote = async (req, res) => await vote(req, res, -1);

const vote = async (req, res, voteValue) => {
  try {
    const answerId = req.params.answer_id;
    const questionId = req.params.question_id;
    const voter = req.user.id;

    if (answerId) {
      await VoteService.voteAnswer(answerId, voter, voteValue);
    } else {
      await VoteService.voteQuestion(questionId, voter, voteValue);
    }
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on vote" });
  }
};

module.exports = { upvote, downvote };
