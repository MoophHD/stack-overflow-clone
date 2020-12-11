const { compareSync } = require("bcryptjs");
const QuestionModel = require("../models/question.model");
const { param } = require("../routes/questions.route");

class QuestionService {
  static async create(data) {
    const questionRecord = await new QuestionModel(data).save();
    return questionRecord;
  }

  static async getById(id) {
    const questionRecord = await QuestionModel.findById(id);
    return questionRecord;
  }

  static async count(params = {}) {
    const searchQuery = buildSearchQuery(params);
    const recordCount = await QuestionModel.countDocuments(searchQuery);
    return recordCount;
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
