const { createRequest, createResponse } = require("node-mocks-http");
const AnswerModel = require("../../models/answer.model");
const QuestionModel = require("../../models/question.model");
const {
  createAnswer,
  countAnswers,
  getAnswerPage,
} = require("../../controllers/answer.controller");
const dbHandler = require("../dbHandler");

beforeEach(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.close();
});

describe("Answer controller", () => {
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

  it("Should create an answer on valid data on createAnswer", async () => {
    req.body = { questionId: questionRecord._id, text: "123" };
    req.user = { id: questionRecord._id };

    await createAnswer(req, res);
    expect(typeof res._getJSONData().answer).toBe("object");
  });

  it("Should return a number on countAnswers", async () => {
    req.params = { question_id: questionRecord._id };
    await countAnswers(req, res);
    expect(typeof res._getJSONData().count).toBe("number");
  });

  it("Should return an array of answers with valid data on getAnswerPage", async () => {
    req.params = { question_id: questionRecord._id };
    req.query = {
      page: '1',
      pageLimit: '10',
    };
    
    await getAnswerPage(req, res);
    const answers = res._getJSONData().answers;
    expect(answers).toEqual(expect.any(Array))
  });
});
