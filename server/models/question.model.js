const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoteSchema = require("./vote");
require("./user.model");
require("./answer.model");

const QuestionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  tags: [String],
  title: { type: String, required: true },
  text: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [VoteSchema],
  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  createdAt: { type: Date, default: Date.now },
  bestAnswer: { type: Schema.Types.ObjectId, ref: "answer" },
});

// set index field for search
QuestionSchema.index({ title: "text" });

QuestionSchema.post("findById", async function (doc) {
  await doc
    .populate({ path: "author", select: "score firstName lastName" })
    .populate({
      path: "answers",
      select: "score isBest author text createdAt votes",
      populate: { path: "author", select: "firstName lastName score" },
    });
});

QuestionSchema.post("find", async function (docs) {
  for (let doc of docs) {
    await doc
      .populate({ path: "author", select: "score firstName lastName" })
      .populate({
        path: "answers",
        select: "score isBest author text createdAt votes",
        populate: { path: "author", select: "firstName lastName score" },
      });
  }
});

QuestionSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("question", QuestionSchema);
