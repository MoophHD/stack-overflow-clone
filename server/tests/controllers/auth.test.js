const { createRequest, createResponse } = require("node-mocks-http");
const UserModel = require("../../models/user.model");
const {
  loadUser,
  login,
  register,
} = require("../../controllers/auth.controller");
const mongoose = require("mongoose");

const dbHandler = require("../dbHandler");

beforeEach(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.close();
});

describe("Auth controller", () => {
  const userData = {
    firstName: "abc",
    lastName: "zxc",
    email: "qwe@mail.ru",
    password: "qwe123",
  };

  let userRecord;
  let req, res;
  beforeEach(async () => {
    req = createRequest();
    res = createResponse();

    userRecord = await new UserModel(userData).save();
  });

  it("Should load logged user", async () => {
    req.user = { id: userRecord._id };

    await loadUser(req, res);

    const resData = res._getJSONData();
    expect(resData.user).toMatchObject({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  });

  it("Should login a user", async () => {
    req.body = userData;
    await login(req, res);

    const resData = res._getJSONData();
    // resData.userId = resData.userId.toString();
    expect(resData).toMatchObject({
      // userId: userRecord._id,
      token: expect.anything(),
    });
  });

  it("Should register a user", async () => {
    const nextUserData = {
      firstName: "a",
      lastName: "b",
      email: "pro@maik.com",
      password: "zxc123",
    };

    req.body = nextUserData;
    await register(req, res);

    const resData = res._getJSONData();
    expect(resData).toMatchObject({
      userId: expect.anything(),
      token: expect.anything(),
    });
  });
});
