const express = require("express");
const { default: mongoose } = require("mongoose");
const auth = require("../middleware/auth");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validate } = require("../models/rental");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.status(200).send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Invalid customerId");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Invalid movieId");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  try {
    const session = await mongoose.startSession();
    let rental;
    session.withTransaction(
      async () => {
        rental = new Rental({
          customerId: customer._id,
          movieId: movie._id,
        });

        await rental.save();
        movie.numberInStock--;
        await movie.save();
      },
      { session: session }
    );
    session.endSession();
    res.status(200).send(rental);
  } catch (error) {
    console.log("Something went wrong.", error);
  }
});

module.exports = router;
