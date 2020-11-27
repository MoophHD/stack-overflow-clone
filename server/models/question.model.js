const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoteSchema = require("./vote");

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

QuestionSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("question", QuestionSchema);
