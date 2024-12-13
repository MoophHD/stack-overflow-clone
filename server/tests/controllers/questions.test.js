const { createRequest, createResponse } = require("node-mocks-http");
const AnswerModel = require("../../models/answer.model");
const QuestionModel = require("../../models/question.model");
const {
  countQuestions,
  getQuestionPage,
  getQuestionById,
  createQuestion,
} = require("../../controllers/question.controller");
const dbHandler = require("../dbHandler");

beforeEach(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.close();
});

describe("Question controller", () => {
  const questionData = {
    author: "5a1154523a6bcc1d245e143d",
    title: "Titleword1 Titleword2",
    text: "Looong description",
    tags: ["tg", "cos", "sin"],
  };
  const answersData = [
    { author: "5a1154523a6bcc1d245e1431", text: "a" },
    { author: "5a1154523a6bcc1d245e1432", text: "ab" },
    { author: "5a1154523a6bcc1d245e1433", text: "abc" },
    { author: "5a1154523a6bcc1d245e1434", text: "abcd" },
  ];
  let questionRecord;
  let answerRecords = [];

  let req, res;
  beforeEach(async () => {
    req = createRequest();
    res = createResponse();

    // create one question and several answers from the data provided above
    questionRecord = await new QuestionModel(questionData).save();

    answerRecords = [];
    for (data of answersData) {
      answerRecords.push(
        await new AnswerModel({
          question: questionRecord._id,
          ...answersData,
        }).save()
      );
    }

    questionRecord.answers = answerRecords.map((a) => a._id);
    await questionRecord.save();
  });

  it("Should return question count", async () => {
    req.query = {
      text: questionData.title,
      tags: questionData.tags.join("+"),
    };

    await countQuestions(req, res);

    const resData = res._getJSONData();
    expect(typeof resData.count).toBe("number");
  });

  it("Should return question count", async () => {
    req.query = {
      text: questionData.title,
      tags: questionData.tags.join("+"),
    };

    await countQuestions(req, res);

    const resData = res._getJSONData();
    expect(typeof resData.count).toBe("number");
  });

  it("Should return an array of questions", async () => {
    req.params = { question_id: questionRecord._id };
    req.query = {
      page: "1",
      pageLimit: "10",
    };

    await getQuestionPage(req, res);
    const questions = res._getJSONData().questions;
    expect(questions).toEqual(expect.any(Array));
  });

  it("Should return the question by id", async () => {
    req.params = { question_id: questionRecord._id };

    await getQuestionById(req, res);
    
    expect(typeof res._getJSONData().question).toEqual("object");
  });

  it("Should return the question by id", async () => {
    req.user = { id: questionRecord._id };
    req.body = {
      title: questionData.title,
      text: questionData.text,
      tags: questionData.tags,
    };

    await createQuestion(req, res);

    expect(typeof res._getJSONData().question).toEqual("object");
  });
});
