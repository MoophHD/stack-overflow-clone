const jwt = require("jsonwebtoken");
const {
  secret,
  accessTokenExpiery,
  refreshTokenExpiery,
} = require("../config");

class AuthService {
  static createToken(data, secret, expiresIn) {
    return jwt.sign(data, secret, { expiresIn });
  }

  static getAccessToken(user) {
    return this.createToken(
      { id: user.id, email: user.email },
      secret,
      accessTokenExpiery
    );
  }

  static getRefreshToken(user) {
    return this.createToken(
      { id: user.id, email: user.email },
      secret,
      refreshTokenExpiery
    );
  }

  static async isTokenValid(token) {
    try {
      await jwt.verify(token, secret);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async decodeToken(token) {
    return await jwt.verify(token, secret);
  }
}

module.exports = AuthService;
