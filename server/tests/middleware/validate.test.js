const {
  validate,
} = require("../../middleware/validate.middleware");
const { createRequest, createResponse } = require("node-mocks-http");

describe("middleware tests", () => {
  let req, res, next;
  beforeEach(async () => {
    req = createRequest();
    res = createResponse();
    next = jest.fn();
  });

  it("should run next on valid data", async () => {
    req.body = { email: "qwe@mail.ru", password: "qwe123" };
    await validate(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw on empty email", async () => {
    req.body = { email: "" };
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw on incorrect email format", async () => {
    req.body = { email: "123" };
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw on empty password", async () => {
    req.body = { email: "qwe@mail.ru" };
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw on empty password", async () => {
    req.body = { email: "qwe@mail.ru" };
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw on short password", async () => {
    req.body = { email: "qwe@mail.ru", password: "qwe"};
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw on long password", async () => {
    req.body = { email: "qwe@mail.ru", password: 'q'.repeat(49)};
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw on password without a digit", async () => {
    req.body = { email: "qwe@mail.ru", password: 'qwertyu'};
    await validate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });
});
