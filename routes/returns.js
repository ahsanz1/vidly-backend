const Joi = require("joi");
const validate = require("../middleware/validate");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const validateReturn = (req) => {
  const schema = new Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(req);
};

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Invalid movieId");

  rental.return(movie.dailyRentalRate);
  await rental.save();

  await Movie.findByIdAndUpdate(
    { _id: rental.movieId },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.send(rental);
});

module.exports = router;
