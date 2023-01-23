const { User } = require("../models/user");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const validate = (user) => {
  const schema = new Joi.object({
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
};

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.status(200).send(token);
});

module.exports = router;
