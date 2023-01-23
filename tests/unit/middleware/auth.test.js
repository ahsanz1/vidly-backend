const { default: mongoose } = require("mongoose");
const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  it("should populate req.user with payload of valid JWT", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "john",
      email: "john@gmail.com",
      password: "kkkkkkkk",
      isAdmin: true,
    };

    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };

    const next = jest.fn();
    const res = {};

    auth(req, res, next);

    expect(req.user).toBeDefined();

  });
});
