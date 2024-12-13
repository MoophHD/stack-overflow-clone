const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");

const loadUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserService.getUserById(userId);
    res.json({ user });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while loading user: ${e}` });
  }
};

const checkToken = async (req, res) => {
  const token = req.params.token;
  const isTokenValid = await AuthService.isTokenValid(token);
  return res.json({ isValid: isTokenValid });
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = AuthService.refreshAccessToken(refreshToken);
    res.json({ token: accessToken });
  } catch (e) {
    res.status(500).json({ message: "Error on refresh token" });
  }
};

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

const login = async (req, res) => {
  try {
    const body = req.body;

    const user = await UserService.login(body);
    const refreshToken = AuthService.getRefreshToken(user);
    const accessToken = AuthService.getAccessToken(user);
    attachRefreshToken(res, refreshToken);

    res.status(201).json({ userId: user._id, token: accessToken });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "Error on login user" });
  }
};

module.exports = { register, login, refreshToken, checkToken, loadUser };
