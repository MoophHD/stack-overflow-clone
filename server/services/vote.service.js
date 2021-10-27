const QuestionModel = require("../models/question.model");
const AnswerModel = require("../models/answer.model");

class VoteService {
  static async voteQuestion(questionId, voterId, value) {
    const questionRecord = await QuestionModel.findById(questionId).populate({
      path: "author",
      select: "score",
    });

    await this.vote(questionRecord, voterId, value);
  }

  static async voteAnswer(answerId, voterId, value) {
    const answerRecord = await AnswerModel.findById(answerId).populate({
      path: "author",
      select: "score",
    });

    await this.vote(answerRecord, voterId, value);
  }

  static async vote(target, voterId, value) {
    const existingVote = target.votes.find((v) => v.user._id.equals(voterId));
    const sameVote = existingVote && existingVote.vote === value;

    if (sameVote) {
      removeVote(target, existingVote);
    } else if (existingVote) {
      removeVote(target, existingVote);
      addVote(target, { user: voterId, vote: value });
    } else {
      addVote(target, { user: voterId, vote: value });
    }
    // update vote target vote array, and update the score
    await target.save();
    // update target's author score
    await target.author.save();
  }
}
// todo: move to model methods
async function addVote(target, voteObj) {
  target.score += voteObj.vote;
  target.author.score += voteObj.vote;

  target.votes.push(voteObj);
}

async function removeVote(target, voteObj) {
  target.score -= voteObj.vote;
  target.author.score -= voteObj.vote;

  target.votes.pull(voteObj);
}

module.exports = VoteService;
