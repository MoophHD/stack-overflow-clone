const QuestionService = require("../services/question.service");

const createAnswer = async (req, res) => {
  try {
    const { questionId, text } = req.body;
    const author = req.user.id;

    const answers = QuestionService.createAnswer(questionId, { text, author });

    res.json({ answers });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get answer page" });
  }
};

const countAnswers = async (req, res) => {
  try {
    const count = QuestionService.countAnswers(questionId);

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

    const answers = QuestionService.getAnswerPage(questionId, page, pageLimit);

    res.json({ answers });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get answer page" });
  }
};

module.exports = { getAnswerPage, countAnswers, createAnswer };
