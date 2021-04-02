const UserService = require("../services/user.service");

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserByIdFull(id);

    res.json({ user });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on get user by id" });
  }
};

module.exports = { getById };
