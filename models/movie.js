const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre } = require("./genre");

const validateMovie = (movie) => {
  const schema = new Joi.object({
    title: Joi.string().min(2).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  return schema.validate(movie);
};

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: Genre.schema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;
