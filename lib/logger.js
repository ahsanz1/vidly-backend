const winston = require("winston");
require("winston-mongodb");
const { format } = winston;
const { timestamp, combine, prettyPrint, colorize } = format;

const logger = winston.createLogger({
  level: "error",
  format: combine(
    format.json(),
    timestamp(),
    format.metadata(),
    prettyPrint(),
    colorize()
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "logfile.log",
    }),
    new winston.transports.MongoDB({
      db: process.env.DATABASE_URL,
      level: "error",
    }),
  ],
});

module.exports = logger;
