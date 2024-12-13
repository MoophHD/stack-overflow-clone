const AuthService = require("../../services/auth.service");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config");

describe("Auth Service", () => {
  const userData = {
    id: 123,
    email: "test@mail.com",
    firstName: "n1",
    lastName: "n2",
  };
  const expiery = 100;
  const validToken = jwt.sign(userData, secret, { expiresIn: "1d" });
  const expiredToken = jwt.sign(userData, secret, { expiresIn: 0 });

  it("Should create tokens", async () => {
    const token = AuthService.createToken(userData, secret, expiery);
    expect(token).toBeTruthy();
  });

  it("Should create access tokens", async () => {
    const accessToken = AuthService.getAccessToken(userData);
    expect(accessToken).toBeTruthy();
  });

  it("Should create refresh tokens", async () => {
    const refreshToken = AuthService.getAccessToken(userData);
    expect(refreshToken).toBeTruthy();
  });

  it("Should check token validity, valid token", async () => {
    const isValid = AuthService.isTokenValid(validToken);
    expect(isValid).toBe(true);
  });

  it("Should check token validity, invalid token", async () => {
    const isValid = AuthService.isTokenValid(expiredToken);
    expect(isValid).toBe(false);
  });

  it("Should refresh tokens", async () => {
    const token = await AuthService.refreshAccessToken(validToken);
    expect(token).toBeTruthy();
  });

  it("Should not refresh invalid tokens", async () => {
    const refreshTokenInvalid = async () => await AuthService.refreshAccessToken(expiredToken);
    await expect(refreshTokenInvalid).rejects.toThrow();
  });
});
