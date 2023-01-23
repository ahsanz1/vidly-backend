const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already registered");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    const newUser = await user.save();
    const token = newUser.generateAuthToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send(_.pick(newUser, ["_id", "name", "email"]));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
