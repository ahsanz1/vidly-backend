const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const validateUser = (user) => {
  const schema = new Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(5).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  idAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);
exports.User = User;
exports.validate = validateUser;
