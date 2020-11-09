const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoteSchema = require("./vote");

const QuestionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [VoteSchema],
  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("question", QuestionSchema);
