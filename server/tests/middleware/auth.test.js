const auth = require("../../middleware/auth.middleware");
const { createRequest, createResponse } = require("node-mocks-http");
const { secret, accessTokenExpiery } = require("../../config");
const jwt = require("jsonwebtoken");

const attachToken = (req, token) =>
  (req.headers.authorization = `Bearer ${token}`);

describe("middleware tests", () => {
  let req, res, next;
  beforeEach(() => {
    req = createRequest();
    res = createResponse();
    next = jest.fn();
  });

  const data = { id: "123" };
  const validToken = jwt.sign(data, secret, { expiresIn: "1h" });
  const expiredToken = jwt.sign(data, secret, { expiresIn: 0 });
  const notAToken = "123";

  it("Should run next on valid token", () => {
    attachToken(req, validToken);
    auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("Should throw on expired token", () => {
    attachToken(req, expiredToken);
    auth(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw on invalid token", () => {
    attachToken(req, notAToken);
    auth(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("Should attach user on req on valid token", () => {
    attachToken(req, validToken);
    auth(req, res, next);

    expect(req.user).toMatchObject(data);
  });

  it("Should not attach user on req on invalid token", () => {
    attachToken(req, expiredToken);
    auth(req, res, next);

    expect(req.user).toBe(undefined);
  });
});
