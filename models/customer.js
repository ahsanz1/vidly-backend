const mongoose = require("mongoose");
const Joi = require("joi");

const validateCustomer = (customer) => {
  const schema = new Joi.object({
    name: Joi.string().min(5).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  });

  return schema.validate(customer);
};

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
});

exports.Customer = mongoose.model("Customer", customerSchema);
exports.validate = validateCustomer;
