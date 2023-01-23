const mongoose = require("mongoose");
const Joi = require("joi");

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(genre);
};

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

exports.Genre = mongoose.model("Genre", genreSchema);
exports.validate = validateGenre;
