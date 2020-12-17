const { createRequest, createResponse } = require("node-mocks-http");
const AnswerModel = require("../../models/answer.model");
const QuestionModel = require("../../models/question.model");
const UserModel = require("../../models/user.model");
const { upvote, downvote } = require("../../controllers/vote.controller");
const dbHandler = require("../dbHandler");

beforeEach(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.close();
});

describe("Vote controller", () => {
  const userData = {
    firstName: "abc",
    lastName: "zxc",
    email: "qwe@mail.ru",
    password: "qwe123",
  };
  const questionData = {
    title: "Titleword1 Titleword2",
    text: "Looong description",
    tags: ["tg", "cos", "sin"],
  };
  const answerData = { author: "5a1154523a6bcc1d245e1431", text: "a" };

  let questionRecord, userRecord, answerRecord;

  let req, res;
  beforeEach(async () => {
    req = createRequest();
    res = createResponse();

    // create one question and several answers from the data provided above
    userRecord = await new UserModel(userData).save();

    questionRecord = await new QuestionModel({
      ...questionData,
      author: userRecord._id,
    }).save();

    answerRecord = await new AnswerModel({
      ...answerData,
      author: userRecord._id,
    }).save();

    questionRecord.answers.push(answerRecord);
    await questionRecord.save();
  });

  async function getUpdatedQuestion() {
    return await QuestionModel.findById(questionRecord._id);
  }

  async function getUpdatedAnswer() {
    return await AnswerModel.findById(answerRecord._id);
  }

  async function getQuestionAuthor() {
    const authorId = questionRecord.author;
    return await UserModel.findById(authorId);
  }

  async function getAnswerAuthor() {
    const authorId = questionRecord.author;
    return await UserModel.findById(authorId);
  }


  describe("upvote", () => {
    async function upvoteQuestion() {
      req.params = { question_id: questionRecord._id };
      req.user = { id: userRecord._id };
      await upvote(req, res);
    }

    async function upvoteAnswer() {
      req.params = {
        question_id: questionRecord._id,
        answer_id: answerRecord._id,
      };
      req.user = { id: userRecord._id };
      await upvote(req, res);
    }

    it("Must increase question score", async () => {
      await upvoteQuestion();

      const updatedQuestion = await getUpdatedQuestion();

      expect(updatedQuestion.score).toBe(questionRecord.score + 1);
    });

    it("Must increase answer score", async () => {
      await upvoteAnswer();

      const updatedAnswer = await getUpdatedAnswer();

      expect(updatedAnswer.score).toBe(answerRecord.score + 1);
    });

    it("Must increase the score of author of the question", async () => {
      const author = await getQuestionAuthor();
      await upvoteQuestion();
      const updatedAuthor = await getQuestionAuthor();

      expect(updatedAuthor.score).toBe(author.score + 1);
    });

    it("Must increase the score of author of the answer", async () => {
      const author = await getAnswerAuthor();
      await upvoteAnswer();
      const updatedAuthor = await getAnswerAuthor();

      expect(updatedAuthor.score).toBe(author.score + 1);
    });

    it("Must cancel question score on double upvote", async () => {
      await upvoteQuestion();
      await upvoteQuestion();

      const updatedQuestion = await getUpdatedQuestion();

      expect(updatedQuestion.score).toBe(questionRecord.score);
    });

    it("Must cancel answer score on double upvote", async () => {
      await upvoteAnswer();
      await upvoteAnswer();

      const updatedAnswer = await getUpdatedAnswer();

      expect(updatedAnswer.score).toBe(answerRecord.score);
    });

    it("Must cancel question-author's score", async () => {
      const author = await getQuestionAuthor();
      await upvoteQuestion();
      await upvoteQuestion();
      const updatedAuthor = await getQuestionAuthor();

      expect(updatedAuthor.score).toBe(author.score);
    });

    it("Must cancel answer-author's score", async () => {
      const author = await getAnswerAuthor();
      await upvoteAnswer();
      await upvoteAnswer();
      const updatedAuthor = await getAnswerAuthor();

      expect(updatedAuthor.score).toBe(author.score);
    });
  });
});
