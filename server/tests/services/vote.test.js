const AnswerModel = require("../../models/answer.model");
const QuestionModel = require("../../models/question.model");
const UserModel = require("../../models/user.model");
const VoteService = require("../../services/vote.service");
const { setupDb, clearDb } = require("../setup");

beforeEach(async () => {
  await setupDb();
  await QuestionModel.ensureIndexes();
  await AnswerModel.ensureIndexes();
  await UserModel.ensureIndexes();
});

afterEach(async () => {
  await clearDb();
});

describe("Vote Service", () => {
  let user, question, answer;

  beforeEach(async () => {
    user = await new UserModel({
      firstName: "Aaron",
      lastName: "Burr",
      email: "qwe@mail.ru",
      password: "qwe100",
    }).save();

    question = await new QuestionModel({
      author: user._id,
      text: "Description",
      title: "Title",
    }).save();

    answer = await new AnswerModel({
      author: user._id,
      text: "Answer text",
    }).save();

    question.answers.push(answer);
    await question.save();
    // create one question and several answers from the data provided above
  });

  it("Should increment Question score on upvote", async () => {
    await VoteService.voteQuestion(question._id, user._id, 1);
    const updatedQuestion = await QuestionModel.findById(question._id);
    expect(updatedQuestion.score).toBe(1);
  });

  it("Should increment Answer on upvote ", async () => {
    await VoteService.voteAnswer(answer._id, user._id, 1);
    const updatedAnswer = await AnswerModel.findById(answer._id);

    expect(updatedAnswer.score).toBe(1);
  });

  it("Should decrement Question score on downvote", async () => {
    await VoteService.voteQuestion(question._id, user._id, -1);
    const updatedQuestion = await QuestionModel.findById(question._id);

    expect(updatedQuestion.score).toBe(-1);
  });

  it("Should decrement Answer on downvote ", async () => {
    await VoteService.voteAnswer(answer._id, user._id, -1);
    const updatedAnswer = await AnswerModel.findById(answer._id);

    expect(updatedAnswer.score).toBe(-1);
  });

  it("Should increment User score on question upvote ", async () => {
    await VoteService.voteQuestion(question._id, user._id, 1);
    const updatedUser = await UserModel.findById(user._id);

    expect(updatedUser.score).toBe(1);
  });

  it("Should increment User score on answer upvote ", async () => {
    await VoteService.voteAnswer(answer._id, user._id, 1);
    const updatedUser = await UserModel.findById(user._id);

    expect(updatedUser.score).toBe(1);
  });

  it("Should decrement User score on question downvote ", async () => {
    await VoteService.voteQuestion(question._id, user._id, -1);
    const updatedUser = await UserModel.findById(user._id);

    expect(updatedUser.score).toBe(-1);
  });

  it("Should decrement User score on answer downvote ", async () => {
    await VoteService.voteAnswer(answer._id, user._id, -1);
    const updatedUser = await UserModel.findById(user._id);

    expect(updatedUser.score).toBe(-1);
  });

  it("Should cancel question/answer vote and nulify gained score on double upvote/downvote ", async () => {
    await VoteService.voteAnswer(answer._id, user._id, -1);
    await VoteService.voteAnswer(answer._id, user._id, -1);

    expect(user.score).toBe(0);
  });

  it("Should cancel user vote and nulify gained score on double upvote/downvote ", async () => {
    await VoteService.voteAnswer(answer._id, user._id, -1);
    await VoteService.voteAnswer(answer._id, user._id, -1);

    expect(user.score).toBe(0);
  });
});
