const logger = require("../lib/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send(err.message);
};
