const morgan = require("morgan");
const nodeDebugger = require("debug")("app:node");

module.exports = (app) => {
  if (app.get("env") === "development") {
    app.use(morgan("short"));
    nodeDebugger("Morgan Enabled");
  }
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not set");
  }
};
