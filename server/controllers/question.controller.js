const QuestionService = require("../services/question.service");

const countQuestions = async (req, res) => {
  try {
    const query = req.query;
    const tags = query.tags ? query.tags.split("+") : [];
    const title = query.title;

    const count = await QuestionService.count({ tags, title });

    res.json({ count });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on count questions" });
  }
};

const getQuestionPage = async (req, res) => {
  try {
    const query = req.query;
    const tags = query.tags ? query.tags.split("+") : [];
    const title = query.title;
    const page = +query.page;
    const pageLimit = +query.pageLimit;

    const questions = await QuestionService.getPage(page, pageLimit, {
      tags,
      title,
    });

    res.json({ questions });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get page" });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const id = req.params.question_id;
    const question = await QuestionService.getById(id);
    res.json({ question });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get question" });
  }
};

const createQuestion = async (req, res) => {
  try {
    const author = req.user.id;
    const body = req.body;

    const question = await QuestionService.create({ author, ...body });

    res.json({ question });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on create question" });
  }
};

module.exports = {
  countQuestions,
  getQuestionPage,
  getQuestionById,
  createQuestion,
};
