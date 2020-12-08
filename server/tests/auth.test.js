const request = require("supertest");
const User = require("../models/user.model");
const app = require("../app");

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
