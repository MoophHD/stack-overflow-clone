const { db } = require("../models/question.model");
const QuestionModel = require("../models/question.model");
const QuestionService = require("../services/question.service");
const { setupDb, clearDb } = require("../tests/setup");

beforeEach(async () => {
  await setupDb();
  await QuestionModel.ensureIndexes();
});

afterEach(async () => {
  await clearDb();
});

const questionData = {
  author: "5a1154523a6bcc1d245e143d",
  title: "Titleword1 Titleword2",
  text: "Looong description",
  tags: ["tg", "cos", "sin"],
};

const existingQuestionData = {
  author: "aa1154523a6bcc1d245e143d",
  title: "TakenTitle X",
  text: "Description",
  tags: ["tag1", "tag2"],
};

let existingQuestion;
describe("Question service", () => {
  beforeEach(async () => {
    existingQuestion = await new QuestionModel(existingQuestionData).save();
  });

  it("Should create question", async () => {
    const question = await QuestionService.create(questionData);
    expect(JSON.parse(JSON.stringify(question))).toMatchObject(questionData);
  });

  it("Should get question by id", async () => {
    const question = await QuestionService.getById(existingQuestion.id);
    expect(JSON.parse(JSON.stringify(question))).toMatchObject(
      existingQuestionData
    );
  });

  it("Should count questions", async () => {
    const count = await QuestionService.count();
    expect(count).toBe(1);
  });

  it("Should count questions with tags", async () => {
    const count = await QuestionService.count({
      tags: existingQuestionData.tags,
    });
    expect(count).toBe(1);
  });

  it("Should count questions with tags 2", async () => {
    const count = await QuestionService.count({ tags: questionData.tags });
    expect(count).toBe(0);
  });

  it("Should count questions with title", async () => {
    const count = await QuestionService.count({
      title: existingQuestionData.title,
    });
    expect(count).toBe(1);
  });

  it("Should count questions with title 2", async () => {
    const count = await QuestionService.count({
      title: questionData.title,
    });
    expect(count).toBe(0);
  });

  describe("Get Page", () => {
    const addionalQuestionData = [
      {
        author: "5a1154523a6bcc1d245e1431",
        title: "a b",
        text: "t",
        tags: ["js", "css"],
        createdAt: "December 18, 1995 03:24:00",
      },
      {
        author: "5a1154523a6bcc1d245e1432",
        title: "b c",
        text: "t",
        tags: ["html", "css"],
        createdAt: "December 17, 1995 03:24:00",
      },
      {
        author: "5a1154523a6bcc1d245e1433",
        title: "c d",
        text: "t",
        tags: ["js", "react"],
        createdAt: "December 16, 1995 03:24:00",
      },
    ];

    const metTwiceTag = "js";
    const metOnceTag = "react";

    beforeEach(async () => {
      for (qData of addionalQuestionData) {
        await new QuestionModel(qData).save();
      }
    });

    it("Should return all the entries if pageCount > entries count", async () => {
      const questionRecords = await QuestionService.getPage(1, 10, {});
      expect(questionRecords.length).toBe(4);
    });

    it("Should return pageLimit number of entries, if pageLimit < entrie count ", async () => {
      const questionRecords = await QuestionService.getPage(1, 2, {});
      expect(questionRecords.length).toBe(2);
    });

    it("Should return second page ", async () => {
      const questionRecords = await QuestionService.getPage(2, 3, {});
      expect(questionRecords.length).toBe(1);
    });

    it("Should return page with tag filters on ", async () => {
      const tag = "js";
      const questionRecords = await QuestionService.getPage(1, 10, {
        tags: [tag],
      });

      const expectedRecords = addionalQuestionData.filter((q) =>
        q.tags.includes(tag)
      );

      expect(questionRecords.length).toEqual(expectedRecords.length);
    });

    it("Should return page with title filters on ", async () => {
      const title = "b";
      const questionRecords = await QuestionService.getPage(1, 10, {
        title: title,
      });

      const expectedRecords = addionalQuestionData.filter((q) =>
        q.title.includes(title)
      );

      expect(questionRecords.length).toEqual(expectedRecords.length);
    });
  });
});
