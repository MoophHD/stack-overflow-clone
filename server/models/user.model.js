const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobPosition: { type: String },
  jobExperience: { type: String },
  techStack: { type: String },
  nickName: { type: String },

  score: { type: Number, default: 0 },
  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "question" }],
});

UserSchema.pre("save", async function (next) {
  const user = this;
  // hash only if modified or new
  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;

  next();
});

// don't show some user data on retrieving
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("user", UserSchema);;
