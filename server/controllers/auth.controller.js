const UserService = require("../services/user.service")
const UserServiceInstance = new UserService();

const register = async (req, res) => {
  try {
    const body = req.body;

    const user = await UserServiceInstance.register(body);

    res.status(201).json({ userId: user._id });
  } catch (e) {
    console.log(e);
    
    res.status(500).json({ message: "Error on register user" });
  }
};

module.exports = { register };
