const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  try {
    const customer = new Customer({ ...req.body });
    const newCustomer = await customer.save();
    res.status(200).send(newCustomer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (updatedCustomer) {
      res.status(200).send(updatedCustomer);
    } else res.status(404).send("Customer not found!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await Customer.findByIdAndRemove(id);
    if (deletedCustomer) {
      res.status(200).send({ deleted: true });
    } else res.status(404).send("Customer not found!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
