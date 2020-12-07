const app = require("../app").app;
const request = require("supertest");
const mongoose = require('mongoose');
const User = require('../models/user.model');

beforeAll(() => {
  return new Promise((res, rej) => {
    setTimeout(() => res(), 2 * 1000);
  });
});

describe("Register with valid data", () => {
  it("Should create a request and receive refresh token & userId", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "d_sizykh@mail.ru",
      password: "pro100",
      firstName: "Danila",
      lastName: "Sizykh",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("userId");
  });

  it("Should create user document", async () => {
    const user = await User.find({});

    expect(user).toBeDefined();
  });
});
