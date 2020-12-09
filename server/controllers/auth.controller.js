const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");

// todo: move it somewhere
const attachRefreshToken = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    path: "/api/auth",
    maxAge: process.env.REFRESH_TOKEN_EXPIERY,
    httpOnly: true,
  });
};

const register = async (req, res) => {
  try {
    const body = req.body;

    const user = await UserService.register(body);
    const refreshToken = AuthService.getRefreshToken(user);
    const accessToken = AuthService.getAccessToken(user);
    attachRefreshToken(res, refreshToken);
    
    res.status(201).json({ userId: user._id, token: accessToken });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on register user" });
  }
};

module.exports = { register };
