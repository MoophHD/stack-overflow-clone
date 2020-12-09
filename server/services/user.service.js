const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

class UserService {
  static async register(user) {
    const userRecord = await new UserModel(user).save();

    return userRecord;
  }

  static async login(user) {
    const userRecord = await UserModel.findOne({ email: user.email });
    if (!userRecord) throw new Error("User with this email wasn't found");

    const isMatch = await bcrypt.compare(user.password, userRecord.password);
    if (!isMatch) throw new Error("Password doesn't match");

    return userRecord;
  }

  static async getUserById(id) {
    const userRecord = await UserModel.findById(id);
    if (!userRecord) throw new Error(`There is no user with id ${id}`);

    return userRecord;
  }
}

module.exports = UserService;
