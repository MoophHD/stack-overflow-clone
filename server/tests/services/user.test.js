const UserService = require("../../services/user.service");
const User = require("../../models/user.model");
const dbHandler = require("../dbHandler");

beforeEach(async () => {
  await dbHandler.connect();
  existingUser = await User(existingUserData).save();
});

afterEach(async () => {
  await dbHandler.close();
});

const userData = {
  email: "new@mail.com",
  firstName: "n1",
  lastName: "n2",
  password: "123qwe",
};

const existingUserData = {
  email: "test@mail.com",
  firstName: "n1",
  lastName: "n2",
  password: "123qwe",
};

describe("User Service", () => {
  let existingUser;
  it("Should return user model after register", async () => {
    const user = await UserService.register(userData);
    expect(user).toBeTruthy();
  });

  it("Should return user model after login", async () => {
    const user = await UserService.login(existingUserData);
    expect(user).toBeTruthy();
  });

  it("Should throw on login if user is not present in the database", async () => {
    await expect(
      async () =>
        await UserService.login({
          ...existingUserData,
          email: "doesnotexist@mail.com",
        })
    ).rejects.toThrow();
  });

  it("Should get user by id", async () => {
    const user = await UserService.getUserById(existingUser._id);
    console.log(user._id);
    expect(user._id).toStrictEqual(existingUser._id);
  });
});
