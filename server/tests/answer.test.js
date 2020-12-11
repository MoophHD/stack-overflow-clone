const AnswerModel = require("../models/answer.model");
const QuestionModel = require("../models/question.model");
const QuestionService = require("../services/question.service");
const { setupDb, clearDb } = require("../tests/setup");

beforeEach(async () => {
  await setupDb();
  await AnswerModel.ensureIndexes();
});

afterEach(async () => {
  await clearDb();
});

describe("Answers ", () => {
  const existingQuestionData = {
    author: "5a1154523a6bcc1d245e143d",
    title: "Titleword1 Titleword2",
    text: "Looong description",
    tags: ["tg", "cos", "sin"],
  };
  const existingAnswersData = [
    { author: "5a1154523a6bcc1d245e1431", text: "a" },
    { author: "5a1154523a6bcc1d245e1432", text: "ab" },
    { author: "5a1154523a6bcc1d245e1433", text: "abc" },
    { author: "5a1154523a6bcc1d245e1434", text: "abcd" },
  ];
  let existingQuestionRecord;
  let existingAnswerRecords = [];

  beforeEach(async () => {
    // create one question and several answers from the data provided above
    existingQuestionRecord = await new QuestionModel(
      existingQuestionData
    ).save();

    existingAnswerRecords = [];
    for (data of existingAnswersData) {
      existingAnswerRecords.push(
        await new AnswerModel({
          question: existingQuestionRecord._id,
          ...existingAnswersData,
        }).save()
      );
    }

    existingQuestionRecord.answers = existingAnswerRecords.map((a) => a._id);
    await existingQuestionRecord.save();
  });

  const answerData = {
    author: "5a1154523a6bcc1d245e1431",
    text: "123",
  };

  it("Should create answers", async () => {
    const answerRecord = await QuestionService.createAnswer(
      existingQuestionRecord._id,
      answerData
    );

    expect(JSON.parse(JSON.stringify(answerRecord))).toMatchObject(answerData);
  });

  it("Answers should be added to Question model", async () => {
    const previousAnswerCount = existingQuestionRecord.answers.length;
    await QuestionService.createAnswer(existingQuestionRecord._id, answerData);
    const updatedQuestionRecord = await QuestionModel.findById(
      existingQuestionRecord._id
    );
    const currentAnswerCount = updatedQuestionRecord.answers.length;

    expect(currentAnswerCount).toBe(previousAnswerCount + 1);
  });

  it("Should count answers", async () => {
    const answerCount = await QuestionService.countAnswers(
      existingQuestionRecord._id
    );

    expect(answerCount).toBe(existingAnswerRecords.length);
  });

  it("Should return a page of answers", async () => {
    const questionId = existingQuestionRecord._id;
    const answerRecords = await QuestionService.getAnswerPage(
      questionId,
      1,
      existingAnswerRecords.length
    );

    expect(answerRecords.length).toBe(existingAnswerRecords.length);
  });

  it("Should return a page of answers, pageLimit > answer count", async () => {
    const questionId = existingQuestionRecord._id;
    const answerCount = existingQuestionRecord.answers.length;
    const answerRecords = await QuestionService.getAnswerPage(
      questionId,
      1,
      answerCount + 1
    );

    expect(answerRecords.length).toBe(answerCount);
  });

  it("Should return a page of answers, pageLimit < answer count", async () => {
    const questionId = existingQuestionRecord._id;
    const answerRecords = await QuestionService.getAnswerPage(questionId, 1, 2);

    expect(answerRecords.length).toBe(2);
  });

  it("Should return a page of answers, pageLimit < answer count, remaining answers", async () => {
    const questionId = existingQuestionRecord._id;
    const answerCount = existingQuestionRecord.answers.length;
    const answerRecords = await QuestionService.getAnswerPage(questionId, 2, answerCount - 1);

    expect(answerRecords.length).toBe(1);
  });
});
