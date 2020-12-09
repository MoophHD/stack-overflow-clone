const UserModel = require("../models/user.model");

class UserService {
  async register(user) {
    const userRecord = await (new UserModel(user)).save();

    return userRecord;
  }
}

module.exports = UserService;
