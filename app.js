require("dotenv-flow").config();
const express = require("express");
const app = express();

require("./startup/config")(app);
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app);

module.exports = app;
