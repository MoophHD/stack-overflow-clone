const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIERY }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIERY }
  );
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
  createRefreshToken,
};
