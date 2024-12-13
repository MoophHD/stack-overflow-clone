const QuestionService = require("../services/question.service");

const createAnswer = async (req, res) => {
  try {
    const { questionId, text } = req.body;

    if (!req.user || !req.user.id)
      return res.status(403).json({ message: "must be authorized" });

    const author = req.user.id;
    const answer = await QuestionService.createAnswer(questionId, {
      text,
      author,
    });

    res.json({ answer });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get answer page" });
  }
};

const countAnswers = async (req, res) => {
  try {
    const questionId = req.params.question_id;
    const count = await QuestionService.countAnswers(questionId);

    res.json({ count });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get count answers" });
  }
};

const getAnswerPage = async (req, res) => {
  try {
    const questionId = req.params.question_id;
    const page = +req.query.page;
    const pageLimit = +req.query.pageLimit;

    const answers = await QuestionService.getAnswerPage(questionId, page, pageLimit);

    res.json({ answers });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get answer page" });
  }
};

module.exports = { getAnswerPage, countAnswers, createAnswer };
