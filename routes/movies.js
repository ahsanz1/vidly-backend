const mongoose = require("mongoose");
const { Movie, validate } = require("../models/movie");
const express = require("express");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.status(200).send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre not found!");
  try {
    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    const newMovie = await movie.save();
    res.status(200).send(newMovie);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (updatedMovie) {
      res.status(200).send(updatedMovie);
    } else res.status(404).send("Movie not found!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndRemove(id);
    if (deletedMovie) {
      res.status(200).send({ deleted: true });
    } else res.status(404).send("Movie not found!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
