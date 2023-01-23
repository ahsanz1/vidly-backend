const request = require("supertest");
const app = require("../../app");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

describe("/api/genres", () => {
  afterEach(async () => {
    await Genre.remove({});
    await User.remove({});
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.insertMany([
        {
          name: "genre1",
        },
        { name: "genre2" },
      ]);
      const result = await request(app).get("/api/genres");
      expect(result.status).toBe(200);
      // expect(result.body.length).toBe(2);
      // expect(result.body.some((g) => g.name === "genre1")).toBeTruthy();
      // expect(result.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if a valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();
      const res = await request(app).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(app).get(`/api/genres/1`);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(app)
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

    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre name is less than 5 characters", async () => {
      name = "gen";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre name is more than 255 characters", async () => {
      name = new Array(260).join("-");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "genre4" });

      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre4");
    });
  });
});
