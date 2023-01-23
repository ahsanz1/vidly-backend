const logger = require("../lib/logger");

module.exports = () => {
  process.on("uncaughtException", (exception) => {
    logger.error(exception.message, exception);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    logger.error(err.message, err);
    process.exit(1);
  });
};
