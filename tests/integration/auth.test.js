const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
const request = require("supertest");
const app = require("../../app");

describe("auth middleware", () => {
  let token;
  let name;

  const exec = async () => {
    return request(app)
      .post("/api/genres")
      .send({
        name: name,
      })
      .set("x-auth-token", token);
  };

  beforeEach(() => {
    token = new User({
      name: "john",
      email: "john@gmail.com",
      password: "kkkkkkkk",
    }).generateAuthToken();
    name = "genre4";
  });

  afterEach(async () => {
    await Genre.remove({});
  });

  it("should return 401 if token is not provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if invalid token is provided", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if valid token is provided", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
