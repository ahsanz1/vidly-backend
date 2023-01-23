const mongoose = require("mongoose");
const logger = require("../lib/logger");

module.exports = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.DATABASE_URL);
  logger.info("Connected to MongoDB");
  logger.info(`Database URL ${process.env.DATABASE_URL}`);
};
