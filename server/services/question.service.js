const QuestionModel = require("../models/question.model");
const AnswerModel = require("../models/answer.model");

class QuestionService {
  static async create(data) {
    const questionRecord = await new QuestionModel(data).save();
    return questionRecord;
  }

  static async getById(id) {
    const questionRecord = await QuestionModel.findById(id)
      .populate({ path: "author", select: "score firstName lastName" })
      .populate({
        path: "answers",
        select: "score isBest author text createdAt votes",
        populate: { path: "author", select: "firstName lastName score" },
      });
    return questionRecord;
  }

  static async count(params = {}) {
    const searchQuery = buildSearchQuery(params);
    const recordCount = await QuestionModel.countDocuments(searchQuery);
    return recordCount;
  }

  static async createAnswer(questionId, data) {
    const answerRecord = await new AnswerModel(data).save();

    const questionRecord = await QuestionModel.findById(questionId);
    questionRecord.answers.push(answerRecord._id);
    await questionRecord.save();

    return answerRecord;
  }

  static async countAnswers(questionId) {
    const questionRecord = await QuestionModel.findById(questionId);

    return questionRecord.answers.length;
  }

  static async getAnswerPage(questionId, page = 1, pageLimit = 10) {
    const questionRecord = await QuestionModel.findById(questionId);
    const answerIds = questionRecord.answers;
    const answerRecords = await AnswerModel.find({ _id: { $in: answerIds } })
      .sort([
        ["isBest", -1],
        ["score", -1],
        ["createdAt", -1],
      ])
      .skip((page - 1) * pageLimit)
      .limit(pageLimit)
      .populate({
        path: "author",
        select: "firstName lastName score",
      });

    return answerRecords;
  }

  static async getPage(page = 1, pageLimit = 10, params) {
    const searchQuery = buildSearchQuery(params);
    const questionRecords = await QuestionModel.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageLimit)
      .limit(pageLimit);

    return questionRecords;
  }
}

function buildSearchQuery(params) {
  const { title, tags } = params;

  const questionQuery = {};
  if (title && title.length > 0) {
    questionQuery.$text = {
      $search: title,
    };
  }
  if (tags && tags.length > 0) {
    questionQuery.tags = { $all: tags };
  }
  return questionQuery;
}

module.exports = QuestionService;
