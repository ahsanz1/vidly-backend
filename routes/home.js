const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("hello", {
    title: "Great Page",
    sectionHeading: "Best Heading Ever!",
  });
});

module.exports = router;
