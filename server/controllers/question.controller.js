const QuestionService = require("../services/question.service");

const count = async (req, res) => {
  try {
    const { tags: queryTags, title: queryTitle } = req.query;
    const tags = queryTags && queryTags.split("+");
    const title = queryTitle;
    const count = await QuestionService.count({ tags, title });

    res.json({ count });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on count questions" });
  }
};

const getPage = async (req, res) => {
  try {
    const query = req.query;
    const tags = query.tags.split("+");
    const title = query.tags.title;
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
    const question = QuestionService.findById(id);
    res.json({ question });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get question" });
  }
};

const createQuestion = async (req, res) => {
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
    console.log(e);

    res.status(500).json({ message: "Error on create question" });
  }
};

module.exports = { count, getPage, getQuestionById, createQuestion };
