const request = require("supertest");
const app = require("../../app").app;

describe("Register with valid data", () => {
  it("Should create a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "d_sizykh@mail.ru",
      password: "pro100",
      firstName: "Danila",
      lastName: "Sizykh",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.json).toHaveProperty("token").toHaveProperty("userId");
  });
});
