const mongoose = require("mongoose");
const moment = require("moment");
const Joi = require("joi");

const validateRental = (rental) => {
  const schema = new Joi.object({
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
  });

  return schema.validate(rental);
};

const rentalSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Movie",
  },
  dateOut: {
    type: Date,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId,
  });
};

rentalSchema.methods.return = function (dailyRentalRate) {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * dailyRentalRate;
};

const Rental = mongoose.model("Rental", rentalSchema);
exports.Rental = Rental;
exports.validate = validateRental;
