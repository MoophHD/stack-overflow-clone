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

  static isTokenValid(token) {
    try {
      const decoded = jwt.verify(token, secret);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async decodeToken(token) {
    return jwt.verify(token, secret);
  }

  static async refreshAccessToken(refreshToken) {
    const isValid = this.isTokenValid(refreshToken);
    if (!isValid) throw new Error("Refresh token invalid");

    const data = await this.decodeToken(refreshToken);
    const accessToken = await this.getAccessToken(data);

    return accessToken;
  }
}

module.exports = AuthService;
