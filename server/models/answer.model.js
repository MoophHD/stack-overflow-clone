const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoteSchema = require("./vote");

const AnswerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  text: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [VoteSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("answer", AnswerSchema);
