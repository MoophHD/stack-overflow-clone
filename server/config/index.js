const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

module.exports = {
  secret: process.env.JWT_SECRET,
  accessTokenExpiery: process.env.ACCESS_TOKEN_EXPIERY,
  refreshTokenExpiery: process.env.REFRESH_TOKEN_EXPIERY,
  mongodbUri: process.env.MONGODB_URI,
  mongodbTestUri: process.env.MONGODB_TEST_URI,
  port: process.env.PORT,
};
