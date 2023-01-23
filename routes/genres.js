const mongoose = require("mongoose");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const asyncMiddleware = require("../middleware/async");
const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const allGenres = await Genre.find();
    res.status(200).send(allGenres);
  })
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found!");
    res.status(200).send(genre);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    const genre = new Genre({ name: req.body.name });
    const newGenre = await genre.save();
    res.status(200).send(newGenre);
  })
);

router.put(
  "/:id",
  [auth, validateObjectId],
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!updatedGenre) return res.status(404).send("Genre not found!");
    res.status(200).send(updatedGenre);
  })
);

router.delete(
  "/:id",
  [auth, admin, validateObjectId],
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const deletedGenre = await Genre.findByIdAndRemove(id);
    if (!deletedGenre) return res.status(404).send("Genre not found!");
    res.status(200).send(deletedGenre);
  })
);

module.exports = router;
