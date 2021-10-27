const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoteSchema = require("./vote");

const AnswerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  text: { type: String, required: false },
  score: { type: Number, default: 0 },
  votes: [VoteSchema],
  createdAt: { type: Date, default: Date.now },
  isBest: { type: Boolean, default: false },
});

module.exports = mongoose.model("answer", AnswerSchema);
