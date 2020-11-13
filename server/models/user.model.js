const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobPosition: { type: String },
  jobExperience: { type: String },
  techStack: { type: String },

  score: { type: Number, default: 0 },
  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "question" }],
});

// don't show some user data on retrieving
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.email;
  delete obj.__v;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("user", UserSchema);
